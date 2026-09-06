import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient.js'
import LoadingState from '../../components/ui/LoadingState.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'

const statuses = ['interested', 'confirmed', 'active', 'completed', 'cancelled']

export default function AdminEnrollments() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('enrollments')
      .select('id, status, created_at, profiles(full_name, email), courses(title)')
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

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Enrollments</h1>
      <p className="mt-1 text-sm text-graphite">Course enrollments submitted by registered users.</p>

      <div className="mt-6 border border-line bg-paper">
        {loading ? (
          <LoadingState label="Loading enrollments" />
        ) : rows.length === 0 ? (
          <div className="p-6">
            <EmptyState title="No enrollments yet" description="Logged-in users who register interest in a course from their dashboard will appear here." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-ash">
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 text-graphite">{row.profiles?.full_name || row.profiles?.email}</td>
                    <td className="px-4 py-3 text-graphite">{row.courses?.title}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
