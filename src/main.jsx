import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import AdminLogin from './admin/AdminLogin.jsx'
import AdminLayout from './admin/AdminLayout.jsx'
import Dashboard from './admin/Dashboard.jsx'
import Bookings from './admin/Bookings.jsx'
import CharityAdmin from './admin/Charity.jsx'
import Testimonials from './admin/Testimonials.jsx'
import GalleryAdmin from './admin/Gallery.jsx'
import './index.css'
import './admin/admin.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="charity" element={<CharityAdmin />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="gallery" element={<GalleryAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)