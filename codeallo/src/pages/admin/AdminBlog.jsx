import AdminResourceTable from '../../components/admin/AdminResourceTable.jsx'

const categories = [
  'Technology',
  'Web Development',
  'App Development',
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Cybersecurity',
  'Robotics',
  'IoT',
  'Education Technology',
  'Teacher Development',
  'School Technology',
  'Programming',
  'Digital Transformation',
]
const statuses = ['draft', 'published']

export default function AdminBlog() {
  return (
    <AdminResourceTable
      table="blog_posts"
      title="Blog Posts"
      emptyLabel="No blog posts yet — add one, or set status to 'published' on an existing draft."
      fields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'slug', label: 'Slug', required: true },
        { name: 'category', label: 'Category', as: 'select', options: categories, required: true },
        { name: 'tags', label: 'Tags (comma-separated)', isList: true },
        { name: 'excerpt', label: 'Excerpt', as: 'textarea', required: true },
        { name: 'content', label: 'Content (separate paragraphs with a blank line)', as: 'textarea', required: true },
        { name: 'cover_image', label: 'Cover image URL' },
        { name: 'author', label: 'Author' },
        { name: 'published_at', label: 'Published date', type: 'date' },
        { name: 'seo_title', label: 'SEO title' },
        { name: 'seo_description', label: 'SEO description', as: 'textarea' },
        { name: 'status', label: 'Status', as: 'select', options: statuses, required: true },
      ]}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'category', label: 'Category' },
        { key: 'author', label: 'Author' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
