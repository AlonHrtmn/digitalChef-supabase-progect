"use client";

import { useState, use } from "react";
import Link from "next/link";
import { chefs } from "@/lib/mockData";

export default function BookingFlow({ params }) {
  const resolvedParams = use(params);
  const [step, setStep] = useState(1);
  const chef = chefs.find((c) => c.id === resolvedParams.id);
  
  if (!chef) return <div style={{textAlign: "center", padding: "40px"}}>Chef not found</div>;

  return (
    <main className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '800px' }}>
      <nav style={{ marginBottom: '32px' }}>
        <Link href={`/chef/${chef.id}`} style={{ color: 'var(--text-secondary)' }}>
          ← חזרה לפרופיל השף (Back to Profile)
        </Link>
      </nav>

      <div className="glass" style={{ padding: '40px', borderRadius: '16px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>הזמנה: {chef.name}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.2rem' }}>
          שלב {step} מתוך 3
        </p>

        {step === 1 && (
          <div className="flow-step fade-in">
            <h2 style={{ marginBottom: '24px', color: 'var(--accent-gold)' }}>מתי ואיפה? (Date & Time)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <label>
                 <span style={{display: "block", marginBottom: "8px"}}>תאריך האירוע (Date)</span>
                 <input type="date" className="input-field" />
              </label>
              <label>
                 <span style={{display: "block", marginBottom: "8px"}}>שעה (Time)</span>
                 <input type="time" className="input-field" />
              </label>
              <label>
                 <span style={{display: "block", marginBottom: "8px"}}>מיקום האירוע (Location/Address)</span>
                 <input type="text" placeholder="הכנס כתובת לתמחור נסיעות..." className="input-field" />
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
                 <input type="number" placeholder="2-20" min="2" max="20" className="input-field" />
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
                <span>{chef.name}</span>
                <span>{chef.priceRange} לאדם</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                <span>עלות עבור 4 סועדים (Cost for 4)</span>
                <span>₪2,000</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: 'var(--text-secondary)' }}>
                <span>עמלת שירות (Service Fee)</span>
                <span>₪150</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '24px', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--accent-gold)' }}>
                <span>סה"כ לתשלום עכשיו (Total Due Now)</span>
                <span>₪2,150</span>
              </div>

            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
               <button className="btn btn-outline" onClick={() => setStep(2)}>חזור (Back)</button>
               {/* In a real app, this wraps a Stripe Element. For now, it's just a button. */}
               <button className="btn btn-primary" onClick={() => alert("✅ Stripe Checkout Flow Initiated!")}>תשלום מאובטח ב-Stripe (Secure Checkout)</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
