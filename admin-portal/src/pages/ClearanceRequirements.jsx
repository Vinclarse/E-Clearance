import { useState } from 'react'
import { Pencil, Trash2, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { clearanceRequirements as initialReqs, offices } from '../data/mockData'
import './ClearanceRequirements.css'

const PAGE_SIZE = 5

function StatusBadge({ status }) {
  return (
    <span className={`badge ${status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
      {status}
    </span>
  )
}

export default function ClearanceRequirements() {
  const [reqs, setReqs] = useState(initialReqs)
  const [filterOffice, setFilterOffice] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = filterOffice === 'All'
    ? reqs
    : reqs.filter(r => r.office === filterOffice)

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleDelete(id) {
    if (window.confirm('Delete this requirement?')) {
      setReqs(prev => prev.filter(r => r.id !== id))
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Clearance Requirements</h1>
        <p>Manage clearance requirements for each office</p>
      </div>

      <div className="card cr-card">
        {/* Toolbar */}
        <div className="cr-toolbar">
          <div className="cr-filter">
            <Filter size={14} className="filter-icon" />
            <select
              className="filter-select form-control"
              value={filterOffice}
              onChange={e => { setFilterOffice(e.target.value); setPage(1) }}
            >
              <option value="All">All Offices</option>
              {offices.map(o => (
                <option key={o.id} value={o.name}>{o.name}</option>
              ))}
            </select>
          </div>
          <button className="btn-primary">
            <Plus size={15} />
            Add Requirement
          </button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Requirement Name</th>
                <th>Description</th>
                <th>Office</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={6} className="empty-row">No requirements found.</td></tr>
              ) : paginated.map((req, idx) => (
                <tr key={req.id}>
                  <td className="row-num">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td>
                    <span className="req-name">{req.name}</span>
                  </td>
                  <td className="req-desc">{req.description}</td>
                  <td>
                    <span className="office-pill">{req.office}</span>
                  </td>
                  <td><StatusBadge status={req.status} /></td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn" title="Edit requirement">
                        <Pencil size={13} />
                      </button>
                      <button className="icon-btn danger" title="Delete requirement" onClick={() => handleDelete(req.id)}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <span className="pagination-info">
            Showing {paginated.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
            <ChevronLeft size={15} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} className={`page-btn ${p === page ? 'active' : ''}`} onClick={() => setPage(p)}>
              {p}
            </button>
          ))}
          <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
