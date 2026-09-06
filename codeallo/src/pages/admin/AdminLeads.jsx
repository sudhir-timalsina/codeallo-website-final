import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient.js'
import LoadingState from '../../components/ui/LoadingState.jsx'
import EmptyState from '../../components/ui/EmptyState.jsx'

const statuses = ['new', 'in_progress', 'closed']

export default function AdminLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setLeads(data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const updateStatus = async (id, status) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
    await supabase.from('contact_submissions').update({ status }).eq('id', id)
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Contact Leads</h1>
      <p className="mt-1 text-sm text-graphite">Submissions from the contact form and course/service interest forms.</p>

      <div className="mt-6 border border-line bg-paper">
        {loading ? (
          <LoadingState label="Loading leads" />
        ) : leads.length === 0 ? (
          <div className="p-6">
            <EmptyState title="No submissions yet" description="Messages from the contact form will appear here." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-ash">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Message</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-line last:border-0 align-top">
                    <td className="px-4 py-3 text-graphite">{lead.name}</td>
                    <td className="px-4 py-3 text-graphite">
                      <a href={`mailto:${lead.email}`} className="hover:text-ink">{lead.email}</a>
                    </td>
                    <td className="px-4 py-3 text-graphite">{lead.service || '—'}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-graphite" title={lead.message}>
                      {lead.message}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status || 'new'}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className="border border-line bg-paper px-2 py-1 text-xs"
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s.replace('_', ' ')}</option>
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
