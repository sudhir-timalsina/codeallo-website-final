import AdminResourceTable from '../../components/admin/AdminResourceTable.jsx'

const categories = ['Civic Technology', 'EdTech', 'Utility Software']
const statuses = ['draft', 'published']

export default function AdminProjects() {
  return (
    <AdminResourceTable
      table="projects"
      title="Projects"
      emptyLabel="No projects yet — add one, or set status to 'published' on an existing draft."
      fields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'slug', label: 'Slug', required: true },
        { name: 'category', label: 'Category', as: 'select', options: categories, required: true },
        { name: 'client_type', label: 'Client type' },
        { name: 'technologies', label: 'Technologies (comma-separated)', isList: true },
        { name: 'description', label: 'Short description (shown on the project card)', as: 'textarea', required: true },
        { name: 'problem', label: 'The problem', as: 'textarea', required: true },
        { name: 'solution', label: 'The solution', as: 'textarea', required: true },
        { name: 'result', label: 'The result', as: 'textarea', required: true },
        { name: 'status', label: 'Status', as: 'select', options: statuses, required: true },
      ]}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'category', label: 'Category' },
        { key: 'client_type', label: 'Client type' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
