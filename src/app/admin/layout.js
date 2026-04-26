'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin' },
    { name: 'Verification Portal', path: '/admin/verifications' },
    { name: 'Concierge Desk', path: '/admin/concierge' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className="glass" style={{
        width: '260px',
        padding: '30px',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h2 style={{ color: 'var(--accent-gold)', marginBottom: '40px', fontSize: '1.5rem' }}>DigitalChef Admin</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} style={{
                padding: '12px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: isActive ? 'var(--accent-gold)' : 'var(--text-primary)',
                backgroundColor: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                fontWeight: isActive ? '600' : '400',
                transition: 'all 0.2s ease',
              }}>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
