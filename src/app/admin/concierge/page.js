'use client';
import { useState } from 'react';

export default function ConciergeDesk() {
  const [requests, setRequests] = useState([
    { id: 1, chefName: 'Chef Meir Adoni', requestedBy: 'Alon Cohen', location: 'Tel Aviv', status: 'Unclaimed' },
    { id: 2, chefName: 'Chef Asaf Granit', requestedBy: 'Sarah Levy', location: 'Jerusalem', status: 'Unclaimed' },
    { id: 3, chefName: 'Chef Tomer Agay', requestedBy: 'David M.', location: 'Herzliya', status: 'Contacted' },
  ]);

  const handleContact = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Contacted' } : r));
    // In a real app, this would trigger an email modal or API call
    alert("Onboarding email preview generated!");
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Concierge Desk</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manually onboard popular chefs requested by users.</p>
        </div>
      </div>

      <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', fontWeight: '500' }}>Chef Name</th>
              <th style={{ padding: '16px', fontWeight: '500' }}>Location</th>
              <th style={{ padding: '16px', fontWeight: '500' }}>Requested By</th>
              <th style={{ padding: '16px', fontWeight: '500' }}>Status</th>
              <th style={{ padding: '16px', fontWeight: '500', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px', fontWeight: '500' }}>{r.chefName}</td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{r.location}</td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{r.requestedBy}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    backgroundColor: r.status === 'Contacted' ? 'rgba(82, 196, 26, 0.2)' : 'rgba(255, 77, 79, 0.2)',
                    color: r.status === 'Contacted' ? 'var(--success)' : 'var(--error)'
                  }}>
                    {r.status}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  {r.status === 'Unclaimed' ? (
                    <button 
                      className="btn btn-primary" 
                      style={{ padding: '6px 12px', fontSize: '0.9rem' }} 
                      onClick={() => handleContact(r.id)}
                    >
                      Draft Email
                    </button>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)' }}>Follow up in 3 days</span>
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
