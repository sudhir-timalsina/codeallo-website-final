import AdminResourceTable from '../../components/admin/AdminResourceTable.jsx'

const categories = ['Civic Technology', 'EdTech', 'Utility Software']
const statuses = ['draft', 'published']

export default function AdminProjects() {
  return (
    <AdminResourceTable
      table="projects"
      title="Projects"
      emptyLabel="No projects in the database yet — the public /projects page currently reads from static data until you add rows here."
      fields={[
        { name: 'title', label: 'Title', required: true },
        { name: 'slug', label: 'Slug', required: true },
        { name: 'category', label: 'Category', as: 'select', options: categories, required: true },
        { name: 'client_type', label: 'Client type' },
        { name: 'technologies', label: 'Technologies (comma-separated)', isList: true },
        { name: 'description', label: 'Short description', as: 'textarea', required: true },
        { name: 'case_study', label: 'Full case study (problem / solution / result)', as: 'textarea' },
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
