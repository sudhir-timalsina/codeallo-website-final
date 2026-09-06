import AdminResourceTable from '../../components/admin/AdminResourceTable.jsx'

const categories = ['Programming', 'Web Development', 'Artificial Intelligence', 'Data & Security']
const levels = ['Beginner', 'Beginner to Intermediate', 'Intermediate', 'Intermediate to Advanced', 'Advanced']
const statuses = ['upcoming', 'open', 'closed']

export default function AdminCourses() {
  return (
    <AdminResourceTable
      table="courses"
      title="Courses"
      emptyLabel="No courses in the database yet — the public /courses page currently reads from static data until you add rows here."
      fields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'slug', label: 'Slug (e.g. python)', required: true },
        { name: 'category', label: 'Category', as: 'select', options: categories, required: true },
        { name: 'level', label: 'Level', as: 'select', options: levels, required: true },
        { name: 'duration', label: 'Duration (e.g. 10 weeks)', required: true },
        { name: 'delivery', label: 'Delivery method' },
        { name: 'status', label: 'Status', as: 'select', options: statuses, required: true },
        { name: 'description', label: 'Description', as: 'textarea', required: true },
        { name: 'instructor', label: 'Instructor' },
      ]}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'category', label: 'Category' },
        { key: 'level', label: 'Level' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
