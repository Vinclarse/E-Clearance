import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { ShieldCheck, Bell, LayoutDashboard, Users, Shield, Building2, ClipboardList, Moon, Sun } from 'lucide-react'
import NotificationDropdown from './NotificationDropdown'
import './Navbar.css'

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const notifRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <NavLink to="/dashboard" className="navbar-brand">
          <ShieldCheck size={22} strokeWidth={2.2} />
          <span>E-Clearance</span>
        </NavLink>

        {/* Nav Links */}
        <ul className="navbar-links">
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <LayoutDashboard size={15} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/user-accounts" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <Users size={15} />
              User Accounts
            </NavLink>
          </li>
          <li>
            <NavLink to="/role-management" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <Shield size={15} />
              Role Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/office-management" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <Building2 size={15} />
              Office Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/clearance-requirements" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <ClipboardList size={15} />
              Clearance Requirements
            </NavLink>
          </li>
        </ul>

        {/* Right controls */}
        <div className="navbar-right">
          {/* Bell */}
          <div className="notif-wrapper" ref={notifRef}>
            <button
              className="bell-btn"
              onClick={() => setShowNotifications(prev => !prev)}
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="notif-dot" />
            </button>
            {showNotifications && (
              <NotificationDropdown onClose={() => setShowNotifications(false)} />
            )}
          </div>

          {/* Dark mode toggle */}
          <button
            className={`dark-toggle ${darkMode ? 'dark-toggle--on' : ''}`}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="dark-toggle-track">
              <span className="dark-toggle-thumb">
                {darkMode ? <Moon size={10} color="#4a5240" /> : <Sun size={10} color="#f59e0b" />}
              </span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
