import { useState } from 'react'
import { Pencil, Trash2, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { offices as initialOffices } from '../data/mockData'
import './OfficeManagement.css'

const PAGE_SIZE = 5

function StatusBadge({ status }) {
  return (
    <span className={`badge ${status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
      {status}
    </span>
  )
}

export default function OfficeManagement() {
  const [offices, setOffices] = useState(initialOffices)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = offices.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.description.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleDelete(id) {
    if (window.confirm('Delete this office?')) {
      setOffices(prev => prev.filter(o => o.id !== id))
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Office Management</h1>
        <p>Manage offices and their clearance requirements</p>
      </div>

      <div className="card om-card">
        {/* Toolbar */}
        <div className="om-toolbar">
          <div className="search-box">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              placeholder="Search offices..."
              className="search-input"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
          <button className="btn-primary">
            <Plus size={15} />
            Add Office
          </button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Office Name</th>
                <th>Description</th>
                <th>Requirements</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={6} className="empty-row">No offices found.</td></tr>
              ) : paginated.map((office, idx) => (
                <tr key={office.id}>
                  <td className="row-num">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td>
                    <div className="office-cell">
                      <div className="office-icon">{office.name[0]}</div>
                      <span className="office-name">{office.name}</span>
                    </div>
                  </td>
                  <td className="office-desc">{office.description}</td>
                  <td>
                    <span className="req-count">{office.requirements} requirement{office.requirements !== 1 ? 's' : ''}</span>
                  </td>
                  <td><StatusBadge status={office.status} /></td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn" title="Edit office">
                        <Pencil size={13} />
                      </button>
                      <button className="icon-btn danger" title="Delete office" onClick={() => handleDelete(office.id)}>
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
