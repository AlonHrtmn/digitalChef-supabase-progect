"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [displayChefs, setDisplayChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChefs = async () => {
      const { data: chefs, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "chef");
      
      if (chefs) {
        setDisplayChefs(chefs);
      }
      setLoading(false);
    };

    fetchChefs();
  }, []);

  if (loading) {
    return <main className="container" style={{ paddingTop: '80px', textAlign: 'center' }}>טוען שפים... (Loading...)</main>;
  }

  return (
    <main className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <nav style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
        <Link href="/portal/login" className="btn btn-outline" style={{ marginLeft: '12px' }}>
          התחברות (Login)
        </Link>
        <Link href="/portal/register" className="btn btn-primary">
          הרשמת שף (Register)
        </Link>
      </nav>

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
          {displayChefs.map((chef) => (
            <Link href={`/chef/${chef.id}`} key={chef.id} className="chef-card glass">
              {chef.is_verified && <span className="badge">מאומת (Verified)</span>}
              <img src={chef.avatar_url || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400"} alt={chef.full_name} className="chef-image" />
              
              <div className="chef-card-content">
                <h3 className="card-title">{chef.full_name}</h3>
                <p className="card-subtitle">{chef.bio || "שף מקצועי המציע מגוון חוויות קולינריות."}</p>
                <div className="card-meta">
                  <span className="rating">₪{chef.hourly_rate || "250"} / לשעה</span>
                </div>
              </div>
            </Link>
          ))}

          {displayChefs.length === 0 && (
            <div style={{ color: 'var(--text-secondary)', marginTop: '20px', textAlign: 'center', width: '100%', gridColumn: '1 / -1' }}>
              <p style={{ marginBottom: '16px' }}>
                עדיין אין שפים רשומים במערכת. במידה ואתם שפים, הירשמו עכשיו!
              </p>
              <Link href="/portal/register" className="btn btn-primary">
                פתיחת אזור שף (Open Chef Area)
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
