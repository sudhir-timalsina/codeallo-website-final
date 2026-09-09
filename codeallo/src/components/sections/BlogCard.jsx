import { Link } from 'react-router-dom'

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const readingTime = (content) => {
  const words = (content || '').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export default function BlogCard({ post, featured = false }) {
  const displayDate = post.published_at || post.created_at

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group block border-b border-line py-8 first:pt-0 ${featured ? 'sm:py-10' : ''}`}
    >
      <p className="mb-3 text-xs uppercase tracking-[0.1em] text-ash">{post.category}</p>
      <h3 className={`font-display text-ink group-hover:underline ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
        {post.title}
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-graphite">{post.excerpt}</p>
      <p className="mt-4 text-xs text-ash">
        {post.author} &middot; {formatDate(displayDate)} &middot; {readingTime(post.content)} min read
      </p>
    </Link>
  )
}
