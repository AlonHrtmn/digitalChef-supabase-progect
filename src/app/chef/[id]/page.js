import { chefs } from "@/lib/mockData";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ChefProfile({ params }) {
  const resolvedParams = await params;
  const chef = chefs.find((c) => c.id === resolvedParams.id);
  
  if (!chef) {
    notFound();
  }

  return (
    <main className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <nav style={{ marginBottom: '32px' }}>
        <Link href="/" style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center' }}>
          ← חזרה לחיפוש (Back to Search)
        </Link>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 350px', gap: '40px' }}>
        
        {/* Left Column: Chef Details */}
        <div>
          <div style={{ borderRadius: '16px', overflow: 'hidden', height: '400px', marginBottom: '32px' }}>
             <img src={chef.image} alt={chef.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{chef.name}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '24px' }}>{chef.cuisine}</p>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            {chef.kosher && <span className="glass" style={{ padding: '8px 16px', borderRadius: '8px', color: 'var(--accent-gold)' }}>כשר (Kosher)</span>}
            <span className="glass" style={{ padding: '8px 16px', borderRadius: '8px' }}>★ {chef.rating} ({chef.reviewsCount} חוות דעת)</span>
          </div>

          <section>
            <h2 style={{ marginBottom: '16px' }}>על השף (About the Chef)</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
              {chef.shortBio} 
              <br/><br/>
              כאן נוסיף פירוט נוסף כגון שנות ניסיון, פילוסופיית בישול, וחוויות עבר מהקולינריה.
            </p>
          </section>
        </div>

        {/* Right Column: Booking Widget */}
        <div style={{ position: 'relative' }}>
          <div className="glass" style={{ padding: '32px', borderRadius: '16px', position: 'sticky', top: '40px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>בקשת הזמנה (Request Booking)</h3>
            <p style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{chef.priceRange} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/ לאדם</span></p>
            
            <div style={{ margin: '32px 0' }}>
               {/* Placeholders for date/guests inputs */}
               <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                 תאריך האירוע (Event Date)
               </div>
               <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', color: 'var(--text-secondary)' }}>
                 מספר סועדים (Guests)
               </div>
            </div>

            {chef.claimed ? (
              <Link href={`/chef/${chef.id}/book`} className="btn btn-primary btn-full" style={{textAlign: "center"}}>הזמן עכשיו (Book Now)</Link>
            ) : (
              <button className="btn btn-primary btn-full">בקש שף זה (Request this Chef)</button>
            )}

            {!chef.claimed && (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '16px', textAlign: 'center' }}>
                שף זה טרם נרשם לפלטפורמה. אנו ניצור עמו קשר במיוחד עבורך למילוי הבקשה. (Concierge active)
              </p>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
