create table discipline_records (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  type text not null,
  description text,
  incident_date date not null default current_date,
  reported_by uuid references profiles(id),
  action_taken text,
  status text not null default 'open' check (status in ('open','pending','resolved')),
  created_at timestamptz not null default now()
);
create index discipline_school_idx on discipline_records(school_id);

create table health_records (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  medical_aid text,
  emergency_contact text,
  doctor text,
  created_at timestamptz not null default now(),
  unique(student_id)
);
create index health_school_idx on health_records(school_id);

create table staff (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  profile_id uuid references profiles(id),
  full_name text not null,
  role_title text,
  department text,
  contract_type text,
  start_date date,
  leave_balance int default 0,
  qualifications text,
  status text not null default 'active' check (status in ('active','on-leave','inactive')),
  created_at timestamptz not null default now()
);
create index staff_school_idx on staff(school_id);

create table sgb_members (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  name text not null,
  role_title text,
  category text,
  term text,
  phone text,
  created_at timestamptz not null default now()
);
create index sgb_members_school_idx on sgb_members(school_id);

create table sgb_meetings (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  meeting_date date not null,
  title text not null,
  attendance text,
  status text not null default 'scheduled' check (status in ('scheduled','minutes-ready')),
  resolutions_count int default 0,
  created_at timestamptz not null default now()
);
create index sgb_meetings_school_idx on sgb_meetings(school_id);

create table vehicles (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  registration text not null,
  driver_name text,
  capacity int,
  route text,
  status text not null default 'active' check (status in ('active','maintenance')),
  last_service date,
  created_at timestamptz not null default now()
);
create index vehicles_school_idx on vehicles(school_id);

create table admissions (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  applicant_name text not null,
  grade_applying text,
  dob date,
  parent_name text,
  phone text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  submitted_at timestamptz not null default now()
);
create index admissions_school_idx on admissions(school_id);

create table campuses (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  name text not null,
  principal_name text,
  type text,
  status text not null default 'active' check (status in ('active','inactive')),
  created_at timestamptz not null default now()
);
create index campuses_school_idx on campuses(school_id);

create table audit_log (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  actor_id uuid references profiles(id),
  action text not null,
  ip_address text,
  created_at timestamptz not null default now()
);
create index audit_log_school_idx on audit_log(school_id);

alter table discipline_records enable row level security;
alter table health_records enable row level security;
alter table staff enable row level security;
alter table sgb_members enable row level security;
alter table sgb_meetings enable row level security;
alter table vehicles enable row level security;
alter table admissions enable row level security;
alter table campuses enable row level security;
alter table audit_log enable row level security;

create policy discipline_staff_only on discipline_records for all
  using (private.is_school_staff() and school_id = private.current_school_id())
  with check (private.is_school_staff() and school_id = private.current_school_id());

create policy health_staff_only on health_records for all
  using (private.is_school_staff() and school_id = private.current_school_id())
  with check (private.is_school_staff() and school_id = private.current_school_id());

create policy staff_staff_only on staff for all
  using (private.is_school_staff() and school_id = private.current_school_id())
  with check (private.is_school_staff() and school_id = private.current_school_id());

create policy sgb_members_staff_only on sgb_members for all
  using (private.is_school_staff() and school_id = private.current_school_id())
  with check (private.is_school_staff() and school_id = private.current_school_id());

create policy sgb_meetings_staff_only on sgb_meetings for all
  using (private.is_school_staff() and school_id = private.current_school_id())
  with check (private.is_school_staff() and school_id = private.current_school_id());

create policy vehicles_staff_only on vehicles for all
  using (private.is_school_staff() and school_id = private.current_school_id())
  with check (private.is_school_staff() and school_id = private.current_school_id());

create policy admissions_staff_only on admissions for all
  using (private.is_school_staff() and school_id = private.current_school_id())
  with check (private.is_school_staff() and school_id = private.current_school_id());

create policy campuses_staff_only on campuses for all
  using (private.is_school_staff() and school_id = private.current_school_id())
  with check (private.is_school_staff() and school_id = private.current_school_id());

create policy audit_log_staff_only on audit_log for all
  using (private.is_school_staff() and school_id = private.current_school_id())
  with check (private.is_school_staff() and school_id = private.current_school_id());
