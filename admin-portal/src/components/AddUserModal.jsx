import { useEffect } from 'react'
import { X } from 'lucide-react'
import { offices, roles } from '../data/mockData'
import './AddUserModal.css'

export default function AddUserModal({ onClose, onSave }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = {
      id: Date.now(),
      name: form.name.value,
      email: form.email.value,
      role: form.role.value,
      office: form.office.value,
      status: form.status.value,
      lastLogin: 'Never',
    }
    onSave(data)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-card card">
        <div className="modal-header">
          <h2 className="modal-title">Add New User</h2>
          <button className="modal-close icon-btn" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="modal-name">Full Name</label>
            <input
              id="modal-name"
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="modal-email">Email Address</label>
            <input
              id="modal-email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="modal-role">Role</label>
              <select id="modal-role" name="role" className="form-control" required>
                <option value="">Select role</option>
                {roles.map(r => (
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="modal-office">Office</label>
              <select id="modal-office" name="office" className="form-control" required>
                <option value="">Select office</option>
                {offices.map(o => (
                  <option key={o.id} value={o.name}>{o.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="modal-status">Status</label>
            <select id="modal-status" name="status" className="form-control" required>
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Deactivated">Deactivated</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
