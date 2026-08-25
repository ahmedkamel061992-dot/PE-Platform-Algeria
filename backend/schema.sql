
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  password_hash text not null,
  role text not null default 'TEACHER' check (role in ('ADMIN','TEACHER')),
  status text not null default 'PENDING_PAYMENT' check (status in ('PENDING_PAYMENT','PENDING_REVIEW','ACTIVE','REJECTED')),
  activated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  amount_dzd integer not null default 1000 check (amount_dzd = 1000),
  receipt_path text not null,
  status text not null default 'PENDING' check (status in ('PENDING','APPROVED','REJECTED')),
  admin_note text,
  reviewed_by uuid references public.users(id),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index if not exists payment_requests_user_idx on public.payment_requests(user_id);
create index if not exists payment_requests_status_idx on public.payment_requests(status);
