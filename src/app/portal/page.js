export default function PortalDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>שלום, מאריו (Hello, Mario)</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.2rem' }}>
        ברוך שובך! הנה הסיכום השבועי על הפעילות שלך. (Your weekly overview)
      </p>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        
        <div className="glass" style={{ padding: '24px', borderRadius: '12px', borderBottom: '3px solid var(--accent-gold)' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.95rem' }}>רווחים החודש (Monthly Earnings)</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>₪6,400</div>
        </div>
        
        <div className="glass" style={{ padding: '24px', borderRadius: '12px' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.95rem' }}>אירועים בינואר (Events this Jan)</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>3</div>
        </div>
        
        <div className="glass" style={{ padding: '24px', borderRadius: '12px' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.95rem' }}>בקשות ממתינות (Pending Requests)</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>1</div>
        </div>

      </div>

      {/* Next Upcoming Gig Highlight */}
      <h2 style={{ marginBottom: '24px' }}>האירוע הבא שלך (Your Next Gig)</h2>
      <div className="glass" style={{ padding: '32px', borderRadius: '16px', borderRight: '4px solid var(--success)' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>הזמנה מ-"ליאור כהן" (Lior Cohen)</h3>
               
               <div style={{ display: 'flex', gap: '32px', color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.1rem' }}>
                 <div>
                   <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>תאריך מתוכנן</strong>
                   24 בנובמבר 2026, 19:30
                 </div>
                 <div>
                   <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>סוג אירוע</strong>
                   רומנטי זוגי (Romantic Dinner for 2)
                 </div>
                 <div>
                   <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>רמת השרון</strong>
                   הצגת כתובת מלאה באפליקציה ביום האירוע
                 </div>
               </div>

            </div>
            
            <div style={{ textAlign: 'left' }}>
               <span style={{ display: 'inline-block', background: 'rgba(82, 196, 26, 0.2)', color: 'var(--success)', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', marginBottom: '16px' }}>אושר! תשלום הובטח.</span>
               <br />
               <button className="btn btn-outline" style={{width: '100%'}}>נהל מנה וכלים (Manage Menu)</button>
            </div>
         </div>
      </div>
    </div>
  );
}
