create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 100),
  tickets integer not null check (tickets between 1 and 10),
  stand text not null check (stand in ('General Stand', 'VIP Stand')),
  venue text not null check (venue in ('Wankhede Stadium', 'M. Chinnaswamy Stadium')),
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

grant select, insert on public.bookings to anon, authenticated;

drop policy if exists "Anyone can view bookings" on public.bookings;
create policy "Anyone can view bookings"
  on public.bookings for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can create bookings" on public.bookings;
create policy "Anyone can create bookings"
  on public.bookings for insert
  to anon, authenticated
  with check (true);