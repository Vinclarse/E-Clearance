import { useState, useMemo } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, Eye, CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";
import "./StudentDirectory.css";

const MOCK_STUDENTS = [
  { id: "2024-00123", name: "Maria Santos", course: "BSIT", year: "3rd Year", status: "Completed", progress: 100 },
  { id: "2024-00124", name: "Juan dela Cruz", course: "BSED", year: "2nd Year", status: "Pending", progress: 33 },
  { id: "2024-00125", name: "Ana Reyes", course: "BSN", year: "4th Year", status: "Under Review", progress: 66 },
  { id: "2024-00126", name: "Carlos Mendoza", course: "BSBA", year: "1st Year", status: "Deficiency", progress: 50 },
  { id: "2024-00127", name: "Liza Garcia", course: "BSIT", year: "4th Year", status: "Completed", progress: 100 },
  { id: "2024-00128", name: "Mark Torres", course: "BSCE", year: "3rd Year", status: "Pending", progress: 16 },
  { id: "2024-00129", name: "Rosa Villanueva", course: "BSN", year: "2nd Year", status: "Completed", progress: 100 },
  { id: "2024-00130", name: "Paul Aquino", course: "BSED", year: "1st Year", status: "Pending", progress: 0 },
  { id: "2024-00131", name: "Joy Fernandez", course: "BSBA", year: "3rd Year", status: "Under Review", progress: 83 },
  { id: "2024-00132", name: "Rico Castillo", course: "BSIT", year: "4th Year", status: "Deficiency", progress: 50 },
  { id: "2024-00133", name: "Nina Lopez", course: "BSCE", year: "2nd Year", status: "Completed", progress: 100 },
  { id: "2024-00134", name: "Ben Ramos", course: "BSBA", year: "1st Year", status: "Pending", progress: 16 },
];

const PAGE_SIZE = 8;

const statusConfig = {
  Completed:     { color: "#5a7a3a", bg: "rgba(90,122,58,0.1)",  icon: CheckCircle },
  Pending:       { color: "#c4913a", bg: "rgba(196,145,58,0.1)", icon: Clock },
  "Under Review":{ color: "#c47a3a", bg: "rgba(196,122,58,0.1)", icon: Eye },
  Deficiency:    { color: "#c43a3a", bg: "rgba(196,58,58,0.1)",  icon: AlertCircle },
};

export default function StudentDirectory() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return MOCK_STUDENTS.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.id.includes(search) ||
        s.course.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "All" || s.status === filterStatus;
      const matchYear = filterYear === "All" || s.year === filterYear;
      return matchSearch && matchStatus && matchYear;
    });
  }, [search, filterStatus, filterYear]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  return (
    <div className="sd-page">
      <div className="sd-page-header">
        <div>
          <h1 className="sd-title">Student Directory</h1>
          <p className="sd-sub">View and manage all enrolled students and their clearance progress.</p>
        </div>
        <div className="sd-summary-pills">
          {Object.entries(statusConfig).map(([status, cfg]) => {
            const count = MOCK_STUDENTS.filter((s) => s.status === status).length;
            return (
              <span key={status} className="sd-summary-pill" style={{ background: cfg.bg, color: cfg.color }}>
                {status}: {count}
              </span>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="sd-controls">
        <div className="sd-search-wrap">
          <Search size={14} className="sd-search-icon" />
          <input
            type="text"
            className="sd-search"
            placeholder="Search by name, ID, or course..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="sd-filters">
          <Filter size={13} className="sd-filter-icon" />
          <select className="sd-select" value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}>
            <option value="All">All Statuses</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Under Review</option>
            <option>Deficiency</option>
          </select>
          <select className="sd-select" value={filterYear} onChange={(e) => { setFilterYear(e.target.value); setPage(1); }}>
            <option value="All">All Year Levels</option>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="sd-table-card">
        <table className="sd-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Year Level</th>
              <th>Clearance Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={6} className="sd-empty">No students match your search.</td>
              </tr>
            ) : (
              paged.map((s) => {
                const cfg = statusConfig[s.status];
                const Icon = cfg.icon;
                return (
                  <tr key={s.id}>
                    <td className="sd-id">{s.id}</td>
                    <td className="sd-name">{s.name}</td>
                    <td className="sd-course">{s.course}</td>
                    <td>{s.year}</td>
                    <td>
                      <span
                        className="sd-status-badge"
                        style={{ background: cfg.bg, color: cfg.color }}
                      >
                        <Icon size={11} />
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <div className="sd-progress-wrap">
                        <div
                          className="sd-progress-fill"
                          style={{ width: s.progress + "%", background: cfg.color }}
                        />
                      </div>
                      <span className="sd-progress-num">{s.progress}%</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="sd-pagination">
          <span className="sd-pagination-info">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} students
          </span>
          <div className="sd-pagination-btns">
            <button
              className="sd-page-btn"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={"sd-page-btn num" + (p === page ? " active" : "")}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="sd-page-btn"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}