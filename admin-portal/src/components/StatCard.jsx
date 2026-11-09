import './StatCard.css'

export default function StatCard({ icon, value, label, color, bgColor }) {
  return (
    <div className="stat-card card">
      <div className="stat-card-icon" style={{ background: bgColor, color }}>
        {icon}
      </div>
      <div className="stat-card-info">
        <span className="stat-card-value">{value}</span>
        <span className="stat-card-label">{label}</span>
      </div>
    </div>
  )
}
