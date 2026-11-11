import React, { useEffect, useState } from 'react';

export default function SIG1({ profile, onNavigateToQueue }) {
  const [queue, setQueue] = useState([]);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [activity, setActivity] = useState([]);
  const activeDeficiencies = queue.filter((student) => student.status === 'Deficiency').length;
  const pendingSettlementProofs = queue.filter((student) => student.proof === true).length;
  const hour = currentTime.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  useEffect(() => {
    const timerId = window.setInterval(() => setCurrentTime(new Date()), 60_000);
    return () => window.clearInterval(timerId);
  }, []);

  const handleApprove = (studentId) => {
    const student = queue.find((item) => item.id === studentId);
    if (!student || student.status === 'Approved') return;

    setQueue(prev => prev.map(item => item.id === studentId ? { ...item, status: 'Approved', statusColor: '#E5F3E8', textColor: '#458469' } : item));
    setApprovedCount(c => c + 1);
    setPendingCount(c => Math.max(0, c - 1));
    setActivity((current) => [
      {
        id: `${studentId}-${Date.now()}`,
        color: '#458469',
        title: `Signed off ${student.name}`,
        sub: 'Program Chair Approval · Just now',
      },
      ...current,
    ]);
  };

  return (
    <div className="signatory-dashboard" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.2rem' }}>
      
      {/* Left Column: Metric Cards & Queue */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        
        {/* Top 4 Stat Grid */}
        <div className="signatory-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          
          <StatCard
            title="Pending Reviews"
            value={pendingCount}
            sub="+6 new since yesterday"
            accent="#A77218"
            icon="⏱️"
          />

          <StatCard
            title="Active Deficiencies"
            value={activeDeficiencies}
            sub="Awaiting resolution"
            accent="#AA5757"
            icon="⚠️"
          />

          <StatCard
            title="Pending Settlement Proofs"
            value={pendingSettlementProofs}
            sub="Awaiting receipt verification"
            accent="#3E7E9C"
            icon="📄"
          />

          <StatCard
            title="Total Approved"
            value={approvedCount}
            sub="78% of assigned students"
            accent="#458469"
            icon="✅"
          />

        </div>

        {/* Next in Your Queue Table */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#29352A' }}>Next in Your Queue</h3>
            <button
              onClick={onNavigateToQueue}
              style={{ background: 'none', border: 'none', color: '#51664C', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              View full Approval Queue →
            </button>
          </div>

          <div className="signatory-table-scroll">
          <table className="signatory-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ color: '#74806E', borderBottom: '1px solid #EDF1E8', textAlign: 'left' }}>
                <th style={{ padding: '0.6rem 0' }}>STUDENT</th>
                <th>REQUIREMENT</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((student) => (
                <tr key={student.id} style={{ borderBottom: '1px solid #F6F8F4' }}>
                  <td style={{ padding: '0.85rem 0' }}>
                    <div style={{ fontWeight: '700', color: '#29352A' }}>{student.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#74806E' }}>{student.id} · {student.course}</div>
                  </td>
                  <td style={{ color: '#51664C', fontWeight: '500' }}>{student.req}</td>
                  <td>
                    <span style={{
                      backgroundColor: student.statusColor,
                      color: student.textColor,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '12px',
                      fontSize: '0.72rem',
                      fontWeight: '800'
                    }}>
                      {student.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {student.status === 'Approved' ? (
                      <span style={{ color: '#458469', fontWeight: 'bold', fontSize: '0.78rem' }}>✓ Cleared</span>
                    ) : student.status === 'Deficiency' ? (
                      <span style={{ color: '#74806E', fontSize: '0.78rem' }}>Awaiting proof</span>
                    ) : (
                      <button
                        onClick={() => handleApprove(student.id)}
                        style={{
                          backgroundColor: student.status === 'Under Review' ? '#E2E7DC' : '#293B2A',
                          color: student.status === 'Under Review' ? '#29352A' : '#FFF',
                          border: 'none',
                          padding: '0.45rem 1rem',
                          borderRadius: '20px',
                          fontWeight: '700',
                          fontSize: '0.75rem',
                          cursor: 'pointer'
                        }}
                      >
                        {student.status === 'Under Review' ? 'Inspect Proof' : 'Approve'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

      </div>

      {/* Right Column: Greeting & Activity Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        
        {/* Welcome Banner */}
        <div style={{ backgroundColor: '#293B2A', color: '#FFF', borderRadius: '24px', padding: '1.5rem' }}>
          <div style={{ fontSize: '0.65rem', color: '#B6C798', letterSpacing: '0.05em', fontWeight: '800' }}>
            1ST SEMESTER, AY 2026-2027 • SEMESTRAL CLEARANCE
          </div>
          <h2 style={{ fontSize: '1.35rem', margin: '0.6rem 0 0.4rem 0', letterSpacing: '-0.02em' }}>
            {greeting}, {profile.title} {profile.lastName}
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#DCE5D2', margin: '0 0 1.2rem 0' }}>
            You have {pendingCount} students waiting at Step 4.
          </p>
          <button
            onClick={onNavigateToQueue}
            style={{
              backgroundColor: '#51664C',
              color: '#FFF',
              border: 'none',
              padding: '0.55rem 1.1rem',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Go to Approval Queue →
          </button>
        </div>

        {/* Activity Stream */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '1.5rem', flex: 1, boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#29352A' }}>Activity Stream</h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activity.length === 0 ? (
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#74806E' }}>
                No recent activity.
              </p>
            ) : (
              activity.map((item) => (
                <ActivityItem key={item.id} color={item.color} title={item.title} sub={item.sub} />
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

function StatCard({ title, value, sub, accent, icon }) {
  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.2rem', position: 'relative', boxShadow: '0 4px 14px rgba(0,0,0,0.03)', borderLeft: `5px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#74806E', fontWeight: '700' }}>
        <span>{title}</span>
        <span>{icon}</span>
      </div>
      <div style={{ fontSize: '2rem', fontWeight: '800', color: '#29352A', margin: '0.4rem 0 0.1rem 0' }}>{value}</div>
      <div style={{ fontSize: '0.72rem', color: accent, fontWeight: '700' }}>{sub}</div>
    </div>
  );
}

function ActivityItem({ color, title, sub }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem' }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, marginTop: '5px', flexShrink: 0 }} />
      <div>
        <div style={{ fontWeight: '700', color: '#29352A' }}>{title}</div>
        <div style={{ fontSize: '0.72rem', color: '#74806E' }}>{sub}</div>
      </div>
    </div>
  );
}