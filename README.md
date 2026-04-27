# 🧑‍🍳 DigitalChef Marketplace Platform

Welcome to **DigitalChef** — a premium, localized platform designed for the Israeli marketplace connecting customers directly with elite private chefs.

This application transitions from a pure gig-booking marketplace into a robust "Creator Economy" platform by allowing chefs to approve live catering events and securely sell digital products (like video recipe guides) via their personalized profiles.

---

## 🚀 Features

- **Dynamic Chef Discovery**: Localized (RTL/Hebrew) gallery of available chefs pulled live from the database.
- **Premium Public Profiles**: Beautifully styled landing pages for each chef displaying their hourly rate, biography, verifications, and digital storefront.
- **Interactive Booking Flow**: A multi-step booking widget allowing customers to choose dates, guest counts, and finalize checkout via Stripe infrastructure.
- **Secure Chef Portal**: A guarded dashboard where authenticated chefs can review/approve gig requests, calculate expected earnings, and manage the upload of new Video Guides.
- **Video Product Playback Room**: Secure digital sub-screens utilizing URL-parsing logic to seamlessly integrate external Video hosts.

---

## 🛠 Tech Stack

- **Framework**: `Next.js 15` (App Router)
- **Database & Authentication**: `Supabase` (PostgreSQL)
- **Styling**: `Vanilla CSS` with custom glassmorphism design tokens mapped in `globals.css`
- **Hosting**: Designed for deployment on `Vercel`

---

## ⚙️ Getting Started (Local Development)

To run this application on an independent machine, follow these simple steps to restore the environment:

### 1. Clone the Repository
```bash
git clone https://github.com/AlonHrtmn/digitalChef-supabase-progect.git
cd digitalChef-supabase-progect
```

### 2. Install Dependencies
Make sure you have Node installed, then run:
```bash
npm install
```

### 3. Setup Supabase (Database & Auth)
The application relies on Supabase for data and authentication.
1. Create a new project at [Supabase.com](https://supabase.com).
2. Go to the **SQL Editor**, and copy + paste the entire contents of the `schema.sql` file provided in the root directory. Click "Run". This automatically builds the tables (`profiles`, `bookings`, `verifications`, `digital_products`) and enforces Row Level Security (RLS) policies.
3. *Crucial for local testing*: Go to **Authentication > Providers > Email** in your Supabase dashboard and **toggle OFF "Confirm email"**. This allows you to rapidly create test chefs without needing real email inboxes.

### 4. Create Environment Variables
Create a file named `.env.local` in the root of the project folder:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url__here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_TELEMETRY_DISABLED=1
```
*(You can find your URL and Anon Key in your Supabase Project Settings -> API).*

### 5. Start the Application
Boot up the development server!
```bash
npx next dev
```
Navigate to `http://localhost:3000`. 
**To fully populate the site:**
- Click **"Open Chef Area"** and register a new Chef.
- Once registered, the Homepage will dynamically populate their Chef Card, and you can test the booking flows from there!
