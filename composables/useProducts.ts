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
  variants: ProductVariant[]
  gradient?: string
  badge?: string
  notes?: string[]
}

const products = productsData as Product[]

export function useProducts() {
  return products
}

export function useProduct(handle: string) {
  return products.find((p) => p.handle === handle)
}

export function useProductsByCategory(category?: Product['category']) {
  if (!category) return products
  return products.filter((p) => p.category === category)
}
