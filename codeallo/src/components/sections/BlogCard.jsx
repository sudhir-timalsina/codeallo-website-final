import { Link } from 'react-router-dom'
import { getPostReadingTime } from '../../data/blogPosts.js'

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export default function BlogCard({ post, featured = false }) {
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
        {post.author} &middot; {formatDate(post.publishedAt)} &middot; {getPostReadingTime(post)} min read
      </p>
    </Link>
  )
}
