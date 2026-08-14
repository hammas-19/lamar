import productsData from '~/data/products.json'

export interface ProductVariant {
  id: string
  title: string
  option: string
  sku: string
  price: number
}

export interface Product {
  handle: string
  category: 'fragrance' | 'object' | 'set'
  title: string
  description: string
  image: string
  image2?: string
  image3?: string
  images?: string[]
  variants: ProductVariant[]
  gradient?: string
  badge?: string
  notes?: string[]
  gender?: string[]
}

const fallbackProducts: Product[] = (productsData as any[]).map((p) => ({
  ...p,
  image2: p.image2 || undefined,
  image3: p.image3 || undefined,
  images: [p.image, p.image2, p.image3].filter(Boolean) as string[]
}))

/**
 * Fetch products from server API (which uses Redis cache → Supabase).
 * Falls back to local JSON data if the API is unreachable.
 */
export async function fetchProductsFromAPI(): Promise<Product[] | null> {
  try {
    const data = await $fetch<Product[]>('/api/products')
    return data && data.length > 0 ? data : null
  } catch {
    return null
  }
}

export function useProducts(): Product[] {
  const productsState = useState<Product[]>('all-products', () => fallbackProducts)

  // Asynchronously hydrate from cached API
  if (process.client) {
    onMounted(async () => {
      const fetched = await fetchProductsFromAPI()
      if (fetched) {
        productsState.value = fetched
      }
    })
  }

  return productsState.value
}

export function useProduct(handle: string): Product | undefined {
  const products = useProducts()
  return products.find((p) => p.handle === handle)
}

export function useProductsByCategory(category?: Product['category']): Product[] {
  const products = useProducts()
  if (!category) return products
  return products.filter((p) => p.category === category)
}
