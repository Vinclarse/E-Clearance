import { roles } from '../data/mockData'
import { Check, X } from 'lucide-react'
import './RoleManagement.css'

const avatarColors = ['#4caf76', '#6b7280', '#374151']

const allPermissions = [
  'View Clearance Status',
  'Submit Clearance Request',
  'View Office Requirements',
  'Approve/Reject Requests',
  'Manage Office Requirements',
  'View All Requests',
  'Generate Reports',
  'Issue Clearance Hold',
  'View Student Records',
  'Approve Clearance',
]

export default function RoleManagement() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Role Management</h1>
        <p>Manage roles and permissions for system users</p>
      </div>

      {/* Role cards */}
      <div className="role-cards-grid">
        {roles.map((role, i) => (
          <div key={role.id} className="role-card card">
            <div className="role-card-avatar" style={{ background: avatarColors[i] }}>
              {role.name[0]}
            </div>
            <h3 className="role-card-name">{role.name}</h3>
            <p className="role-card-desc">{role.description}</p>
            <div className="role-card-tags">
              {role.permissions.map(p => (
                <span key={p} className="role-tag">{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Permissions table */}
      <div className="card rm-table-card">
        <div className="rm-table-header">
          <h3>Permissions Matrix</h3>
          <p>Overview of what each role can do in the system</p>
        </div>
        <div className="table-wrapper">
          <table className="data-table perms-table">
            <thead>
              <tr>
                <th>Permission</th>
                {roles.map(r => (
                  <th key={r.id} className="perm-role-col">{r.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPermissions.map(perm => (
                <tr key={perm}>
                  <td className="perm-name">{perm}</td>
                  {roles.map(r => (
                    <td key={r.id} className="perm-cell">
                      {r.permissions.includes(perm) ? (
                        <span className="perm-yes"><Check size={14} /></span>
                      ) : (
                        <span className="perm-no"><X size={14} /></span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
