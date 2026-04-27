import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

// Manually parse .env.local since dotenv defaults to .env
const envContent = fs.readFileSync('.env.local', 'utf-8');
const envVars = dotenv.parse(envContent);

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const mockChefs = [
  {
    email: 'mario.test@chef.digital',
    password: 'password123',
    full_name: 'שף מאריו (Chef Mario)',
    bio: 'מומחה למטבח האיטלקי, מביא את הטעמים של טוסקנה אליך הביתה.',
    hourly_rate: 350,
    avatar_url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400',
    is_verified: true
  },
  {
    email: 'sarah.test@chef.digital',
    password: 'password123',
    full_name: 'שרה כהן (Sarah Cohen)',
    bio: 'פיוז׳ן אסייתי וישראלי מודרני ממרכיבים מקומיים ועונתיים.',
    hourly_rate: 280,
    avatar_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400',
    is_verified: true
  },
  {
    email: 'kobi.test@chef.digital',
    password: 'password123',
    full_name: 'קובי אלון (Kobi Alon)',
    bio: 'מתמחה בבשרים ועישון, חווית בשר קרניבורית בלתי נשכחת לכל אירוע.',
    hourly_rate: 450,
    avatar_url: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=400',
    is_verified: false
  }
];

async function seed() {
  console.log("Starting seed process...");
  for (const chef of mockChefs) {
    console.log(`Creating user: ${chef.email}`);
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: chef.email,
      password: chef.password
    });

    if (authError) {
      console.error(`❌ Error creating auth user for ${chef.email}:`, authError.message);
      continue;
    }

    const userId = authData.user?.id;
    if (!userId) {
      console.error(`❌ No user ID returned for ${chef.email} (Email confirmation might be required).`);
      continue;
    }

    // Try to insert profile
    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      role: 'chef',
      full_name: chef.full_name,
      bio: chef.bio,
      hourly_rate: chef.hourly_rate,
      avatar_url: chef.avatar_url,
      is_verified: chef.is_verified
    });

    if (profileError) {
      console.error(`❌ Error creating profile for ${chef.email}:`, profileError.message);
    } else {
      console.log(`✅ Successfully seeded: ${chef.full_name}`);
    }
  }
  console.log("Seeding complete.");
}

seed();
