import { useState, useMemo } from "react";
import { Search, Filter, Download, User, FileText, Settings, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import "./AuditLogs.css";

const ACTION_TYPES = {
  "Template Created":   { color: "#5a7a3a", bg: "rgba(90,122,58,0.1)",  icon: FileText },
  "Template Updated":   { color: "#c4913a", bg: "rgba(196,145,58,0.1)", icon: FileText },
  "Clearance Issued":   { color: "#4a7cb8", bg: "rgba(74,124,184,0.1)", icon: Shield },
  "Role Modified":      { color: "#8a4a9a", bg: "rgba(138,74,154,0.1)", icon: Settings },
  "Login":              { color: "#3a8a7a", bg: "rgba(58,138,122,0.1)", icon: User },
  "Settings Updated":   { color: "#c47a3a", bg: "rgba(196,122,58,0.1)", icon: Settings },
  "Student Viewed":     { color: "#6b7560", bg: "rgba(107,117,96,0.1)", icon: User },
};

const MOCK_LOGS = [
  { id: 1, timestamp: "2026-11-11 19:42:08", actor: "Jandy Kyle Fuerza", action: "Template Created", detail: "Created Semestral Clearance template for AY 2026-2027", ip: "192.168.1.10" },
  { id: 2, timestamp: "2026-11-11 19:38:21", actor: "Jandy Kyle Fuerza", action: "Clearance Issued", detail: "Issued clearance to 1,240 students — Semestral Clearance AY 2026-2027", ip: "192.168.1.10" },
  { id: 3, timestamp: "2026-11-11 18:55:44", actor: "Jandy Kyle Fuerza", action: "Role Modified", detail: "Updated signatories for Cashier office — added Ms. Santos", ip: "192.168.1.10" },
  { id: 4, timestamp: "2026-11-11 17:30:12", actor: "Jandy Kyle Fuerza", action: "Login", detail: "Admin login from 192.168.1.10 — successful", ip: "192.168.1.10" },
  { id: 5, timestamp: "2026-11-10 14:22:05", actor: "Jandy Kyle Fuerza", action: "Template Updated", detail: "Modified Semestral Clearance — changed target year levels to 1st-4th", ip: "192.168.1.10" },
  { id: 6, timestamp: "2026-11-10 13:58:30", actor: "Jandy Kyle Fuerza", action: "Settings Updated", detail: "Changed academic year to AY 2026-2027", ip: "192.168.1.10" },
  { id: 7, timestamp: "2026-11-10 11:15:42", actor: "Jandy Kyle Fuerza", action: "Student Viewed", detail: "Viewed clearance progress for student ID 2024-00125", ip: "192.168.1.10" },
  { id: 8, timestamp: "2026-11-10 10:00:00", actor: "Jandy Kyle Fuerza", action: "Login", detail: "Admin login from 192.168.1.10 — successful", ip: "192.168.1.10" },
  { id: 9, timestamp: "2026-11-09 16:45:11", actor: "Jandy Kyle Fuerza", action: "Role Modified", detail: "Added new signatory role — Institute Governor", ip: "192.168.1.10" },
  { id: 10, timestamp: "2026-11-09 09:12:33", actor: "Jandy Kyle Fuerza", action: "Template Created", detail: "Saved draft of Summer Clearance 2027 template", ip: "192.168.1.10" },
];

const PAGE_SIZE = 7;

export default function AuditLogs() {
  const [search, setSearch] = useState("");
  const [filterAction, setFilterAction] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return MOCK_LOGS.filter((l) => {
      const matchSearch =
        l.actor.toLowerCase().includes(search.toLowerCase()) ||
        l.detail.toLowerCase().includes(search.toLowerCase()) ||
        l.action.toLowerCase().includes(search.toLowerCase());
      const matchAction = filterAction === "All" || l.action === filterAction;
      return matchSearch && matchAction;
    });
  }, [search, filterAction]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  return (
    <div className="al-page">
      <div className="al-page-header">
        <div>
          <h1 className="al-title">Audit Logs</h1>
          <p className="al-sub">Complete history of all admin actions and system events.</p>
        </div>
        <button className="al-export-btn">
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* Controls */}
      <div className="al-controls">
        <div className="al-search-wrap">
          <Search size={14} className="al-search-icon" />
          <input
            type="text"
            className="al-search"
            placeholder="Search logs by actor, action, or detail..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="al-filters">
          <Filter size={13} className="al-filter-icon" />
          <select
            className="al-select"
            value={filterAction}
            onChange={(e) => { setFilterAction(e.target.value); setPage(1); }}
          >
            <option value="All">All Actions</option>
            {Object.keys(ACTION_TYPES).map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Logs table */}
      <div className="al-table-card">
        <table className="al-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Actor</th>
              <th>Action</th>
              <th>Details</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={5} className="al-empty">No logs match your search.</td>
              </tr>
            ) : (
              paged.map((l) => {
                const cfg = ACTION_TYPES[l.action] || { color: "#6b7560", bg: "rgba(107,117,96,0.1)", icon: FileText };
                const Icon = cfg.icon;
                return (
                  <tr key={l.id}>
                    <td className="al-timestamp">{l.timestamp}</td>
                    <td className="al-actor">
                      <div className="al-actor-wrap">
                        <div className="al-actor-avatar">
                          {l.actor.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        {l.actor}
                      </div>
                    </td>
                    <td>
                      <span className="al-action-badge" style={{ background: cfg.bg, color: cfg.color }}>
                        <Icon size={11} />
                        {l.action}
                      </span>
                    </td>
                    <td className="al-detail">{l.detail}</td>
                    <td className="al-ip">{l.ip}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="al-pagination">
          <span className="al-pagination-info">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} entries
          </span>
          <div className="al-pagination-btns">
            <button className="al-page-btn" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} className={"al-page-btn" + (p === page ? " active" : "")} onClick={() => setPage(p)}>{p}</button>
            ))}
            <button className="al-page-btn" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}