"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // 1. Sign up the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setErrorMsg(authError.message);
      setLoading(false);
      return;
    }

    if (authData?.user) {
      // 2. Create the Chef profile in the 'profiles' table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          role: 'chef',
          full_name: fullName,
        });

      if (profileError) {
        console.error("Profile creation failed:", profileError);
        // Fallback message, they might need to complete profile later if it fails
        setErrorMsg("Account created, but failed to set up profile details.");
        setLoading(false);
        return;
      }
      
      // Successfully registered and profile created!
      router.push("/portal");
    }
  };

  return (
    <main className="container fade-in" style={{ paddingTop: '80px', paddingBottom: '80px', maxWidth: '500px' }}>
      <div className="glass" style={{ padding: '40px', borderRadius: '16px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px', textAlign: 'center', color: 'var(--accent-gold)' }}>
          הרשמת שף (Chef Registration)
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          הצטרפו לפלטפורמת DigitalChef והתחילו לקבל הזמנות
        </p>

        {errorMsg && (
          <div style={{ padding: '12px', background: 'rgba(255, 77, 79, 0.1)', color: 'var(--error)', borderRadius: '8px', marginBottom: '24px', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} autoComplete="off">
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>שם מלא (Full Name)</label>
            <input 
              type="text" 
              className="input-field" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
              autoComplete="name"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>אימייל (Email)</label>
            <input 
              type="email" 
              className="input-field" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              dir="ltr"
              autoComplete="new-email" // non-standard to force browser override
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
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? "יוצר חשבון..." : "צור חשבון (Sign Up)"}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          כבר יש לכם חשבון?{" "}
          <Link href="/portal/login" style={{ color: 'var(--accent-gold)', fontWeight: '500' }}>
            היכנסו כאן (Login)
          </Link>
        </div>
      </div>
    </main>
  );
}
