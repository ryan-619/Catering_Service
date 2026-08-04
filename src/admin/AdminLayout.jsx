import { useEffect } from 'react'
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom'
import { FaCalendarAlt, FaHeart, FaSignOutAlt, FaTachometerAlt, FaStar, FaImages } from 'react-icons/fa'
import './admin.css'

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const admin = JSON.parse(localStorage.getItem('ltcs_admin') || '{}')

  useEffect(() => {
    const token = localStorage.getItem('ltcs_token')
    if (!token) navigate('/admin/login')
  }, [navigate])

  const logout = () => {
    localStorage.removeItem('ltcs_token')
    localStorage.removeItem('ltcs_admin')
    navigate('/admin/login')
  }

 const links = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { path: '/admin/bookings', label: 'Bookings', icon: <FaCalendarAlt /> },
  { path: '/admin/charity', label: 'Charity', icon: <FaHeart /> },
  { path: '/admin/testimonials', label: 'Testimonials', icon: <FaStar /> },
  { path: '/admin/gallery', label: 'Gallery', icon: <FaImages /> },
]

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <span>LTCS</span>
          <small>Admin Panel</small>
        </div>

        <nav className="admin-nav">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`admin-nav-link ${location.pathname === l.path ? 'active' : ''}`}
            >
              {l.icon} {l.label}
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user">
            <div className="admin-user-name">{admin.name}</div>
            <div className="admin-user-email">{admin.email}</div>
          </div>
          <button className="admin-logout" onClick={logout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}