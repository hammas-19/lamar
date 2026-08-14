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

export async function fetchProductsFromSupabase(): Promise<Product[] | null> {
  try {
    const supabase = useSupabaseClient()
    const { data, error } = await supabase
      .from('products_full')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return null
    }

    return data.map((item: any) => {
      const imgs = [item.image_url, item.image_2_url, item.image_3_url].filter(Boolean) as string[]
      return {
        handle: item.handle,
        category: item.category,
        title: item.title,
        description: item.description,
        image: item.image_url,
        image2: item.image_2_url || undefined,
        image3: item.image_3_url || undefined,
        images: imgs,
        variants: item.variants || [],
        gradient: item.gradient || undefined,
        badge: item.badge || undefined,
        notes: item.notes || [],
        gender: item.gender || []
      }
    })
  } catch {
    return null
  }
}

export function useProducts(): Product[] {
  const productsState = useState<Product[]>('all-products', () => fallbackProducts)

  // Asynchronously hydrate from Supabase if connected
  if (process.client) {
    onMounted(async () => {
      const fetched = await fetchProductsFromSupabase()
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
