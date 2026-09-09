import { useEffect, useMemo, useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import SearchBar from '../components/ui/SearchBar.jsx'
import Filter from '../components/ui/Filter.jsx'
import BlogCard from '../components/sections/BlogCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { blogCategories } from '../data/blogPosts.js'

export default function Blog() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .then(({ data, error }) => {
        if (!mounted) return
        if (!error) setPosts(data || [])
        setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const sorted = useMemo(
    () =>
      [...posts].sort(
        (a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at)
      ),
    [posts]
  )
  const featured = sorted[0]

  const filtered = useMemo(() => {
    return sorted.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category
      const matchesQuery =
        query.trim() === '' ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        (post.excerpt || '').toLowerCase().includes(query.toLowerCase()) ||
        (post.tags || []).some((t) => t.toLowerCase().includes(query.toLowerCase()))
      return matchesCategory && matchesQuery
    })
  }, [sorted, query, category])

  const rest = filtered.filter((p) => p.slug !== featured?.slug || category !== 'All' || query !== '')

  return (
    <>
      <Seo
        title="Blog"
        description="Insights on technology education, web development, AI and school technology from Codeallo."
        path="/blog"
      />
      <PageHero
        eyebrow="Insights"
        title="Notes on education, technology and building things properly"
        description="Practical writing for students, teachers and organizations working through the same problems we work on every day."
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />

      {loading ? (
        <div className="content-wrap py-16">
          <LoadingState label="Loading articles" />
        </div>
      ) : (
        <>
          {query === '' && category === 'All' && featured && (
            <section className="content-wrap pt-16 sm:pt-24">
              <p className="mb-6 text-sm text-ash">Featured</p>
              <BlogCard post={featured} featured />
            </section>
          )}

          <section className="content-wrap py-16 sm:py-20">
            <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
              <Filter options={blogCategories} active={category} onChange={setCategory} label="Filter articles by category" />
              <div className="w-full sm:w-64">
                <SearchBar value={query} onChange={setQuery} placeholder="Search articles" label="Search articles" />
              </div>
            </div>

            <div className="mt-4">
              {rest.length === 0 ? (
                <EmptyState
                  title={posts.length === 0 ? 'No articles published yet' : 'No articles match your search'}
                  description={
                    posts.length === 0
                      ? 'Check back soon.'
                      : 'Try a different keyword or clear the category filter.'
                  }
                />
              ) : (
                rest.map((post) => <BlogCard key={post.slug} post={post} />)
              )}
            </div>
          </section>
        </>
      )}
    </>
  )
}
