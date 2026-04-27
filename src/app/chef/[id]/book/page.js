"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function BookingFlow() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const initialDate = searchParams?.get('date') || '';
  const initialGuests = searchParams?.get('guests') || 2;
  const [eventDate, setEventDate] = useState(initialDate);
  const [guests, setGuests] = useState(initialGuests);
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchChef = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', params.id)
        .single();
      
      if (data) {
        setChef(data);
      }
      setLoading(false);
    };
    if (params.id) fetchChef();
  }, [params.id]);

  if (loading) return <div style={{textAlign: "center", padding: "80px"}}>טוען... (Loading...)</div>;
  if (!chef) return <div style={{textAlign: "center", padding: "80px"}}>Chef not found</div>;

  return (
    <main className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '800px' }}>
      <nav style={{ marginBottom: '32px' }}>
        <Link href={`/chef/${chef.id}`} style={{ color: 'var(--text-secondary)' }}>
          ← חזרה לפרופיל השף (Back to Profile)
        </Link>
      </nav>

      <div className="glass" style={{ padding: '40px', borderRadius: '16px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>הזמנה: {chef.full_name}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.2rem' }}>
          שלב {step} מתוך 3
        </p>

        {step === 1 && (
          <div className="flow-step fade-in">
            <h2 style={{ marginBottom: '24px', color: 'var(--accent-gold)' }}>מתי ואיפה? (Date & Time)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <label>
                 <span style={{display: "block", marginBottom: "8px"}}>תאריך האירוע (Date)</span>
                 <input type="date" className="input-field" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
              </label>
              <label>
                 <span style={{display: "block", marginBottom: "8px"}}>שעה (Time)</span>
                 <input type="time" className="input-field" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
              </label>
              <label>
                 <span style={{display: "block", marginBottom: "8px"}}>מיקום האירוע (Location/Address)</span>
                 <input type="text" placeholder="הכנס כתובת לתמחור נסיעות..." className="input-field" value={location} onChange={(e) => setLocation(e.target.value)} />
              </label>
            </div>
            <button className="btn btn-primary" onClick={() => setStep(2)}>המשך (Next Step)</button>
          </div>
        )}

        {step === 2 && (
          <div className="flow-step fade-in">
            <h2 style={{ marginBottom: '24px', color: 'var(--accent-gold)' }}>פרטי האירוע (Event Details)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <label>
                 <span style={{display: "block", marginBottom: "8px"}}>כמות סועדים (Number of Guests)</span>
                 <input type="number" placeholder="2-20" min="2" max="50" className="input-field" value={guests} onChange={(e) => setGuests(parseInt(e.target.value) || 2)} />
              </label>
              <label>
                 <span style={{display: "block", marginBottom: "8px"}}>סגנון אירוע מעודף (Preferred Style)</span>
                 <select className="input-field">
                   <option>ארוחת טעימות (Tasting Menu)</option>
                   <option>בופה פתוח (Open Buffet)</option>
                   <option>שרינג (Sharing/Family Style)</option>
                 </select>
              </label>
              <label>
                 <span style={{display: "block", marginBottom: "8px"}}>אלרגיות ובקשות (Allergies/Requests)</span>
                 <textarea placeholder="ציין כאן אלרגיות, צמחונים וכו'..." className="input-field" rows="4"></textarea>
              </label>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn btn-outline" onClick={() => setStep(1)}>חזור (Back)</button>
              <button className="btn btn-primary" onClick={() => setStep(3)}>המשך לסיכום (Proceed to Summary)</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flow-step fade-in">
            <h2 style={{ marginBottom: '24px', color: 'var(--accent-gold)' }}>סיכום ותשלום (Summary & Payment)</h2>
            <div style={{ background: 'var(--bg-secondary)', padding: '32px', borderRadius: '12px', marginBottom: '40px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.2rem' }}>
                <span>{chef.full_name}</span>
                <span>₪{chef.hourly_rate || 250} לאדם</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                <span>עלות עבור {guests} סועדים (Cost for {guests})</span>
                <span>₪{(chef.hourly_rate || 250) * guests}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: 'var(--text-secondary)' }}>
                <span>עמלת שירות (Service Fee)</span>
                <span>₪150</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '24px', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--accent-gold)' }}>
                <span>סה"כ לתשלום עכשיו (Total Due Now)</span>
                <span>₪{((chef.hourly_rate || 250) * guests) + 150}</span>
              </div>

            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
               <button className="btn btn-outline" onClick={() => setStep(2)} disabled={submitting}>חזור (Back)</button>
               <button 
                 className="btn btn-primary" 
                 disabled={submitting}
                 onClick={async () => {
                   setSubmitting(true);
                   const guestAuth = await supabase.auth.getSession();
                   
                   if (!guestAuth.data.session) {
                      alert("Please login first to make a booking! (Auth constraint)");
                      router.push('/portal/login');
                      return;
                   }

                   // Format date handling manually for MVP
                   const isoDate = new Date(`${eventDate}T${eventTime || '12:00'}:00`).toISOString();

                   const { error } = await supabase.from('bookings').insert({
                      customer_id: guestAuth.data.session.user.id,
                      chef_id: chef.id,
                      event_date: isoDate,
                      guest_count: guests,
                      status: 'pending_chef_approval',
                      total_price: ((chef.hourly_rate || 250) * guests) + 150
                   });

                   if (error) {
                     alert("Booking failed: " + error.message);
                     setSubmitting(false);
                   } else {
                     alert("🎉 Booking highly successful! The chef will get back to you soon!");
                     router.push('/portal'); // Or customer dashboard if we make one
                   }
                 }}
               >
                 {submitting ? "מעבד..." : "תשלום מאובטח ב-Stripe (Secure Checkout)"}
               </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
