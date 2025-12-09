import { useState } from 'react'

type User = { id: number; name: string; email: string; role: string }

export default function Dashboard({ user, onLogout }: { user: User; onLogout?: () => void }) {
  const [tab, setTab] = useState<'home' | 'employees' | 'accounting'>('home')
  const [navOpen, setNavOpen] = useState(true)
  const [addOpen, setAddOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [department, setDepartment] = useState<'IT' | 'Accounting' | 'Marketing'>('IT')
  const [saving, setSaving] = useState(false)
  const addEmployee = async () => {
    if (!name || !email || !password) {
      alert('Missing fields')
      return
    }
    setSaving(true)
    try {
      const r = await fetch('http://localhost:3000/dev/seed-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'user' }),
      })
      if (!r.ok) {
        alert('Failed to add employee')
        return
      }
      alert('Employee added')
      setAddOpen(false)
      setName('')
      setEmail('')
      setPassword('')
      setDepartment('IT')
    } finally {
      setSaving(false)
    }
  }
  return (
    <div style={{ height: '100vh', width: '100%', display: 'grid', gridTemplateRows: '56px 1fr', background: 'var(--bg)', color: '#111', overflow: 'hidden' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: 'var(--primary)', color: '#fff', overflow: 'hidden', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontWeight: 600 }}>BloomTech Dashboard</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span>{user.name} ({user.role})</span>
          <button onClick={onLogout} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--primary)', background: 'var(--accent)', color: '#fff' }}>Logout</button>
        </div>
      </header>
      <main style={{ height: 'calc(100vh - 56px)', padding: 0, display: 'flex', overflow: 'hidden' }}>
        <aside style={{ width: navOpen ? 240 : 64, transition: 'width 0.2s ease', height: '100%', background: 'var(--primary)', color: '#fff', display: 'flex', flexDirection: 'column', gap: 4, padding: 12 }}>
          <button onClick={() => setNavOpen(o => !o)} aria-label="Collapse/Expand menu" style={{ textAlign: 'center', padding: '8px', borderRadius: 8, border: '1px solid var(--primary)', background: 'var(--accent)', color: '#fff', cursor: 'pointer' }}>{navOpen ? '«' : '»'}</button>
          <button onClick={() => setTab('home')} title="Overview" style={{ textAlign: navOpen ? 'left' : 'center', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--primary)', background: tab === 'home' ? 'var(--accent)' : 'transparent', color: '#fff', cursor: 'pointer' }}>{navOpen ? 'Overview' : '🏠'}</button>
          <button onClick={() => setTab('employees')} title="Employee Management" style={{ textAlign: navOpen ? 'left' : 'center', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--primary)', background: tab === 'employees' ? 'var(--accent)' : 'transparent', color: '#fff', cursor: 'pointer' }}>{navOpen ? 'Employee Management' : '👥'}</button>
          <button onClick={() => setTab('accounting')} title="Accounting" style={{ textAlign: navOpen ? 'left' : 'center', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--primary)', background: tab === 'accounting' ? 'var(--accent)' : 'transparent', color: '#fff', cursor: 'pointer' }}>{navOpen ? 'Accounting' : '💼'}</button>
        </aside>
        <section style={{ flex: 1, height: '100%', background: 'transparent', borderRadius: 0, border: 'none', padding: 24, display: 'grid', placeItems: 'start', alignContent: 'start', gap: 16 }}>
          {tab === 'home' && (
            <h1 style={{ marginTop: 0, fontSize: 28 }}>Welcome back</h1>
          )}
          {tab === 'employees' && (
            <div style={{ width: '100%', display: 'grid', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 style={{ marginTop: 0, fontSize: 28 }}>Employee Management</h1>
                <button style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--primary)', background: 'var(--accent)', color: '#fff', cursor: 'pointer' }} onClick={() => setAddOpen(true)}>+ Add Employee</button>
              </div>
              <p style={{ margin: 0 }}>Manage employees here. Add, edit, and view records.</p>
            </div>
          )}
          {tab === 'accounting' && (
            <div style={{ width: '100%', display: 'grid', gap: 16 }}>
              <h1 style={{ marginTop: 0, fontSize: 28 }}>Accounting</h1>
              <p style={{ margin: 0 }}>Accounting workspace. Add ledgers, track expenses, and view reports.</p>
            </div>
          )}
        </section>
      </main>
      {addOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center' }} onClick={() => setAddOpen(false)}>
          <div style={{ width: 'min(520px, 92vw)', padding: 24, borderRadius: 16, background: '#fff', color: '#111', border: '1px solid var(--primary)' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ marginTop: 0 }}>Add Employee</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <label style={{ display: 'grid', gap: 6 }}>
                <span>Name</span>
                <input value={name} onChange={e => setName(e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--primary)' }} />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                <span>Email</span>
                <input value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--primary)' }} />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                <span>Password</span>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--primary)' }} />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                <span>Department</span>
                <select value={department} onChange={e => setDepartment(e.target.value as 'IT' | 'Accounting' | 'Marketing')} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--primary)' }}>
                  <option value="IT">IT</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </label>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button onClick={() => setAddOpen(false)} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--primary)', background: '#b1b1b1', color: '#111' }}>Cancel</button>
                <button disabled={saving} onClick={addEmployee} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--primary)', background: 'var(--accent)', color: '#fff', cursor: saving ? 'not-allowed' : 'pointer' }}>{saving ? 'Adding...' : 'Add'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
