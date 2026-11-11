import React, { useState } from 'react';

export default function SIG3() {
  const [awaitingList, setAwaitingList] = useState([]);

  const [readyList, setReadyList] = useState([]);

  const [resolvedList, setResolvedList] = useState([]);

  const handleApproveProof = (item) => {
    setReadyList(prev => prev.filter(r => r.id !== item.id));
    setResolvedList(prev => [{
      id: item.id,
      name: item.name,
      course: item.course,
      decision: 'Proof approved · requirement marked as cleared',
      amount: item.amount,
      status: 'Cleared',
      date: 'Just now'
    }, ...prev]);
  };

  return (
    <div className="signatory-deficiencies-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      
      {/* Top Title & Header Metrics Bar */}
      <div className="signatory-deficiencies-header" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#29352A' }}>Deficiencies & Proofs</h2>
          <span style={{ fontSize: '0.78rem', color: '#74806E' }}>Items needing settlement review • 1st Sem, AY 2026-2027</span>
        </div>

        <div className="signatory-metrics-grid" style={{ display: 'flex', gap: '1rem' }}>
          <HeaderPill count={0} label="Active Deficiencies" accent="#AA5757" />
          <HeaderPill count={0} label="Pending Settlement Proofs" accent="#3E7E9C" />
          <HeaderPill count={0} label="Resolved This Week" accent="#458469" />
        </div>
      </div>

      {/* 3 Column Kanban Board */}
      <div className="signatory-kanban-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
        
        {/* Col 1: Awaiting Settlement */}
        <KanbanCol title="Awaiting Settlement" sub="Flagged - student has not submitted proof" badge={awaitingList.length} color="#AA5757">
          {awaitingList.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Avatar name={item.name} color="#91A778" />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#74806E' }}>{item.id} · {item.course}</div>
                  </div>
                </div>
                <span style={{ backgroundColor: '#FAE8E5', color: '#AA5757', padding: '0.15rem 0.5rem', borderRadius: '10px', fontSize: '0.68rem', fontWeight: 'bold', height: 'fit-content' }}>deficiency</span>
              </div>

              <div style={{ margin: '0.8rem 0', fontSize: '0.78rem' }}>
                <div style={{ color: '#74806E', fontSize: '0.68rem' }}>REASON</div>
                <div>{item.reason}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '800', color: '#29352A' }}>{item.amount}</span>
                <span style={{ fontSize: '0.7rem', color: '#A77218' }}>⏳ Waiting for student</span>
              </div>
            </div>
          ))}
        </KanbanCol>

        {/* Col 2: Ready for Review */}
        <KanbanCol title="Ready for Review" sub="Proof uploaded - needs your verification" badge={readyList.length} color="#3E7E9C">
          {readyList.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Avatar name={item.name} color="#91A778" />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#74806E' }}>{item.id} · {item.course}</div>
                  </div>
                </div>
                <span style={{ backgroundColor: '#E2F1F7', color: '#3E7E9C', padding: '0.15rem 0.5rem', borderRadius: '10px', fontSize: '0.68rem', fontWeight: 'bold', height: 'fit-content' }}>Under Review</span>
              </div>

              <div style={{ margin: '0.8rem 0', fontSize: '0.78rem' }}>
                <div style={{ color: '#74806E', fontSize: '0.68rem' }}>REASON</div>
                <div>{item.reason}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '800', color: '#29352A' }}>{item.amount}</span>
                <button
                  onClick={() => handleApproveProof(item)}
                  style={{ backgroundColor: '#293B2A', color: '#FFF', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Inspect Proof
                </button>
              </div>
            </div>
          ))}
        </KanbanCol>

        {/* Col 3: Recently Resolved */}
        <KanbanCol title="Recently Resolved" sub="Your latest proof decisions" badge={resolvedList.length} color="#458469">
          {resolvedList.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Avatar name={item.name} color="#91A778" />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#74806E' }}>{item.id} · {item.course}</div>
                  </div>
                </div>
                <span style={{ backgroundColor: item.status === 'Cleared' ? '#E5F3E8' : '#FAE8E5', color: item.status === 'Cleared' ? '#458469' : '#AA5757', padding: '0.15rem 0.5rem', borderRadius: '10px', fontSize: '0.68rem', fontWeight: 'bold', height: 'fit-content' }}>
                  {item.status}
                </span>
              </div>

              <div style={{ margin: '0.8rem 0', fontSize: '0.78rem' }}>
                <div style={{ color: '#74806E', fontSize: '0.68rem' }}>DECISION</div>
                <div>{item.decision}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '800', color: '#29352A' }}>{item.amount}</span>
                <button onClick={() => alert(`Record Details for ${item.name}`)} style={{ backgroundColor: '#EDF1E8', color: '#29352A', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>View Record</button>
              </div>
            </div>
          ))}
        </KanbanCol>

      </div>

    </div>
  );
}

function HeaderPill({ count, label, accent }) {
  return (
    <div style={{ borderLeft: `4px solid ${accent}`, backgroundColor: '#F6F8F4', padding: '0.4rem 0.8rem', borderRadius: '10px', fontSize: '0.78rem' }}>
      <strong style={{ fontSize: '1rem', color: '#29352A', display: 'block' }}>{count}</strong>
      <span style={{ color: '#74806E', fontSize: '0.7rem' }}>{label}</span>
    </div>
  );
}

function KanbanCol({ title, sub, badge, color, children }) {
  return (
    <div style={{ backgroundColor: '#EAEFE6', borderRadius: '24px', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ borderBottom: `3px solid ${color}`, paddingBottom: '0.6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0, color: '#29352A' }}>{title}</h4>
          <span style={{ backgroundColor: color, color: '#FFF', width: 22, height: 22, borderRadius: '50%', fontSize: '0.72rem', fontWeight: 'bold', display: 'grid', placeItems: 'center' }}>{badge}</span>
        </div>
        <div style={{ fontSize: '0.7rem', color: '#74806E', marginTop: '0.2rem' }}>{sub}</div>
      </div>
      {children}
    </div>
  );
}

function Avatar({ name, color }) {
  return (
    <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: color, color: '#FFF', display: 'grid', placeItems: 'center', fontWeight: 'bold', fontSize: '0.7rem' }}>
      {name.split(' ').map(n=>n[0]).join('')}
    </div>
  );
}