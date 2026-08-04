import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Admin routes are only ever visited by staff, so they are split into their own
// chunk (loaded on demand) instead of shipping in the bundle every public
// visitor downloads. admin.css is imported by AdminLayout so it splits too.
const AdminLogin = lazy(() => import('./admin/AdminLogin.jsx'))
const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'))
const Dashboard = lazy(() => import('./admin/Dashboard.jsx'))
const Bookings = lazy(() => import('./admin/Bookings.jsx'))
const CharityAdmin = lazy(() => import('./admin/Charity.jsx'))
const Testimonials = lazy(() => import('./admin/Testimonials.jsx'))
const GalleryAdmin = lazy(() => import('./admin/Gallery.jsx'))

const AdminFallback = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', color: '#6D6B65' }}>
    Loading…
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<AdminFallback />}>
              <Routes>
                <Route path="login" element={<AdminLogin />} />
                <Route path="" element={<AdminLayout />}>
                  <Route index element={<Navigate to="/admin/dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="charity" element={<CharityAdmin />} />
                  <Route path="testimonials" element={<Testimonials />} />
                  <Route path="gallery" element={<GalleryAdmin />} />
                </Route>
              </Routes>
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)