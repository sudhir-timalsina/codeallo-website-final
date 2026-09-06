import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient.js'
import LoadingState from '../../components/ui/LoadingState.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'
import { useAuth } from '../../hooks/useAuth.jsx'

const roles = ['student', 'admin']

export default function AdminUsers() {
  const { user: currentUser } = useAuth()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setRows(data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const updateRole = async (id, role) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, role } : r)))
    await supabase.from('profiles').update({ role }).eq('id', id)
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Users</h1>
      <p className="mt-1 text-sm text-graphite">
        Registered accounts. Changing a role here only takes effect because
        of the Row Level Security policies in supabase/schema.sql — never
        rely on this screen alone as the security boundary.
      </p>

      <div className="mt-6 border border-line bg-paper">
        {loading ? (
          <LoadingState label="Loading users" />
        ) : rows.length === 0 ? (
          <div className="p-6">
            <EmptyState title="No registered users yet" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-ash">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 text-graphite">{row.full_name || '—'}</td>
                    <td className="px-4 py-3 text-graphite">{row.email}</td>
                    <td className="px-4 py-3 text-graphite">
                      {row.created_at ? new Date(row.created_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={row.role || 'student'}
                        disabled={row.id === currentUser?.id}
                        onChange={(e) => updateRole(row.id, e.target.value)}
                        className="border border-line bg-paper px-2 py-1 text-xs disabled:opacity-50"
                      >
                        {roles.map((r) => (
                          <option key={r} value={r}>{r}</option>
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
