"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      router.push("/portal");
    }
  };

  return (
    <main className="container fade-in" style={{ paddingTop: '80px', paddingBottom: '80px', maxWidth: '500px' }}>
      <div className="glass" style={{ padding: '40px', borderRadius: '16px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px', textAlign: 'center', color: 'var(--accent-gold)' }}>
          התחברות (Login)
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          היכנסו לאזור האישי שלכם ב-DigitalChef
        </p>

        {errorMsg && (
          <div style={{ padding: '12px', background: 'rgba(255, 77, 79, 0.1)', color: 'var(--error)', borderRadius: '8px', marginBottom: '24px', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>אימייל (Email)</label>
            <input 
              type="email" 
              className="input-field" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              dir="ltr"
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>סיסמה (Password)</label>
            <input 
              type="password" 
              className="input-field" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              dir="ltr"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? "מתחבר..." : "התחבר (Sign In)"}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          אין לכם חשבון שף?{" "}
          <Link href="/portal/register" style={{ color: 'var(--accent-gold)', fontWeight: '500' }}>
            הירשמו כאן (Register)
          </Link>
        </div>
      </div>
    </main>
  );
}
