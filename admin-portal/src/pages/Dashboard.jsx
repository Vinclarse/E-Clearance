import { Users, Building2, Clock, CheckCircle } from 'lucide-react'
import StatCard from '../components/StatCard'
import './Dashboard.css'

const activityData = [
  { label: 'Mon', value: 65 },
  { label: 'Tue', value: 80 },
  { label: 'Wed', value: 55 },
  { label: 'Thu', value: 90 },
  { label: 'Fri', value: 72 },
  { label: 'Sat', value: 40 },
  { label: 'Sun', value: 30 },
]

const statusData = [
  { label: 'Approved', count: 55, color: '#4caf76', pct: 52 },
  { label: 'Pending', count: 42, color: '#f59e0b', pct: 40 },
  { label: 'Rejected', count: 8, color: '#ef4444', pct: 8 },
]

const recentItems = [
  { name: 'Maria Santos', action: 'submitted clearance request', time: '5m ago', status: 'Pending' },
  { name: 'Carlo Mendoza', action: 'clearance approved by Registrar', time: '1h ago', status: 'Approved' },
  { name: 'Liza Fernandez', action: 'library clearance completed', time: '2h ago', status: 'Approved' },
  { name: 'Ramon Torres', action: 'clearance request rejected', time: '3h ago', status: 'Rejected' },
  { name: 'Ana Reyes', action: 'submitted clearance request', time: '5h ago', status: 'Pending' },
]

export default function Dashboard() {
  const maxBar = Math.max(...activityData.map(d => d.value))

  return (
    <div className="page-container">
      {/* Welcome card */}
      <div
        className="welcome-card"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px 28px',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #4a5240 0%, #6b7a5e 100%)',
          borderRadius: '12px',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        }}
      >
        <div className="welcome-text">
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>Welcome Back, Admin! 👋</h2>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>Here's what's happening with your clearance system today.</p>
        </div>
        <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.80)', fontWeight: 500 }}>
          <span>{new Date().toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        <StatCard
          icon={<Users size={24} />}
          value="417"
          label="Total Users"
          color="#4a5a3a"
          bgColor="#dcfce7"
        />
        <StatCard
          icon={<Building2 size={24} />}
          value="5"
          label="Total Offices"
          color="#1e40af"
          bgColor="#dbeafe"
        />
        <StatCard
          icon={<Clock size={24} />}
          value="42"
          label="Pending Requests"
          color="#92400e"
          bgColor="#fef9c3"
        />
        <StatCard
          icon={<CheckCircle size={24} />}
          value="55"
          label="Approved Today"
          color="#065f46"
          bgColor="#d1fae5"
        />
      </div>

      {/* Chart section */}
      <div className="charts-row">
        {/* Bar chart: Recent Activity */}
        <div className="chart-card card">
          <div className="chart-header">
            <h3>Recent Clearance Activity</h3>
            <span className="chart-sub">Last 7 days</span>
          </div>
          <div className="bar-chart">
            {activityData.map((d) => (
              <div key={d.label} className="bar-col">
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ height: `${(d.value / maxBar) * 100}%` }}
                  />
                </div>
                <span className="bar-label">{d.label}</span>
                <span className="bar-val">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="chart-col-right">
          {/* Status donut-ish overview */}
          <div className="chart-card card">
            <div className="chart-header">
              <h3>Clearance Status Overview</h3>
              <span className="chart-sub">Today</span>
            </div>
            <div className="status-overview">
              {statusData.map(s => (
                <div key={s.label} className="status-row-item">
                  <div className="status-row-label">
                    <span className="status-dot" style={{ background: s.color }} />
                    <span>{s.label}</span>
                  </div>
                  <div className="status-bar-track">
                    <div className="status-bar-fill" style={{ width: `${s.pct}%`, background: s.color }} />
                  </div>
                  <span className="status-row-count">{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity list */}
          <div className="chart-card card recent-list-card">
            <div className="chart-header">
              <h3>Recent Submissions</h3>
            </div>
            <ul className="recent-list">
              {recentItems.map((item, i) => (
                <li key={i} className="recent-list-item">
                  <div className="recent-avatar">{item.name[0]}</div>
                  <div className="recent-info">
                    <span className="recent-name">{item.name}</span>
                    <span className="recent-action">{item.action}</span>
                  </div>
                  <div className="recent-meta">
                    <span className={`badge badge-${item.status.toLowerCase()}`}>{item.status}</span>
                    <span className="recent-time">{item.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
