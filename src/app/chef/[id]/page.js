"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ChefProfile() {
  const params = useParams();
  const router = useRouter();
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Booking details
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    const fetchChef = async () => {
      // Fetch chef data
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', params.id)
        .single();
      
      if (error || !data) {
        // Handle redirect if totally missing
        router.push('/');
        return;
      }
      
      // Fetch digital products
      const { data: productData } = await supabase
        .from('digital_products')
        .select('*')
        .eq('chef_id', params.id)
        .order('created_at', { ascending: false });
        
      setProducts(productData || []);
      setChef(data);
      setLoading(false);
    };

    if (params.id) {
      fetchChef();
    }
  }, [params.id, router]);

  if (loading) {
    return <main className="container" style={{ paddingTop: '80px', textAlign: 'center' }}>טוען פרופיל... (Loading...)</main>;
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
             <img src={chef.avatar_url || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400"} alt={chef.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{chef.full_name}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '24px' }}>שף ב-DigitalChef</p>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            {chef.is_verified && <span className="glass" style={{ padding: '8px 16px', borderRadius: '8px', color: 'var(--success)' }}>מאומת (Verified)</span>}
            <span className="glass" style={{ padding: '8px 16px', borderRadius: '8px' }}>★ חמישה כוכבים (New)</span>
          </div>

          <section>
            <h2 style={{ marginBottom: '16px' }}>על השף (About the Chef)</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
              {chef.bio || "שף מקצועי המציע מגוון חוויות קולינריות."} 
              <br/><br/>
              כאן נוסיף פירוט נוסף כגון שנות ניסיון, פילוסופיית בישול, וחוויות עבר מהקולינריה ככל שיעלו לאתר.
            </p>
          </section>

          {products.length > 0 && (
            <section style={{ marginTop: '48px' }}>
              <h2 style={{ marginBottom: '24px', color: 'var(--accent-gold)' }}>סדנאות ומדריכי וידאו (Digital Guides & Recipes)</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {products.map((prod) => (
                   <div key={prod.id} className="glass" style={{ padding: '24px', borderRadius: '12px', border: prod.is_premium ? '1px solid var(--accent-gold)' : 'none' }}>
                     <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{prod.title}</h3>
                     <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                        {prod.description?.substring(0, 80)}...
                     </p>
                     
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <span style={{ fontWeight: 'bold' }}>
                         {prod.is_premium ? `₪${prod.price}` : 'חינם (Free)'}
                       </span>
                       <Link href={`/product/${prod.id}`} className={prod.is_premium ? "btn btn-primary" : "btn btn-outline"}>
                         {prod.is_premium ? 'לרכישה (Unlock)' : 'לצפייה (Watch)'}
                       </Link>
                     </div>
                   </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column: Booking Widget */}
        <div style={{ position: 'relative' }}>
          <div className="glass" style={{ padding: '32px', borderRadius: '16px', position: 'sticky', top: '40px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>בקשת הזמנה (Request Booking)</h3>
            <p style={{ fontSize: '1.25rem', marginBottom: '8px' }}>₪{chef.hourly_rate || "250"} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/ לאדם (per guest)</span></p>
            
            <div style={{ margin: '32px 0' }}>
               <div style={{ marginBottom: '16px' }}>
                 <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>תאריך האירוע (Event Date)</label>
                 <input 
                   type="date" 
                   className="input-field" 
                   value={eventDate} 
                   onChange={(e) => setEventDate(e.target.value)} 
                 />
               </div>
               
               <div style={{ marginBottom: '16px' }}>
                 <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>מספר סועדים (Guests)</label>
                 <input 
                   type="number" 
                   className="input-field" 
                   min="1" 
                   max="50" 
                   value={guests} 
                   onChange={(e) => setGuests(e.target.value)} 
                 />
               </div>
            </div>

            <Link 
              href={`/chef/${chef.id}/book?date=${eventDate}&guests=${guests}`} 
              className="btn btn-primary btn-full" 
              style={{textAlign: "center"}}>
                הזמן עכשיו (Book Now)
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
