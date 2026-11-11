import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import "./Navbar.css";

const navLinks = [
  { to: "/", label: "Executive Dashboard" },
  { to: "/clearance-templates", label: "Clearance Templates" },
  { to: "/student-directory", label: "Student Directory" },
  { to: "/signatory-roles", label: "Signatory Roles" },
  { to: "/audit-logs", label: "Audit Logs" },
];

export default function Navbar() {
  const [showMenu, setShowMenu]   = useState(false);
  const [menuPos,  setMenuPos]    = useState({ top: 0, right: 0 });
  const [notifCount]              = useState(3);
  const triggerRef                = useRef(null);
  const dropdownRef               = useRef(null);
  const navigate                  = useNavigate();

  /* ── Open / close ── */
  function handleTrigger() {
    if (!showMenu && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPos({
        top:   rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setShowMenu((v) => !v);
  }

  /* ── Close on outside click ── */
  useEffect(() => {
    function onOutside(e) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        triggerRef.current  && !triggerRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    }
    if (showMenu) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [showMenu]);

  /* ── Reposition on scroll / resize ── */
  useEffect(() => {
    function reposition() {
      if (showMenu && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setMenuPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
      }
    }
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [showMenu]);

  function handleLogout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("admin_user");
    setShowMenu(false);
    navigate("/");
  }

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">

        {/* Left: Brand */}
        <div className="navbar-brand">
          <div className="navbar-logo">
            <img src="/dnsc-logo.jpg" alt="DNSC Logo" className="navbar-logo-img" />
          </div>
          <div className="navbar-brand-text">
            <span className="navbar-brand-name">Davao del Norte State College</span>
            <span className="navbar-brand-sub">Administration - All Institutes</span>
          </div>
        </div>

        {/* Center: Nav Links */}
        <ul className="navbar-nav">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  "navbar-nav-link" + (isActive ? " active" : "")
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right: Bell + User */}
        <div className="navbar-user">
          <button className="navbar-bell" aria-label="Notifications">
            <Bell size={15} />
            {notifCount > 0 && (
              <span className="navbar-bell-badge">{notifCount}</span>
            )}
          </button>

          <button
            ref={triggerRef}
            className="navbar-profile-trigger"
            onClick={handleTrigger}
            aria-expanded={showMenu}
          >
            <div className="navbar-avatar">JKF</div>
            <div className="navbar-user-info">
              <span className="navbar-user-name">Jandy Kyle Fuerza</span>
              <span className="navbar-user-role">System Administrator</span>
            </div>
            <ChevronDown
              size={14}
              className={"navbar-chevron" + (showMenu ? " open" : "")}
            />
          </button>
        </div>
      </nav>

      {/* ── Dropdown — fixed position, escapes all parent stacking ── */}
      {showMenu && (
        <div
          ref={dropdownRef}
          className="navbar-dropdown"
          style={{ top: menuPos.top, right: menuPos.right }}
        >
          {/* Header */}
          <div className="navbar-dropdown-header">
            <div className="navbar-dropdown-avatar-lg">
                <img src="/dnsc-logo.jpg" alt="DNSC" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
              </div>
            <div className="navbar-dropdown-header-info">
              <p className="navbar-dropdown-name">Jandy Kyle Fuerza</p>
              <p className="navbar-dropdown-email">admin@dnsc.edu.ph</p>
              <span className="navbar-dropdown-role-badge">System Administrator</span>
            </div>
          </div>

          <div className="navbar-dropdown-divider" />

          <NavLink
            to="/profile"
            className="navbar-dropdown-item"
            onClick={() => setShowMenu(false)}
          >
            <User size={14} /> My Profile
          </NavLink>

          <NavLink
            to="/settings"
            className="navbar-dropdown-item"
            onClick={() => setShowMenu(false)}
          >
            <Settings size={14} /> Settings
          </NavLink>

          <div className="navbar-dropdown-divider" />

          <button className="navbar-dropdown-item danger" onClick={handleLogout}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}