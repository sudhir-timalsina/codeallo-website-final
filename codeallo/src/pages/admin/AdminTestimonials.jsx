import AdminResourceTable from '../../components/admin/AdminResourceTable.jsx'

const statuses = ['pending', 'approved', 'hidden']

export default function AdminTestimonials() {
  return (
    <AdminResourceTable
      table="testimonials"
      title="Testimonials"
      emptyLabel="No testimonials yet. Add real, attributable feedback here as it's collected — the public site shows an honest empty state until then."
      fields={[
        { name: 'name', label: 'Name', required: true },
        { name: 'role', label: 'Role' },
        { name: 'organization', label: 'Organization' },
        { name: 'testimonial', label: 'Testimonial', as: 'textarea', required: true },
        { name: 'status', label: 'Status', as: 'select', options: statuses, required: true },
      ]}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'organization', label: 'Organization' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}
