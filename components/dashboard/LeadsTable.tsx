'use client'
import React, { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Lead = {
  id: string
  name: string
  email: string | null
  phone: string | null
  property_interest: string | null
  source: string
  status: string
  email_sent: boolean
  sms_sent: boolean
  created_at: string
  notes: string | null
}

const STATUS_OPTIONS = ['new', 'contacted', 'reminder_sent', 'closed']
const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  reminder_sent: 'Reminder Sent',
  closed: 'Closed',
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const router = useRouter()
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [noteValues, setNoteValues] = useState<Record<string, string>>({})
  const [noteStatus, setNoteStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({})

  async function saveNote(leadId: string, original: string | null) {
    const current = noteValues[leadId] ?? original ?? ''
    if (current === (original ?? '')) return
    setNoteStatus(s => ({ ...s, [leadId]: 'saving' }))
    const supabase = createClient()
    await supabase.from('leads').update({ notes: current }).eq('id', leadId)
    setNoteStatus(s => ({ ...s, [leadId]: 'saved' }))
    setTimeout(() => setNoteStatus(s => ({ ...s, [leadId]: 'idle' })), 2000)
    router.refresh()
  }

  async function updateStatus(leadId: string, status: string) {
    setUpdatingId(leadId)
    const supabase = createClient()
    await supabase.from('leads').update({ status }).eq('id', leadId)
    setUpdatingId(null)
    router.refresh()
  }

  if (leads.length === 0) {
    return (
      <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 12, padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
        <h3 style={{ fontSize: 18, marginBottom: 8 }}>No leads yet</h3>
        <p style={{ color: 'var(--ink-50)', fontSize: 14 }}>
          Leads will appear here once your webhook receives its first submission.
        </p>
      </div>
    )
  }

  return (
    <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: 'var(--navy-50)', borderBottom: '1px solid var(--line)' }}>
              {['Name', 'Contact', 'Property Interest', 'Source', 'Status', 'Notified', 'Time', 'Notes', ''].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--ink-50)', fontFamily: '"JetBrains Mono"', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, i) => {
              const isExpanded = expandedId === lead.id
              const noteVal = noteValues[lead.id] ?? lead.notes ?? ''
              const nStatus = noteStatus[lead.id] ?? 'idle'
              const isLast = i === leads.length - 1
              return (
                <React.Fragment key={lead.id}>
                  <tr style={{ borderBottom: (!isExpanded && !isLast) ? '1px solid var(--line)' : isExpanded ? '1px solid var(--line)' : 'none', transition: 'background .1s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                  >
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--navy-900)', whiteSpace: 'nowrap' }}>{lead.name}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 13, color: 'var(--ink-70)' }}>
                        {lead.email && <div>{lead.email}</div>}
                        {lead.phone && <div style={{ color: 'var(--ink-50)', marginTop: 2 }}>{lead.phone}</div>}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink-70)', fontSize: 13, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lead.property_interest || <span style={{ color: 'var(--ink-30)' }}>—</span>}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontFamily: '"JetBrains Mono"', fontSize: 11, background: 'var(--navy-50)', color: 'var(--navy)', padding: '3px 8px', borderRadius: 4 }}>
                        {lead.source}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onChange={e => updateStatus(lead.id, e.target.value)}
                        style={{
                          fontFamily: '"JetBrains Mono"', fontSize: 11, padding: '4px 8px',
                          borderRadius: 20, border: 'none', cursor: 'pointer',
                          background: lead.status === 'new' ? 'var(--orange-50)' : lead.status === 'contacted' ? '#E6F4EC' : lead.status === 'reminder_sent' ? 'var(--navy-50)' : '#F0F0F0',
                          color: lead.status === 'new' ? 'var(--orange-600)' : lead.status === 'contacted' ? 'var(--ok)' : lead.status === 'reminder_sent' ? 'var(--navy)' : 'var(--ink-50)',
                          fontWeight: 500, letterSpacing: '0.04em',
                        }}
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <span title="Email" style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: lead.email_sent ? '#E6F4EC' : 'var(--line)', color: lead.email_sent ? 'var(--ok)' : 'var(--ink-30)', fontFamily: '"JetBrains Mono"' }}>✉ {lead.email_sent ? '✓' : '—'}</span>
                        <span title="SMS" style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: lead.sms_sent ? '#E6F4EC' : 'var(--line)', color: lead.sms_sent ? 'var(--ok)' : 'var(--ink-30)', fontFamily: '"JetBrains Mono"' }}>📱 {lead.sms_sent ? '✓' : '—'}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--ink-50)', fontSize: 12, fontFamily: '"JetBrains Mono"', whiteSpace: 'nowrap' }}>
                      {formatRelative(lead.created_at)}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                        style={{
                          padding: '4px 10px', fontSize: 11, fontFamily: '"JetBrains Mono"',
                          background: isExpanded ? 'var(--navy)' : 'var(--navy-50)',
                          color: isExpanded ? 'white' : 'var(--navy)',
                          border: '1px solid var(--navy-100)', borderRadius: 6, cursor: 'pointer',
                          whiteSpace: 'nowrap', transition: 'background .15s, color .15s',
                        }}
                      >
                        {lead.notes ? '✎ Note' : '+ Note'}
                      </button>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 10px', background: 'var(--navy)', color: 'white', borderRadius: 6, fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap' }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          Call
                        </a>
                      )}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr style={{ borderBottom: !isLast ? '1px solid var(--line)' : 'none' }}>
                      <td colSpan={9} style={{ padding: '0 16px 16px', background: 'var(--bg)' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <textarea
                            value={noteVal}
                            placeholder="Log call notes, follow-up details, anything relevant…"
                            rows={3}
                            onChange={e => setNoteValues(v => ({ ...v, [lead.id]: e.target.value }))}
                            onBlur={() => saveNote(lead.id, lead.notes)}
                            style={{
                              flex: 1, padding: '10px 12px', border: '1px solid var(--line-2)', borderRadius: 8,
                              fontFamily: 'inherit', fontSize: 13, color: 'var(--ink)', resize: 'vertical',
                              outline: 'none', background: 'white', lineHeight: 1.5,
                            }}
                            onFocus={e => { e.target.style.borderColor = 'var(--navy-700)'; e.target.style.boxShadow = '0 0 0 3px rgba(27,58,107,.10)' }}
                          />
                          {nStatus !== 'idle' && (
                            <span style={{ fontSize: 11, color: nStatus === 'saving' ? 'var(--ink-50)' : 'var(--ok)', fontFamily: '"JetBrains Mono"', paddingTop: 12, whiteSpace: 'nowrap' }}>
                              {nStatus === 'saving' ? 'Saving…' : 'Saved ✓'}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatRelative(dateStr: string) {
  const date = new Date(dateStr)
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}
