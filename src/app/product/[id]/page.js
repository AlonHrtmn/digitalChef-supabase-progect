"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const getEmbedUrl = (url) => {
  if (!url) return '';
  if (url.includes('youtube.com/watch?v=')) {
    return url.replace('watch?v=', 'embed/');
  }
  if (url.includes('youtu.be/')) {
    return url.replace('youtu.be/', 'youtube.com/embed/');
  }
  return url;
};

export default function ProductView() {
  const params = useParams();
  const router = useRouter();
  
  const [product, setProduct] = useState(null);
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      // 1. Fetch Product
      const { data: prodData, error: prodErr } = await supabase
        .from('digital_products')
        .select('*')
        .eq('id', params.id)
        .single();
        
      if (prodErr || !prodData) {
        router.push('/');
        return;
      }
      setProduct(prodData);

      // 2. Fetch Chef who created it
      const { data: chefData } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .eq('id', prodData.chef_id)
        .single();
      
      setChef(chefData);

      // 3. Check access rights
      // If it's free, everyone has access
      if (!prodData.is_premium) {
         setHasAccess(true);
      } else {
         // It's premium. Check if the user is the creator
         const sessionAuth = await supabase.auth.getSession();
         if (sessionAuth.data.session?.user.id === prodData.chef_id) {
           setHasAccess(true); // Creator can always watch own product
         }
         // TODO: In Phase 3, we would verify if the user purchased it in a 'purchases' table
      }

      setLoading(false);
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, router]);

  if (loading) return <main className="container" style={{ paddingTop: '80px', textAlign: 'center' }}>טוען מוצר... (Loading...)</main>;

  return (
    <main className="container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '900px' }}>
      <nav style={{ marginBottom: '32px' }}>
        <Link href={`/chef/${chef?.id}`} style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center' }}>
          ← חזרה לפרופיל השף (Back to Chef Profile)
        </Link>
      </nav>

      <div className="glass" style={{ padding: '40px', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{product.title}</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              מאת: <Link href={`/chef/${chef?.id}`} style={{color: 'var(--accent-gold)'}}>{chef?.full_name}</Link>
            </p>
          </div>
          {product.is_premium && (
            <span style={{ background: 'rgba(212, 175, 55, 0.2)', color: 'var(--accent-gold)', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold' }}>
              מוצר פרימיום (Premium)
            </span>
          )}
        </div>

        {hasAccess ? (
          <div style={{ background: '#000', borderRadius: '12px', overflow: 'hidden', marginBottom: '32px', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {product.video_url ? (
               // Simple iframe fallback for MVP (handles youtube/vimeo/etc if formatted right, or native HTML video)
               product.video_url.includes('mp4') ? (
                 <video src={product.video_url} controls style={{ width: '100%', height: '100%' }} />
               ) : (
                 <iframe 
                   src={getEmbedUrl(product.video_url)} 
                   style={{ width: '100%', height: '100%', border: 'none' }}
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen
                 />
               )
            ) : (
               <div style={{ color: 'white', textAlign: 'center' }}>
                 🎬 <br/>סרטון אינו זמין (No video content directly linked)
               </div>
            )}
          </div>
        ) : (
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '64px 32px', textAlign: 'center', marginBottom: '32px', border: '2px dashed var(--accent-gold)' }}>
             <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--accent-gold)' }}>נעל את התוכן המלא (Unlock Content)</h2>
             <p style={{ fontSize: '1.2rem', marginBottom: '32px', color: 'var(--text-secondary)' }}>
               סרטון זה הינו סרטון פרימיום. עליך לרכוש גישה על מנת לצפות בהדרכה זו.
             </p>
             <button className="btn btn-primary" style={{ padding: '16px 48px', fontSize: '1.2rem' }} onClick={() => alert("Stripe payment initiated!")}>
               רכוש עכשיו ב-₪{product.price} (Purchase Now)
             </button>
          </div>
        )}

        <div>
           <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>אודות מדריך זה (About this guide)</h3>
           <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
             {product.description || "אין תיאור זמין (No description provided)"}
           </p>
        </div>
      </div>
    </main>
  );
}
