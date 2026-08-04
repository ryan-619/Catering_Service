import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAdmin } from '../api/api'
import './admin.css'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async () => {
    if (!form.email || !form.password) {
      setError('Please enter email and password')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await loginAdmin(form)
      localStorage.setItem('ltcs_token', res.data.token)
      localStorage.setItem('ltcs_admin', JSON.stringify(res.data.admin))
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h2>LTCS Admin</h2>
          <p>Lala Trivedi Catering Service</p>
        </div>

        {error && <div className="admin-error">{error}</div>}

        <div className="admin-form">
          <div className="admin-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@ltcs.com"
              value={form.email}
              onChange={handle}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
            />
          </div>
          <div className="admin-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handle}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
            />
          </div>
          <button
            className="admin-login-btn"
            onClick={submit}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </div>
      </div>
    </div>
  )
}