"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PortalDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  
  // Digital Products state
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', video_url: '', price: 0, is_premium: false });
  const [submittingProduct, setSubmittingProduct] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/portal/login');
        return;
      }

      // Fetch chef profile info
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      // Fetch chef's bookings
      const { data: bookingData } = await supabase
        .from('bookings')
        .select('*')
        .eq('chef_id', session.user.id)
        .order('event_date', { ascending: true });

      // Fetch chef's digital products
      const { data: productData } = await supabase
        .from('digital_products')
        .select('*')
        .eq('chef_id', session.user.id)
        .order('created_at', { ascending: false });

      setBookings(bookingData || []);
      setProducts(productData || []);
      setProfile(profileData);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div className="container" style={{paddingTop: '80px', textAlign: 'center'}}>טוען נתונים... (Loading...)</div>;
  }

  const pendingCount = bookings.filter(b => b.status === 'pending_chef_approval').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  // Calculate earnings from confirmed/completed
  const earnings = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + (Number(b.total_price) || 0), 0);

  const upcomingGig = bookings.find(b => b.status === 'confirmed');

  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>שלום, {profile?.full_name || 'שף'} (Hello)</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.2rem' }}>
        ברוך שובך! הנה הסיכום השבועי על הפעילות שלך. (Your weekly overview)
      </p>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        
        <div className="glass" style={{ padding: '24px', borderRadius: '12px', borderBottom: '3px solid var(--accent-gold)' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.95rem' }}>רווחים צפויים (Expected Earnings)</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>₪{earnings}</div>
        </div>
        
        <div className="glass" style={{ padding: '24px', borderRadius: '12px' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.95rem' }}>אירועים מאושרים (Confirmed Events)</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{confirmedCount}</div>
        </div>
        
        <div className="glass" style={{ padding: '24px', borderRadius: '12px' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.95rem' }}>בקשות ממתינות (Pending Requests)</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: pendingCount > 0 ? 'var(--accent-gold)' : 'inherit' }}>{pendingCount}</div>
        </div>

      </div>

      {pendingCount > 0 && (
         <div style={{ marginBottom: '40px' }}>
           <h2 style={{ marginBottom: '24px', color: 'var(--accent-gold)' }}>בקשות הדורשות את אישורך (Needs Action)</h2>
           {bookings.filter(b => b.status === 'pending_chef_approval').map(req => (
             <div key={req.id} className="glass fade-in" style={{ padding: '24px', borderRadius: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div>
                 <strong>תאריך:</strong> {new Date(req.event_date).toLocaleDateString('he-IL')} (סועדים: {req.guest_count})
                 <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>₪{req.total_price} - ממתין לאישור</div>
               </div>
               <div style={{ display: 'flex', gap: '8px' }}>
                 <button className="btn btn-outline" style={{ color: 'var(--error)' }}>דחה (Reject)</button>
                 <button className="btn btn-primary" style={{ background: 'var(--success)' }}>אשר אירוע (Approve)</button>
               </div>
             </div>
           ))}
         </div>
      )}

      {/* Next Upcoming Gig Highlight */}
      <h2 style={{ marginBottom: '24px' }}>האירוע הבא שלך (Your Next Gig)</h2>
      {upcomingGig ? (
        <div className="glass" style={{ padding: '32px', borderRadius: '16px', borderRight: '4px solid var(--success)', marginBottom: '48px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                 <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>אירוע בתאריך {new Date(upcomingGig.event_date).toLocaleDateString('he-IL')}</h3>
                 
                 <div style={{ display: 'flex', gap: '32px', color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.1rem' }}>
                   <div>
                     <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>מספר סועדים</strong>
                     {upcomingGig.guest_count} סועדים
                   </div>
                   <div>
                     <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>רווח צפוי</strong>
                     ₪{upcomingGig.total_price}
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
      ) : (
        <div className="glass" style={{ padding: '32px', borderRadius: '16px', textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '48px' }}>
          אין אירועים קרובים מאושרים. (No upcoming confirmed gigs yet)
        </div>
      )}

      {/* Digital Products / Creator Economy Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>הסדנאות והמדריכים שלך (Your Digital Products)</h2>
        <button className="btn btn-primary" onClick={() => setShowAddProduct(!showAddProduct)}>
          {showAddProduct ? 'סגור (Cancel)' : '+ הוסף סרטון (Add Video Guide)'}
        </button>
      </div>

      {showAddProduct && (
        <div className="glass fade-in" style={{ padding: '32px', borderRadius: '16px', marginBottom: '32px', borderLeft: '4px solid var(--accent-gold)' }}>
          <h3 style={{ marginBottom: '24px' }}>יצירת מוצר דיגיטלי חדש</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <label>
              <span style={{display: 'block', marginBottom: '8px'}}>כותרת המדריך (Title)</span>
              <input type="text" className="input-field" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} placeholder="למשל: סדנת בשרים למתחילים" />
            </label>
            <label>
              <span style={{display: 'block', marginBottom: '8px'}}>קישור לסרטון (Video URL - YouTube/TikTok)</span>
              <input type="text" className="input-field" dir="ltr" value={newProduct.video_url} onChange={e => setNewProduct({...newProduct, video_url: e.target.value})} placeholder="https://..." />
            </label>
          </div>
          
          <label style={{display: 'block', marginBottom: '20px'}}>
             <span style={{display: 'block', marginBottom: '8px'}}>תיאור התוכן (Description)</span>
             <textarea className="input-field" rows="3" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
          </label>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
             <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
               <input type="checkbox" checked={newProduct.is_premium} onChange={e => setNewProduct({...newProduct, is_premium: e.target.checked})} style={{ width: '20px', height: '20px' }} />
               מוצר פרימיום בתשלום? (Is Premium?)
             </label>
             
             {newProduct.is_premium && (
               <label style={{ flexGrow: 1 }}>
                 <span style={{display: 'block', marginBottom: '8px'}}>מחיר למשתמש (Price in ILS)</span>
                 <input type="number" className="input-field" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
               </label>
             )}
          </div>

          <button 
            className="btn btn-primary btn-full" 
            disabled={submittingProduct || !newProduct.title}
            onClick={async () => {
              setSubmittingProduct(true);
              const sessionAuth = await supabase.auth.getSession();
              const { data, error } = await supabase.from('digital_products').insert({
                chef_id: sessionAuth.data.session.user.id,
                title: newProduct.title,
                description: newProduct.description,
                video_url: newProduct.video_url,
                price: newProduct.is_premium ? Number(newProduct.price) : 0,
                is_premium: newProduct.is_premium
              }).select();

              if (!error && data) {
                setProducts([data[0], ...products]);
                setShowAddProduct(false);
                setNewProduct({ title: '', description: '', video_url: '', price: 0, is_premium: false });
              } else {
                alert("Error saving product: " + error?.message);
              }
              setSubmittingProduct(false);
            }}
          >
            {submittingProduct ? "שומר..." : "שמור ופרסם בפרופיל (Publish)"}
          </button>
        </div>
      )}

      {products.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {products.map(product => (
            <div key={product.id} className="glass" style={{ padding: '24px', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{product.title}</h4>
              <div style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.95rem' }}>
                {product.is_premium ? `מוצר פרימיום (₪${product.price})` : 'צפייה בחינם (Free)'}
              </div>
              <p style={{ marginBottom: '16px', fontSize: '0.95rem', height: '60px', overflow: 'hidden' }}>{product.description}</p>
              {product.video_url && (
                <a href={product.video_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)' }}>
                  🎬 צפה בסרטון (View Video)
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="glass" style={{ padding: '32px', textAlign: 'center', borderRadius: '12px', color: 'var(--text-secondary)' }}>
          עדיין לא העלית מדריכים או סדנאות. זה הזמן להתחיל! (No products yet)
        </div>
      )}
    </div>
  );
}
