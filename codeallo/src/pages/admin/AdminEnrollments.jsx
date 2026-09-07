import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient.js'
import LoadingState from '../../components/ui/LoadingState.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import Button from '../../components/ui/Button.jsx'
import EnrollModal from '../../components/admin/EnrollModal.jsx'
import { getCourseBySlug } from '../../data/courses.js'

const statuses = ['interested', 'confirmed', 'active', 'completed', 'cancelled']

export default function AdminEnrollments() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  const load = async () => {
    setLoading(true)
    // No FK join here on purpose — course_slug is a plain string matching
    // src/data/courses.js, not a Supabase table (see
    // supabase/003_enrollments_use_slug.sql). We look up the title
    // client-side via getCourseBySlug below.
    const { data, error } = await supabase
      .from('enrollments')
      .select('id, status, course_slug, created_at, profiles(full_name, email)')
      .order('created_at', { ascending: false })
    if (!error) setRows(data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const updateStatus = async (id, status) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    await supabase.from('enrollments').update({ status }).eq('id', id)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this enrollment? This cannot be undone.')) return
    setRows((prev) => prev.filter((r) => r.id !== id))
    await supabase.from('enrollments').delete().eq('id', id)
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-ink">Enrollments</h1>
          <p className="mt-1 text-sm text-graphite">Manually enroll a registered student, or manage existing enrollments.</p>
        </div>
        <Button size="sm" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Add Enrollment
        </Button>
      </div>

      <div className="mt-6 border border-line bg-paper">
        {loading ? (
          <LoadingState label="Loading enrollments" />
        ) : rows.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="No enrollments yet"
              description="Use 'Add Enrollment' above, or enroll someone directly from a lead on the Leads page."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-ash">
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const course = getCourseBySlug(row.course_slug)
                  return (
                    <tr key={row.id} className="border-b border-line last:border-0">
                      <td className="px-4 py-3 text-graphite">{row.profiles?.full_name || row.profiles?.email}</td>
                      <td className="px-4 py-3 text-graphite">{course?.title || row.course_slug}</td>
                      <td className="px-4 py-3">
                        <select
                          value={row.status}
                          onChange={(e) => updateStatus(row.id, e.target.value)}
                          className="border border-line bg-paper px-2 py-1 text-xs"
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleDelete(row.id)} aria-label="Remove enrollment" className="text-graphite hover:text-error">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <EnrollModal open={modalOpen} onClose={() => setModalOpen(false)} onEnrolled={load} />
    </div>
  )
}
