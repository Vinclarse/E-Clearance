import { useState } from "react";
import { Plus, Pencil, Trash2, ShieldCheck, X, Save } from "lucide-react";
import "./SignatoryRoles.css";

const INITIAL_ROLES = [
  { id: 1, office: "Library", role: "Librarians", signatories: ["Ms. Cruz", "Mr. Reyes"], order: 1, active: true },
  { id: 2, office: "Cashier", role: "Cashiers", signatories: ["Ms. Santos"], order: 2, active: true },
  { id: 3, office: "Adviser", role: "Advisers", signatories: ["Dr. Garcia", "Prof. Torres"], order: 3, active: true },
  { id: 4, office: "Program Chair", role: "Program Chairs", signatories: ["Dr. Lim"], order: 4, active: true },
  { id: 5, office: "Governor", role: "Governors", signatories: ["Mr. Aquino"], order: 5, active: true },
  { id: 6, office: "Dean", role: "Deans", signatories: ["Dr. Villanueva"], order: 6, active: true },
];

export default function SignatoryRoles() {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ office: "", role: "", signatories: "", order: "" });
  const [confirmDelete, setConfirmDelete] = useState(null);

  function openAdd() {
    setEditing(null);
    setForm({ office: "", role: "", signatories: "", order: "" });
    setShowModal(true);
  }

  function openEdit(r) {
    setEditing(r.id);
    setForm({ office: r.office, role: r.role, signatories: r.signatories.join(", "), order: r.order });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.office || !form.role) return;
    const sigs = form.signatories.split(",").map((s) => s.trim()).filter(Boolean);
    if (editing) {
      setRoles((prev) => prev.map((r) => r.id === editing ? { ...r, ...form, signatories: sigs, order: Number(form.order) } : r));
    } else {
      const newId = Math.max(...roles.map((r) => r.id)) + 1;
      setRoles((prev) => [...prev, { id: newId, ...form, signatories: sigs, order: Number(form.order), active: true }]);
    }
    setShowModal(false);
  }

  function handleDelete(id) {
    setRoles((prev) => prev.filter((r) => r.id !== id));
    setConfirmDelete(null);
  }

  function toggleActive(id) {
    setRoles((prev) => prev.map((r) => r.id === id ? { ...r, active: !r.active } : r));
  }

  const sortedRoles = [...roles].sort((a, b) => a.order - b.order);

  return (
    <div className="sr-page">
      <div className="sr-page-header">
        <div>
          <h1 className="sr-title">Signatory Roles</h1>
          <p className="sr-sub">Configure the offices and personnel authorized to clear students in each step.</p>
        </div>
        <button className="sr-add-btn" onClick={openAdd}>
          <Plus size={15} />
          Add Role
        </button>
      </div>

      <div className="sr-table-card">
        <table className="sr-table">
          <thead>
            <tr>
              <th>Step</th>
              <th>Office</th>
              <th>Role Name</th>
              <th>Authorized Signatories</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRoles.map((r) => (
              <tr key={r.id} className={!r.active ? "inactive-row" : ""}>
                <td>
                  <div className="sr-step-num">{r.order}</div>
                </td>
                <td className="sr-office">{r.office}</td>
                <td>
                  <span className="sr-role-pill">{r.role}</span>
                </td>
                <td>
                  <div className="sr-sigs">
                    {r.signatories.map((s) => (
                      <span key={s} className="sr-sig-tag">{s}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <button
                    className={"sr-status-toggle" + (r.active ? " active" : "")}
                    onClick={() => toggleActive(r.id)}
                  >
                    {r.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  <div className="sr-actions">
                    <button className="sr-action-btn edit" onClick={() => openEdit(r)} title="Edit">
                      <Pencil size={13} />
                    </button>
                    <button className="sr-action-btn delete" onClick={() => setConfirmDelete(r.id)} title="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="sr-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="sr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sr-modal-header">
              <div className="sr-modal-title-row">
                <ShieldCheck size={18} className="sr-modal-icon" />
                <h2 className="sr-modal-title">{editing ? "Edit Role" : "Add New Role"}</h2>
              </div>
              <button className="sr-modal-close" onClick={() => setShowModal(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="sr-modal-body">
              <div className="sr-form-field">
                <label>Office Name</label>
                <input className="sr-input" placeholder="e.g. Library" value={form.office} onChange={(e) => setForm((f) => ({ ...f, office: e.target.value }))} />
              </div>
              <div className="sr-form-field">
                <label>Role Name</label>
                <input className="sr-input" placeholder="e.g. Librarians" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} />
              </div>
              <div className="sr-form-field">
                <label>Signatories (comma-separated)</label>
                <input className="sr-input" placeholder="e.g. Ms. Cruz, Mr. Reyes" value={form.signatories} onChange={(e) => setForm((f) => ({ ...f, signatories: e.target.value }))} />
              </div>
              <div className="sr-form-field">
                <label>Clearance Step Order</label>
                <input className="sr-input" type="number" placeholder="e.g. 1" value={form.order} onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))} />
              </div>
            </div>
            <div className="sr-modal-footer">
              <button className="sr-cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="sr-save-btn" onClick={handleSave}>
                <Save size={13} />
                {editing ? "Save Changes" : "Add Role"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="sr-modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="sr-modal small" onClick={(e) => e.stopPropagation()}>
            <div className="sr-modal-header">
              <h2 className="sr-modal-title">Delete Role</h2>
              <button className="sr-modal-close" onClick={() => setConfirmDelete(null)}><X size={16} /></button>
            </div>
            <div className="sr-modal-body">
              <p className="sr-delete-msg">Are you sure you want to delete this signatory role? This action cannot be undone.</p>
            </div>
            <div className="sr-modal-footer">
              <button className="sr-cancel-btn" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="sr-delete-confirm-btn" onClick={() => handleDelete(confirmDelete)}>
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}