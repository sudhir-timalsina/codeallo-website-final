import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient.js'
import LoadingState from '../ui/LoadingState.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import Modal from '../ui/Modal.jsx'
import Button from '../ui/Button.jsx'
import FormField from '../ui/FormField.jsx'

// A small, generic admin CRUD table. `fields` describes the editable
// columns for the create/edit form; `columns` describes what's shown in
// the table itself (usually a subset of fields, for readability).
//
// fields: [{ name, label, as: 'input'|'textarea'|'select', type, options, required }]
// columns: [{ key, label, render?: (row) => node }]
export default function AdminResourceTable({
  table,
  title,
  emptyLabel,
  fields,
  columns,
  orderBy = 'created_at',
  ascending = false,
}) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingRow, setEditingRow] = useState(null)
  const [formState, setFormState] = useState({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order(orderBy, { ascending })
    if (!error) setRows(data || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table])

  const openCreate = () => {
    setEditingRow(null)
    const initial = {}
    fields.forEach((f) => (initial[f.name] = ''))
    setFormState(initial)
    setError('')
    setModalOpen(true)
  }

  const openEdit = (row) => {
    setEditingRow(row)
    const initial = {}
    fields.forEach((f) => (initial[f.name] = row[f.name] ?? ''))
    setFormState(initial)
    setError('')
    setModalOpen(true)
  }

  const handleDelete = async (row) => {
    if (!window.confirm('Delete this entry? This cannot be undone.')) return
    const { error } = await supabase.from(table).delete().eq('id', row.id)
    if (!error) load()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = { ...formState }
    // Arrays passed as comma-separated strings in simple text fields get
    // normalized back to arrays where the field is marked `isList`.
    fields.forEach((f) => {
      if (f.isList && typeof payload[f.name] === 'string') {
        payload[f.name] = payload[f.name]
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      }
    })

    const query = editingRow
      ? supabase.from(table).update(payload).eq('id', editingRow.id)
      : supabase.from(table).insert(payload)

    const { error } = await query
    setSaving(false)

    if (error) {
      setError(error.message)
      return
    }

    setModalOpen(false)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl text-ink">{title}</h1>
        <Button size="sm" onClick={openCreate}>
          <Plus size={16} /> Add New
        </Button>
      </div>

      <div className="mt-6 border border-line bg-paper">
        {loading ? (
          <LoadingState label={`Loading ${title.toLowerCase()}`} />
        ) : rows.length === 0 ? (
          <div className="p-6">
            <EmptyState title={emptyLabel || `No ${title.toLowerCase()} yet`} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-ash">
                  {columns.map((col) => (
                    <th key={col.key} className="px-4 py-3 font-medium">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-line last:border-0">
                    {columns.map((col) => (
                      <td key={col.key} className="max-w-xs truncate px-4 py-3 text-graphite">
                        {col.render ? col.render(row) : String(row[col.key] ?? '—')}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => openEdit(row)} aria-label="Edit" className="text-graphite hover:text-ink">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => handleDelete(row)} aria-label="Delete" className="text-graphite hover:text-error">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingRow ? `Edit ${title}` : `New ${title}`}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field) => (
            <FormField
              key={field.name}
              as={field.as || 'input'}
              type={field.type || 'text'}
              label={field.label}
              name={field.name}
              required={field.required}
              value={formState[field.name] ?? ''}
              onChange={(e) => setFormState((s) => ({ ...s, [field.name]: e.target.value }))}
            >
              {field.as === 'select' &&
                (field.options || []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
            </FormField>
          ))}
          {error && <p role="alert" className="text-sm text-error">{error}</p>}
          <Button type="submit" disabled={saving} className="mt-2">
            {saving ? 'Saving…' : editingRow ? 'Save Changes' : 'Create'}
          </Button>
        </form>
      </Modal>
    </div>
  )
}
