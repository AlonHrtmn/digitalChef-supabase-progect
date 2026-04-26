export default function AdminOverview() {
  const stats = [
    { label: 'Pending Verifications', count: 4, color: 'var(--accent-gold)' },
    { label: 'Unclaimed Profiles', count: 12, color: 'var(--error)' },
    { label: 'Active Chefs', count: 48, color: 'var(--success)' },
    { label: 'Platform Revenue (ISL)', count: '₪12,450', color: 'var(--text-primary)' },
  ];

  return (
    <div className="fade-in">
      <h1 style={{ marginBottom: '10px', fontSize: '2rem' }}>Dashboard Overview</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
        Welcome back, Admin. Here is what is happening today in the DigitalChef platform.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        marginBottom: '50px'
      }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass" style={{
            padding: '24px',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>
              {stat.label}
            </span>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: stat.color }}>
              {stat.count}
            </span>
          </div>
        ))}
      </div>

      <div className="glass" style={{ padding: '30px', borderRadius: '16px' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Recent Activity</h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <li style={{ paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
            <strong>Chef Eyal Shani</strong> submitted background check documents.
          </li>
          <li style={{ paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
            New unclaimed profile request: <strong>Chef Assaf Granit</strong>.
          </li>
          <li>
            Payment of <strong>₪500</strong> received for booking #4102.
          </li>
        </ul>
      </div>
    </div>
  );
}
