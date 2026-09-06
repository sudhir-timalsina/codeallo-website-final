import { useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.jsx'
import Badge from '../components/ui/Badge.jsx'
import BlogCard from '../components/sections/BlogCard.jsx'
import CTASection from '../components/sections/CTASection.jsx'
import NotFound from './NotFound.jsx'
import { getPostBySlug, getPostReadingTime, blogPosts } from '../data/blogPosts.js'
import { siteConfig } from '../lib/siteConfig.js'

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <NotFound />

  const related = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription,
    author: { '@type': 'Organization', name: post.author },
    datePublished: post.publishedAt,
    publisher: { '@type': 'Organization', name: siteConfig.legalName },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  }

  return (
    <>
      <Seo title={post.title} description={post.seoDescription} path={`/blog/${post.slug}`} type="article" jsonLd={jsonLd} />

      <article>
        <header className="border-b border-line bg-ink text-paper">
          <div className="content-wrap py-16 sm:py-20">
            <Badge tone="inverse" className="mb-5">{post.category}</Badge>
            <h1 className="max-w-3xl text-balance font-display text-3xl sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-sm text-paper/60">
              {post.author} &middot; {formatDate(post.publishedAt)} &middot; {getPostReadingTime(post)} min read
            </p>
          </div>
        </header>

        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Blog', to: '/blog' },
            { label: post.title },
          ]}
        />

        <div className="content-wrap grid gap-16 py-16 sm:py-24 lg:grid-cols-12 lg:gap-12">
          <div className="max-w-2xl space-y-6 lg:col-span-8">
            {post.body.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-graphite">
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 border-t border-line pt-8">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>

          {related.length > 0 && (
            <aside className="lg:col-span-4">
              <h3 className="font-display text-lg text-ink">Related articles</h3>
              <div className="mt-4">
                {related.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </aside>
          )}
        </div>
      </article>

      <CTASection
        title="Want to talk about any of this?"
        description="Whether it's a course, a school project or a technical build — we're happy to talk it through."
      />
    </>
  )
}
