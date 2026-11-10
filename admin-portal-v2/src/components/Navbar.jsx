import { NavLink } from "react-router-dom";
import { Bell, ChevronDown } from "lucide-react";
import "./Navbar.css";

const navLinks = [
  { to: "/", label: "Executive Dashboard" },
  { to: "/clearance-templates", label: "Clearance Templates" },
  { to: "/student-directory", label: "Student Directory" },
  { to: "/signatory-roles", label: "Signatory Roles" },
  { to: "/audit-logs", label: "Audit Logs" },
];

export default function Navbar() {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        {/* Left: Brand */}
        <div className="navbar-brand">
          <div className="navbar-logo">DNSC</div>
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

        {/* Right: User */}
        <div className="navbar-user">
          <button className="navbar-bell" aria-label="Notifications">
            <Bell size={15} />
          </button>
          <div className="navbar-avatar">JKF</div>
          <div className="navbar-user-info">
            <span className="navbar-user-name">Jandy Kyle Fuerza</span>
            <span className="navbar-user-role">System Administrator</span>
          </div>
          <button className="navbar-dropdown-btn" aria-label="User menu">
            <ChevronDown size={14} />
          </button>
        </div>
      </nav>
    </div>
  );
}
