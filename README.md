# IPL Ticket Booking

A small React app for browsing featured IPL fixtures, submitting ticket bookings, and viewing booking history with Supabase.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and enter your Supabase project URL and publishable key.
3. In the Supabase dashboard, open **SQL Editor** and run [`supabase/schema.sql`](supabase/schema.sql).
4. Start the app with `npm run dev`.

The schema enables anonymous inserts and reads so the demo can book tickets and show its history without sign-in. This makes submitted names and booking details visible to anyone with access to the app. Add Supabase Auth and user-scoped row-level security before using real customer data.