import React, { useState } from 'react';

export default function SIG2() {
  const [search, setSearch] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [inspectingStudent, setInspectingStudent] = useState(null);

  const [students, setStudents] = useState([
    { id: '2024-00101', name: 'Ana Reyes', program: 'BSIT 3-A', req: 'Program Chair Approval', status: 'Pending', fee: '—', proof: false },
    { id: '2024-00117', name: 'Luis Dela Cruz', program: 'BSIT 3-A', req: 'Program Chair Approval', status: 'Under Review', fee: 'PHP 150.00', proof: true, proofDetails: 'Unreturned library book' },
    { id: '2024-00132', name: 'Carla Mendoza', program: 'BSIS 2-B', req: 'Program Chair Approval', status: 'Deficiency', fee: 'PHP 300.00', proof: false, proofDetails: 'Laboratory fee' },
    { id: '2024-00143', name: 'Mark Villanueva', program: 'BSIT 3-C', req: 'Program Chair Approval', status: 'Pending', fee: '—', proof: false, note: '⚠️ Awaiting Adviser sign-off' },
    { id: '2024-00158', name: 'Joy Ramirez', program: 'BSIS 2-A', req: 'Program Chair Approval', status: 'Pending', fee: '—', proof: false },
    { id: '2024-00163', name: 'Rico Santos', program: 'BSIT 3-B', req: 'Program Chair Approval', status: 'Cleared', fee: '—', proof: false },
    { id: '2024-00171', name: 'Nina Flores', program: 'BSIT 3-A', req: 'Program Chair Approval', status: 'Under Review', fee: 'PHP 300.00', proof: true, proofDetails: 'Laboratory fee' },
    { id: '2024-00189', name: 'Paolo Garcia', program: 'BSIS 2-B', req: 'Program Chair Approval', status: 'Deficiency', fee: 'No amount due', proof: false, proofDetails: 'Overdue book: Operating System Concepts' },
  ]);

  const updateStudentStatus = (id, newStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    setInspectingStudent(null);
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search);
    const matchesProgram = selectedProgram === 'All Programs' || s.program.includes(selectedProgram);
    const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;
    return matchesSearch && matchesProgram && matchesStatus;
  });

  return (
    <div className="signatory-approval-page" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.2rem' }}>
      
      {/* Left Sidebar Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <label style={{ fontSize: '0.68rem', fontWeight: '800', color: '#74806E', letterSpacing: '0.05em' }}>FIND STUDENT</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Name or Student ID"
            style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid #E2E7DC', fontSize: '0.8rem', margin: '0.4rem 0 1rem 0', boxSizing: 'border-box' }}
          />

          <label style={{ fontSize: '0.68rem', fontWeight: '800', color: '#74806E', letterSpacing: '0.05em' }}>ACADEMIC PROGRAM</label>
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid #E2E7DC', fontSize: '0.8rem', margin: '0.4rem 0 1rem 0', boxSizing: 'border-box', backgroundColor: '#F6F8F4' }}
          >
            <option>All Programs</option>
            <option>BSIT</option>
            <option>BSIS</option>
            <option>BSCS</option>
          </select>

          <label style={{ fontSize: '0.68rem', fontWeight: '800', color: '#74806E', letterSpacing: '0.05em' }}>STATUS</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.4rem' }}>
            {[
              { id: 'All', label: 'All', count: 62 },
              { id: 'Pending', label: 'Pending', count: 26 },
              { id: 'Under Review', label: 'Under Review', count: 9 },
              { id: 'Deficiency', label: 'Deficiency', count: 17 },
              { id: 'Cleared', label: 'Cleared', count: 8 },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(st.id)}
                style={{
                  display: 'flex',
                  justify: 'space-between',
                  padding: '0.5rem 0.8rem',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: selectedStatus === st.id ? '#293B2A' : 'transparent',
                  color: selectedStatus === st.id ? '#FFF' : '#29352A',
                  fontSize: '0.8rem',
                  fontWeight: selectedStatus === st.id ? '700' : '500',
                  cursor: 'pointer'
                }}
              >
                <span>{st.label}</span>
                <span style={{ opacity: 0.7 }}>{st.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stage Requirement Card */}
        <div style={{ backgroundColor: '#293B2A', color: '#FFF', borderRadius: '20px', padding: '1.2rem' }}>
          <small style={{ color: '#B6C798', fontSize: '0.65rem' }}>YOUR STAGE</small>
          <h4 style={{ margin: '0.3rem 0 0.6rem 0', fontSize: '0.95rem' }}>Step 4 - Program Chair Approval</h4>
          <p style={{ fontSize: '0.75rem', color: '#DCE5D2', margin: 0, lineHeight: 1.4 }}>
            Steps are cleared in strict order. Students waiting on an earlier step show a locked Approve button.
          </p>
        </div>

      </div>

      {/* Right Table Panel */}
      <div className="signatory-approval-panel" style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#29352A' }}>Clearance Approval Queue</h3>
            <span style={{ fontSize: '0.75rem', color: '#74806E' }}>1st Semester, AY 2026-2027 • Semestral Clearance</span>
          </div>
          <span style={{ backgroundColor: '#EDF1E8', color: '#29352A', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
            {filteredStudents.length} student records
          </span>
        </div>

        <div className="signatory-table-scroll">
        <table className="signatory-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{ color: '#74806E', borderBottom: '2px solid #EDF1E8', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem 0' }}>STUDENT</th>
              <th>REQUIREMENT</th>
              <th>STATUS</th>
              <th>DEFICIENCY SUMMARY</th>
              <th>PROOF</th>
              <th style={{ textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((st) => (
              <tr key={st.id} style={{ borderBottom: '1px solid #F6F8F4' }}>
                
                {/* Student Info */}
                <td style={{ padding: '0.85rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#91A778', color: '#FFF', display: 'grid', placeItems: 'center', fontWeight: 'bold', fontSize: '0.75rem' }}>
                      {st.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: '#29352A' }}>{st.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#74806E' }}>{st.id} · {st.program}</div>
                    </div>
                  </div>
                </td>

                {/* Requirement */}
                <td>
                  <div style={{ fontWeight: '600' }}>{st.req}</div>
                  <div style={{ fontSize: '0.7rem', color: '#74806E' }}>Step 4 of 6</div>
                  {st.note && <div style={{ fontSize: '0.68rem', color: '#A77218' }}>{st.note}</div>}
                </td>

                {/* Status Badge */}
                <td>
                  <span style={{
                    backgroundColor: st.status === 'Cleared' ? '#E5F3E8' : st.status === 'Deficiency' ? '#FAE8E5' : st.status === 'Under Review' ? '#E2F1F7' : '#FFF3DC',
                    color: st.status === 'Cleared' ? '#458469' : st.status === 'Deficiency' ? '#AA5757' : st.status === 'Under Review' ? '#3E7E9C' : '#A77218',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.72rem',
                    fontWeight: '800'
                  }}>
                    {st.status}
                  </span>
                </td>

                {/* Deficiency Summary */}
                <td>
                  {st.fee !== '—' ? (
                    <div>
                      <div style={{ fontWeight: '700', color: '#AA5757' }}>{st.fee}</div>
                      <div style={{ fontSize: '0.7rem', color: '#74806E' }}>{st.proofDetails}</div>
                    </div>
                  ) : (
                    <span style={{ color: '#929B8C' }}>—</span>
                  )}
                </td>

                {/* Proof Icon */}
                <td>
                  {st.proof ? (
                    <button onClick={() => setInspectingStudent(st)} style={{ backgroundColor: '#E2F1F7', border: 'none', borderRadius: '6px', padding: '0.3rem 0.5rem', cursor: 'pointer' }}>🖼️</button>
                  ) : (
                    <span style={{ color: '#929B8C' }}>—</span>
                  )}
                </td>

                {/* Action Controls */}
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.3rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => updateStudentStatus(st.id, 'Cleared')}
                      style={{
                        backgroundColor: st.status === 'Cleared' ? '#E2E7DC' : '#293B2A',
                        color: st.status === 'Cleared' ? '#74806E' : '#FFF',
                        border: 'none',
                        padding: '0.35rem 0.7rem',
                        borderRadius: '14px',
                        fontWeight: '700',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      {st.status === 'Cleared' ? 'Cleared' : 'Approve'}
                    </button>

                    <button
                      onClick={() => updateStudentStatus(st.id, 'Deficiency')}
                      style={{
                        backgroundColor: '#FFF',
                        color: '#AA5757',
                        border: '1px solid #AA5757',
                        padding: '0.35rem 0.7rem',
                        borderRadius: '14px',
                        fontWeight: '700',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      Flag
                    </button>

                    <button
                      onClick={() => setInspectingStudent(st)}
                      style={{
                        backgroundColor: '#EDF1E8',
                        color: '#29352A',
                        border: 'none',
                        padding: '0.35rem 0.7rem',
                        borderRadius: '14px',
                        fontWeight: '700',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      Inspect
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {/* Pagination Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.2rem', fontSize: '0.78rem', color: '#74806E' }}>
          <span>Showing 1–8 of 62 records</span>
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            {[1, 2, 3, '...', 8].map((page, i) => (
              <button
                key={i}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: currentPage === page ? '#293B2A' : '#EDF1E8',
                  color: currentPage === page ? '#FFF' : '#29352A',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Inspect Modal Dialog */}
      {inspectingStudent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'grid',
          placeItems: 'center',
          zIndex: 1000
        }}>
          <div className="signatory-modal" style={{ backgroundColor: '#FFF', borderRadius: '20px', padding: '1.5rem', width: '420px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Student Requirement Details</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#74806E' }}>{inspectingStudent.name} ({inspectingStudent.id})</p>
            
            <div style={{ backgroundColor: '#F6F8F4', padding: '1rem', borderRadius: '12px', margin: '1rem 0', fontSize: '0.82rem' }}>
              <div><strong>Program:</strong> {inspectingStudent.program}</div>
              <div><strong>Status:</strong> {inspectingStudent.status}</div>
              <div><strong>Deficiency:</strong> {inspectingStudent.proofDetails || 'None'}</div>
              <div><strong>Amount Due:</strong> {inspectingStudent.fee}</div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setInspectingStudent(null)} style={{ border: 'none', backgroundColor: '#EDF1E8', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Close</button>
              <button onClick={() => updateStudentStatus(inspectingStudent.id, 'Cleared')} style={{ border: 'none', backgroundColor: '#293B2A', color: '#FFF', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Approve Sign-Off</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}