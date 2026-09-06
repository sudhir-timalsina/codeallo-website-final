import { useMemo, useState } from 'react'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/sections/PageHero.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import SearchBar from '../components/ui/SearchBar.jsx'
import Filter from '../components/ui/Filter.jsx'
import BlogCard from '../components/sections/BlogCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { blogPosts, blogCategories } from '../data/blogPosts.js'

export default function Blog() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const sorted = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)),
    []
  )
  const featured = sorted[0]

  const filtered = useMemo(() => {
    return sorted.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category
      const matchesQuery =
        query.trim() === '' ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
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
              title="No articles match your search"
              description="Try a different keyword or clear the category filter."
            />
          ) : (
            rest.map((post) => <BlogCard key={post.slug} post={post} />)
          )}
        </div>
      </section>
    </>
  )
}
