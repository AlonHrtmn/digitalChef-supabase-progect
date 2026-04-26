"use client";

import { useState } from 'react';

export default function RequestsPage() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      customer: "משפחת כהן (Cohen Family)",
      date: "30/11/2026",
      guests: 8,
      type: "ארוחת יום הולדת (Birthday Dinner)",
      payout: "₪3,400",
      status: "pending"
    }
  ]);

  const handleAction = (id, action) => {
    setRequests(requests.map(req => {
      if(req.id === id) {
        return { ...req, status: action };
      }
      return req;
    }));
  };

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>בקשות ממתינות (Pending Requests)</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.2rem' }}>
        כאן מופיעות בקשות חדשות לאירועים. אשר או דחה תוך 24 שעות. (Accept/Decline within 24h)
      </p>

      {requests.length === 0 ? (
        <p>אין בקשות חדשות. (No new requests)</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {requests.map((req) => (
            <div key={req.id} className="glass" style={{ padding: '32px', borderRadius: '16px', position: 'relative' }}>
              
              {/* Status Badge */}
              {req.status === 'accepted' && (
                 <div style={{ position: 'absolute', top: 24, left: 24, background: 'rgba(82, 196, 26, 0.2)', color: 'var(--success)', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold' }}>אושר (Accepted)</div>
              )}
              {req.status === 'declined' && (
                 <div style={{ position: 'absolute', top: 24, left: 24, background: 'rgba(255, 77, 79, 0.2)', color: 'var(--error)', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold' }}>נדחה (Declined)</div>
              )}

              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{req.customer}</h3>
              
              <div style={{ display: 'flex', gap: '40px', marginBottom: '32px' }}>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>תאריך (Date)</strong>
                  {req.date}
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>סועדים (Guests)</strong>
                  {req.guests}
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>סוג אירוע (Type)</strong>
                  {req.type}
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '4px' }}>רווח צפוי (Payout)</strong>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>{req.payout}</span>
                </div>
              </div>

              {req.status === 'pending' && (
                <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                  <button onClick={() => handleAction(req.id, 'accepted')} className="btn btn-primary">אשר בקשה (Accept)</button>
                  <button onClick={() => handleAction(req.id, 'declined')} className="btn btn-outline" style={{ borderColor: 'var(--border-color)' }}>דחה (Decline)</button>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
