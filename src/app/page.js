import Link from "next/link";
import { chefs } from "@/lib/mockData";

export default function Home() {
  return (
    <main className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <header style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '16px', color: 'var(--accent-gold)' }}>
          DigitalChef
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
          שף פרטי עד הבית (Private Chef to your Home)
        </p>
      </header>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>מומלצים באזורך (Featured Chefs)</h2>
          <button className="btn btn-outline">סינון (Filters)</button>
        </div>

        <div className="chef-grid">
          {chefs.map((chef) => (
            <Link href={`/chef/${chef.id}`} key={chef.id} className="chef-card glass">
              {chef.kosher && <span className="badge">כשר (Kosher)</span>}
              <img src={chef.image} alt={chef.name} className="chef-image" />
              
              <div className="chef-card-content">
                <h3 className="card-title">{chef.name}</h3>
                <p className="card-subtitle">{chef.cuisine}</p>
                <p style={{ fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6' }}>
                  {chef.shortBio}
                </p>
                
                <div className="card-meta">
                  <span className="rating">★ {chef.rating} ({chef.reviewsCount})</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{chef.priceRange}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
