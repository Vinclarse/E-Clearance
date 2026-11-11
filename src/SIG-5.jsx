import React, { useState } from 'react';

export default function SIG5() {
  const [filter, setFilter] = useState('All');

  const [roster, setRoster] = useState([
    { id: '2024-00101', name: 'Ana Reyes', course: 'BSIT 3-A', steps: [true, true, true, false, false, false], clearedCount: '3 of 6', status: 'Pending', validated: false },
    { id: '2024-00117', name: 'Luis Dela Cruz', course: 'BSIT 3-A', steps: [false, false, false, false, false, false], clearedCount: '0 of 6', status: 'Under Review', validated: false },
    { id: '2024-00163', name: 'Rico Santos', course: 'BSIT 3-B', steps: [true, true, true, true, true, true], clearedCount: '6 of 6', status: 'Completed', validated: true },
    { id: '2024-00132', name: 'Carla Mendoza', course: 'BSIS 2-B', steps: [true, false, false, false, false, false], clearedCount: '1 of 6', status: 'Deficiency', validated: false },
    { id: '2024-00231', name: 'Marco Dizon', course: 'BSIT 3-C', steps: [true, true, true, true, true, true], clearedCount: '6 of 6', status: 'Completed', validated: true },
    { id: '2024-00158', name: 'Joy Ramirez', course: 'BSIS 2-A', steps: [true, true, true, true, false, false], clearedCount: '4 of 6', status: 'Pending', validated: false },
  ]);

  const toggleValidate = (id) => {
    setRoster(prev => prev.map(s => s.id === id ? { ...s, validated: !s.validated } : s));
  };

  const filteredRoster = roster.filter(s => filter === 'All' || s.status === filter);

  return (
    <div className="signatory-cohort-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      
      {/* Visual Analytics Bar */}
      <div className="signatory-cohort-analytics" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr 1.1fr 1.5fr', gap: '1rem' }}>
        
        {/* Department Stats */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.2rem' }}>
          <div style={{ fontSize: '0.68rem', color: '#74806E', fontWeight: 'bold' }}>TOTAL DEPARTMENT STUDENTS</div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#29352A' }}>120</div>
          <div style={{ fontSize: '0.72rem', color: '#91A778' }}>BSIT: 120 Students Enrolled</div>
        </div>

        {/* Completion Gauge */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: '7px solid #51664C',
            borderTopColor: '#E2E7DC',
            display: 'grid',
            placeItems: 'center',
            fontWeight: '800',
            fontSize: '0.95rem'
          }}>
            64%
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>Cohort Completion Rate</div>
            <div style={{ fontSize: '0.72rem', color: '#74806E' }}>77 Fully cleared | 31 In progress</div>
          </div>
        </div>

        {/* Enrollment Progress */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.2rem' }}>
          <div style={{ fontSize: '0.68rem', color: '#74806E', fontWeight: 'bold' }}>TERM ENROLLMENT PROGRESS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#29352A' }}>38 <span style={{ fontSize: '0.85rem', color: '#74806E', fontWeight: 'normal' }}>/ 77 validated</span></div>
          <div style={{ fontSize: '0.7rem', color: '#A77218' }}>39 waiting for chair sign-off</div>
        </div>

        {/* Bar Chart Representation */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.2rem' }}>
          <div style={{ fontSize: '0.68rem', color: '#74806E', fontWeight: 'bold', marginBottom: '0.5rem' }}>STUDENTS CLEARED PER STEP</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '42px', paddingInline: '0.5rem' }}>
            <Bar h="90%" label="118" />
            <Bar h="80%" label="112" />
            <Bar h="70%" label="104" />
            <Bar h="60%" label="96" active />
            <Bar h="50%" label="88" />
            <Bar h="40%" label="77" />
          </div>
        </div>

      </div>

      {/* Roster & Sign-off Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <h3 style={{ margin: 0, color: '#29352A', fontSize: '1.1rem' }}>Department Student Roster</h3>
          
          <div className="signatory-cohort-filters" style={{ display: 'flex', gap: '0.4rem', backgroundColor: '#EDF1E8', padding: '0.25rem', borderRadius: '30px' }}>
            {['All', 'Completed', 'In Progress', 'Deficiency'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  backgroundColor: filter === f ? '#293B2A' : 'transparent',
                  color: filter === f ? '#FFF' : '#29352A',
                  border: 'none',
                  padding: '0.35rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="signatory-table-scroll">
        <table className="signatory-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ color: '#74806E', borderBottom: '2px solid #EDF1E8', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem 0' }}>STUDENT</th>
              <th>CLEARANCE PROGRESS (STEPS 1–6)</th>
              <th>OVERALL STATUS</th>
              <th style={{ textAlign: 'right' }}>ENROLLMENT VALIDATION</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoster.map((st) => (
              <tr key={st.id} style={{ borderBottom: '1px solid #F6F8F4' }}>
                
                <td style={{ padding: '0.85rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#91A778', color: '#FFF', display: 'grid', placeItems: 'center', fontWeight: 'bold', fontSize: '0.75rem' }}>
                      {st.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: '#29352A' }}>{st.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#74806E' }}>{st.id} · {st.course}</div>
                    </div>
                  </div>
                </td>

                {/* Steps Dots */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {st.steps.map((done, idx) => (
                      <span
                        key={idx}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          backgroundColor: done ? '#458469' : '#EDF1E8',
                          color: done ? '#FFF' : '#74806E',
                          fontSize: '0.65rem',
                          fontWeight: 'bold',
                          display: 'grid',
                          placeItems: 'center'
                        }}
                      >
                        {done ? '✓' : idx + 1}
                      </span>
                    ))}
                    <span style={{ fontSize: '0.75rem', color: '#74806E', marginLeft: '0.4rem' }}>{st.clearedCount}</span>
                  </div>
                </td>

                {/* Status Badge */}
                <td>
                  <span style={{
                    backgroundColor: st.status === 'Completed' ? '#E5F3E8' : st.status === 'Deficiency' ? '#FAE8E5' : '#FFF3DC',
                    color: st.status === 'Completed' ? '#458469' : st.status === 'Deficiency' ? '#AA5757' : '#A77218',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '12px',
                    fontSize: '0.72rem',
                    fontWeight: '800'
                  }}>
                    {st.status}
                  </span>
                </td>

                {/* Validation Button Action */}
                <td style={{ textAlign: 'right' }}>
                  {st.status === 'Completed' ? (
                    <button
                      onClick={() => toggleValidate(st.id)}
                      style={{
                        backgroundColor: st.validated ? '#293B2A' : '#51664C',
                        color: '#FFF',
                        border: 'none',
                        padding: '0.45rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {st.validated ? '✓ Enrolled for Next Term' : 'Validate for Enrollment'}
                    </button>
                  ) : (
                    <button disabled style={{ backgroundColor: '#EDF1E8', color: '#74806E', border: 'none', padding: '0.45rem 1rem', borderRadius: '20px', fontSize: '0.75rem', cursor: 'not-allowed' }}>
                      Validate for Enrollment
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
  );
}

function Bar({ h, label, active }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '12%' }}>
      <span style={{ fontSize: '0.65rem', color: '#74806E' }}>{label}</span>
      <div style={{ width: '100%', height: h, backgroundColor: active ? '#293B2A' : '#91A778', borderRadius: '4px' }} />
    </div>
  );
}