import pagesData from '~/data/pages.json'

export interface PageData {
  title: string
  description: string
  image?: string
  items?: Array<{ q: string; a: string }>
}

const fallbackPages = pagesData as Record<string, PageData>

export function usePage(slug: string): PageData {
  const pageState = useState<PageData>(`page-${slug}`, () => fallbackPages[slug] || { title: '', description: '' })

  if (process.client) {
    onMounted(async () => {
      try {
        const supabase = useSupabaseClient()
        const { data: page, error } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .single()

        if (!error && page) {
          let items: Array<{ q: string; a: string }> | undefined = undefined
          if (slug === 'faq') {
            const { data: faqItems } = await supabase
              .from('faq_items')
              .select('question, answer')
              .eq('page_id', page.id)
              .order('sort_order', { ascending: true })

            if (faqItems) {
              items = faqItems.map((fi: any) => ({ q: fi.question, a: fi.answer }))
            }
          }

          pageState.value = {
            title: page.title,
            description: page.description,
            image: page.image || undefined,
            items: items || fallbackPages[slug]?.items
          }
        }
      } catch {
        // Keep fallback
      }
    })
  }

  return pageState.value
}
