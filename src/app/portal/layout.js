import Link from 'next/link';

export default function PortalLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      
      {/* Sidebar Navigation */}
      <aside className="glass" style={{ width: '280px', padding: '32px 24px', borderLeft: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: 'var(--accent-gold)', marginBottom: '40px', fontSize: '1.5rem', textAlign: 'center' }}>
          Chef Portal
        </h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link href="/portal" style={{ fontSize: '1.1rem', color: 'var(--text-primary)', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }}>
            📊 דשבורד (Dashboard)
          </Link>
          <Link href="/portal/requests" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', padding: '12px', borderRadius: '8px', transition: 'background 0.2s' }}>
            📥 בקשות (Requests)
          </Link>
          <Link href="#" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', padding: '12px', borderRadius: '8px', transition: 'background 0.2s' }}>
            ⚙️ הגדרות (Settings)
          </Link>
        </nav>
        
        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
          <Link href="/" style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            ← חזרה לאתר (Back to Marketplace)
          </Link>
        </div>
      </aside>

      {/* Main View Area */}
      <main style={{ flex: 1, padding: '48px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
      
    </div>
  );
}
