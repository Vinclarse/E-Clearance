import React, { useState } from 'react';

export default function SIG3() {
  const [awaitingList, setAwaitingList] = useState([
    { id: '2024-00132', name: 'Carla Mendoza', course: 'BSIS 2-B', reason: 'Laboratory fee', amount: 'PHP 300.00', date: 'Nov 03, 2026' },
    { id: '2024-00189', name: 'Paolo Garcia', course: 'BSIS 2-B', reason: 'Overdue book: Operating System Concepts', amount: 'No amount', date: 'Nov 04, 2026' },
    { id: '2024-00204', name: 'Hannah Lim', course: 'BSIT 3-D', reason: 'Unreturned book: Database System Concepts 7th Edition', amount: 'PHP 150.00', date: 'Nov 03, 2026' },
  ]);

  const [readyList, setReadyList] = useState([
    { id: '2024-00117', name: 'Luis Dela Cruz', course: 'BSIT 3-A', reason: 'Unreturned book: Database System Concepts 7th Edition', amount: 'PHP 150.00', time: 'Nov 08 - 11:42 AM' },
    { id: '2024-00171', name: 'Nina Flores', course: 'BSIT 3-A', reason: 'Laboratory fee', amount: 'PHP 300.00', time: 'Nov 08 - 2:15 PM' },
    { id: '2024-00219', name: 'Gabriel Torres', course: 'BSIT 3-B', reason: 'Lost laboratory equipment', amount: 'PHP 500.00', time: 'Nov 07 - 11:25 AM' },
  ]);

  const [resolvedList, setResolvedList] = useState([
    { id: '2024-00163', name: 'Rico Santos', course: 'BSIT 3-B', decision: 'Proof approved · requirement marked as cleared', amount: 'PHP 200.00', status: 'Cleared', date: 'Nov 08 - 3:30 PM' },
    { id: '2024-00224', name: 'Elena Cruz', course: 'BSIS 2-A', decision: 'Proof rejected: Receipt is blurry. Please upload a clearer copy.', amount: 'PHP 150.00', status: 'Rejected', date: 'Nov 08 - 11:10 AM' },
    { id: '2024-00231', name: 'Marco Dizon', course: 'BSIT 3-C', decision: 'Proof approved · requirement marked as cleared', amount: 'PHP 300.00', status: 'Cleared', date: 'Nov 08 - 4:48 PM' },
  ]);

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
          <HeaderPill count={awaitingList.length + 14} label="Active Deficiencies" accent="#AA5757" />
          <HeaderPill count={readyList.length} label="Pending Settlement Proofs" accent="#3E7E9C" />
          <HeaderPill count={resolvedList.length + 11} label="Resolved This Week" accent="#458469" />
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