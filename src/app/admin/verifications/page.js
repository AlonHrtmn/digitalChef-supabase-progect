'use client';
import { useState } from 'react';

export default function VerificationPortal() {
  const [verifications, setVerifications] = useState([
    { id: 1, name: 'Chef Yossi', status: 'Pending', type: 'ID & Background', date: 'Oct 24, 2026' },
    { id: 2, name: 'Chef Miri', status: 'Pending', type: 'Culinary Certificate', date: 'Oct 23, 2026' },
    { id: 3, name: 'Chef Avi', status: 'Approved', type: 'ID & Background', date: 'Oct 20, 2026' },
  ]);

  const handleApprove = (id) => {
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: 'Approved' } : v));
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Verification Portal</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Review and approve chef documents to grant "Verified" status.</p>
        </div>
      </div>

      <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', fontWeight: '500' }}>Chef Name</th>
              <th style={{ padding: '16px', fontWeight: '500' }}>Verification Type</th>
              <th style={{ padding: '16px', fontWeight: '500' }}>Submitted</th>
              <th style={{ padding: '16px', fontWeight: '500' }}>Status</th>
              <th style={{ padding: '16px', fontWeight: '500', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {verifications.map((v) => (
              <tr key={v.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px' }}>{v.name}</td>
                <td style={{ padding: '16px' }}>{v.type}</td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{v.date}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    backgroundColor: v.status === 'Approved' ? 'rgba(82, 196, 26, 0.2)' : 'rgba(212, 175, 55, 0.2)',
                    color: v.status === 'Approved' ? 'var(--success)' : 'var(--accent-gold)'
                  }}>
                    {v.status}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  {v.status === 'Pending' ? (
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.9rem' }}>View Docs</button>
                      <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.9rem' }} onClick={() => handleApprove(v.id)}>Approve</button>
                    </div>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)' }}>Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
