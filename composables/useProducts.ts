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

export function useProducts(): Ref<Product[]> {
  const productsState = useState<Product[]>('all-products', () => fallbackProducts)

  // Fetch from API on both SSR and client with proper Nuxt hydration
  useAsyncData('products-hydrate', async () => {
    const fetched = await fetchProductsFromAPI()
    if (fetched) {
      productsState.value = fetched
    }
    return productsState.value
  })

  return productsState
}

export function useProduct(handle: string | Ref<string> | ComputedRef<string>): ComputedRef<Product | undefined> {
  const products = useProducts()
  const h = isRef(handle) ? handle : ref(handle)
  return computed(() => products.value.find((p) => p.handle === h.value))
}

export function useProductsByCategory(category?: Product['category']): ComputedRef<Product[]> {
  const products = useProducts()
  return computed(() => {
    if (!category) return products.value
    return products.value.filter((p) => p.category === category)
  })
}
