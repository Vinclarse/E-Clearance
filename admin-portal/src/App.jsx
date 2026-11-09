import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import UserAccounts from './pages/UserAccounts'
import RoleManagement from './pages/RoleManagement'
import OfficeManagement from './pages/OfficeManagement'
import ClearanceRequirements from './pages/ClearanceRequirements'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark'
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  function toggleDarkMode() {
    setDarkMode(prev => !prev)
  }

  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-accounts" element={<UserAccounts />} />
        <Route path="/role-management" element={<RoleManagement />} />
        <Route path="/office-management" element={<OfficeManagement />} />
        <Route path="/clearance-requirements" element={<ClearanceRequirements />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
