import { useState } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react'
import { users as initialUsers } from '../data/mockData'
import AddUserModal from '../components/AddUserModal'
import './UserAccounts.css'

const TABS = ['All', 'Active', 'Inactive', 'Deactivated', 'Pending']
const PAGE_SIZE = 5

function StatusBadge({ status }) {
  const map = {
    Active: 'badge-active',
    Inactive: 'badge-inactive',
    Pending: 'badge-pending',
    Deactivated: 'badge-deactivated',
  }
  return <span className={`badge ${map[status] || 'badge-deactivated'}`}>{status}</span>
}

export default function UserAccounts() {
  const [users, setUsers] = useState(initialUsers)
  const [activeTab, setActiveTab] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = users.filter(u => {
    const matchTab = activeTab === 'All' || u.status === activeTab
    const matchSearch =
      search === '' ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleTabChange(tab) {
    setActiveTab(tab)
    setPage(1)
  }

  function handleAddUser(newUser) {
    setUsers(prev => [newUser, ...prev])
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== id))
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>User Accounts</h1>
        <p>Manage system users and their access</p>
      </div>

      <div className="card ua-card">
        {/* Toolbar */}
        <div className="ua-toolbar">
          <div className="ua-tabs">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`ua-tab ${activeTab === tab ? 'ua-tab--active' : ''}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
                <span className="ua-tab-count">
                  {tab === 'All' ? users.length : users.filter(u => u.status === tab).length}
                </span>
              </button>
            ))}
          </div>

          <div className="ua-actions">
            <div className="search-box">
              <Search size={14} className="search-icon" />
              <input
                type="text"
                placeholder="Search users..."
                className="search-input"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
              />
            </div>
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              <Plus size={15} />
              Add User
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Last Login</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Office</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="empty-row">No users found.</td>
                </tr>
              ) : paginated.map((user, idx) => (
                <tr key={user.id}>
                  <td className="row-num">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">{user.name[0]}</div>
                      <span className="user-name">{user.name}</span>
                    </div>
                  </td>
                  <td className="text-secondary">{user.lastLogin}</td>
                  <td className="text-secondary">{user.email}</td>
                  <td>
                    <span className="role-pill">{user.role}</span>
                  </td>
                  <td className="text-secondary">{user.office}</td>
                  <td><StatusBadge status={user.status} /></td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn" title="Edit user">
                        <Pencil size={13} />
                      </button>
                      <button className="icon-btn danger" title="Delete user" onClick={() => handleDelete(user.id)}>
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

      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onSave={handleAddUser}
        />
      )}
    </div>
  )
}
