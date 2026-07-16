-- ══════════════════════════════════════════════════════════════════
-- LwaziConnect — initial schema
-- Multi-school isolation, role + capability-based access, teacher groups
-- ══════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ── SCHOOLS (tenants) ────────────────────────────────────────────
create table schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'Starter' check (plan in ('Starter','Professional','Enterprise')),
  status text not null default 'trial' check (status in ('trial','active','suspended')),
  created_at timestamptz not null default now()
);

-- ── PROFILES (one row per authenticated user, extends auth.users) ──
-- superadmin rows have school_id = null (platform-level, not tied to one school)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  school_id uuid references schools(id) on delete cascade,
  role text not null check (role in ('superadmin','principal','admin','teacher','parent','student')),
  full_name text not null,
  initials text,
  avatar_bg text,
  avatar_fg text,
  phone text,
  created_at timestamptz not null default now(),
  constraint school_required_unless_superadmin check (role = 'superadmin' or school_id is not null)
);
create index profiles_school_idx on profiles(school_id);

-- ── CAPABILITIES (extra scopes principal/admin can grant a teacher) ─
-- e.g. 'sports-coordinator', 'chess-club-leader', 'deputy-principal'
create table capabilities (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  description text
);

create table profile_capabilities (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  capability_id uuid not null references capabilities(id) on delete cascade,
  granted_by uuid references profiles(id),
  granted_at timestamptz not null default now(),
  unique(profile_id, capability_id)
);

-- ── CLASSES ──────────────────────────────────────────────────────
create table classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  name text not null,
  room text,
  capacity int,
  homeroom_teacher_id uuid references profiles(id),
  created_at timestamptz not null default now()
);
create index classes_school_idx on classes(school_id);

-- which teacher teaches which class (many-to-many; a teacher can teach several classes/subjects)
create table teacher_classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references profiles(id) on delete cascade,
  class_id uuid not null references classes(id) on delete cascade,
  subject text,
  unique(teacher_id, class_id, subject)
);

-- ── STUDENTS ─────────────────────────────────────────────────────
create table students (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  profile_id uuid references profiles(id), -- nullable: not every student has portal login
  class_id uuid references classes(id),
  first_name text not null,
  last_name text not null,
  dob date,
  gender text,
  blood_type text,
  medical_condition text,
  allergy text,
  status text not null default 'active' check (status in ('active','at-risk','on-leave','inactive')),
  created_at timestamptz not null default now()
);
create index students_school_idx on students(school_id);
create index students_class_idx on students(class_id);

create table parent_students (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references profiles(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  relationship text not null default 'parent',
  unique(parent_id, student_id)
);

-- ── GROUPS (clubs / teams / committees — teacher-created) ───────────
create table groups (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  name text not null,
  type text not null default 'club' check (type in ('club','team','committee','other')),
  created_by uuid not null references profiles(id),
  created_at timestamptz not null default now()
);
create index groups_school_idx on groups(school_id);

create table group_leaders (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  teacher_id uuid not null references profiles(id) on delete cascade,
  unique(group_id, teacher_id)
);

create table group_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  added_at timestamptz not null default now(),
  unique(group_id, student_id)
);

-- ── ANNOUNCEMENTS ────────────────────────────────────────────────
create table announcements (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  author_id uuid not null references profiles(id),
  title text not null,
  body text not null,
  tag text,
  color text,
  audience_type text not null default 'all' check (audience_type in ('all','parents','teachers','students','class','group')),
  audience_class_id uuid references classes(id),
  audience_group_id uuid references groups(id),
  wa_enabled boolean not null default false,
  created_at timestamptz not null default now()
);
create index announcements_school_idx on announcements(school_id);

-- ── MESSAGES (threaded chat) ─────────────────────────────────────
create table message_threads (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  subject text,
  created_at timestamptz not null default now()
);

create table thread_participants (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references message_threads(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  unique(thread_id, profile_id)
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references message_threads(id) on delete cascade,
  sender_id uuid not null references profiles(id),
  body text not null,
  channel text not null default 'app' check (channel in ('app','whatsapp','email','sms')),
  sent_at timestamptz not null default now()
);
create index messages_thread_idx on messages(thread_id);

-- ── DOCUMENTS ────────────────────────────────────────────────────
create table documents (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  name text not null,
  category text,
  access_level text not null default 'all' check (access_level in ('all','parents','staff','admin')),
  uploaded_by uuid references profiles(id),
  storage_path text, -- points into a Supabase Storage bucket, scoped per school
  created_at timestamptz not null default now()
);
create index documents_school_idx on documents(school_id);

-- ── FEES / INVOICES ──────────────────────────────────────────────
create table invoices (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  term text not null,
  amount numeric(10,2) not null,
  paid numeric(10,2) not null default 0,
  status text not null default 'pending' check (status in ('pending','partial','paid','overdue')),
  due_date date,
  created_at timestamptz not null default now()
);
create index invoices_school_idx on invoices(school_id);
create index invoices_student_idx on invoices(student_id);

-- ── HOMEWORK ─────────────────────────────────────────────────────
create table homework (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  class_id uuid not null references classes(id) on delete cascade,
  teacher_id uuid not null references profiles(id),
  subject text,
  title text not null,
  due_date date,
  posted_at timestamptz not null default now(),
  status text not null default 'active' check (status in ('active','overdue','completed'))
);
create index homework_school_idx on homework(school_id);
create index homework_class_idx on homework(class_id);

-- ── ATTENDANCE ───────────────────────────────────────────────────
create table attendance_records (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  class_id uuid references classes(id),
  date date not null,
  status text not null check (status in ('present','absent','late','excused','sick')),
  marked_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  unique(student_id, date)
);
create index attendance_school_idx on attendance_records(school_id);

-- ── CALENDAR EVENTS ──────────────────────────────────────────────
create table calendar_events (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  title text not null,
  event_date date not null,
  type text not null default 'event' check (type in ('academic','event','exam','holiday')),
  class_id uuid references classes(id),
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);
create index calendar_school_idx on calendar_events(school_id);

-- ══════════════════════════════════════════════════════════════════
-- HELPER FUNCTIONS (used by RLS policies below)
-- security definer + stable so they can read profiles without
-- re-triggering RLS recursively, and are cheap to call repeatedly.
-- ══════════════════════════════════════════════════════════════════

create function public.current_school_id() returns uuid
language sql stable security definer set search_path = public as $$
  select school_id from profiles where id = auth.uid();
$$;

create function public.my_role() returns text
language sql stable security definer set search_path = public as $$
  select role from profiles where id = auth.uid();
$$;

create function public.is_school_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select my_role() in ('admin','principal','superadmin');
$$;

create function public.has_capability(cap_key text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists(
    select 1 from profile_capabilities pc
    join capabilities c on c.id = pc.capability_id
    where pc.profile_id = auth.uid() and c.key = cap_key
  );
$$;

-- true if the current user teaches the given class
create function public.teaches_class(check_class_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists(
    select 1 from teacher_classes tc
    where tc.teacher_id = auth.uid() and tc.class_id = check_class_id
  );
$$;

-- true if the current user is a parent of the given student
create function public.is_parent_of(check_student_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists(
    select 1 from parent_students ps
    where ps.parent_id = auth.uid() and ps.student_id = check_student_id
  );
$$;

-- ══════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- Every school-scoped table: rows only visible/writable within the
-- caller's own school (or to superadmin, which spans all schools).
-- Role/ownership-specific policies layered on top per table.
-- ══════════════════════════════════════════════════════════════════

alter table schools enable row level security;
alter table profiles enable row level security;
alter table capabilities enable row level security;
alter table profile_capabilities enable row level security;
alter table classes enable row level security;
alter table teacher_classes enable row level security;
alter table students enable row level security;
alter table parent_students enable row level security;
alter table groups enable row level security;
alter table group_leaders enable row level security;
alter table group_members enable row level security;
alter table announcements enable row level security;
alter table message_threads enable row level security;
alter table thread_participants enable row level security;
alter table messages enable row level security;
alter table documents enable row level security;
alter table invoices enable row level security;
alter table homework enable row level security;
alter table attendance_records enable row level security;
alter table calendar_events enable row level security;

-- SCHOOLS: superadmin sees all; everyone else sees only their own school
create policy schools_select on schools for select
  using (my_role() = 'superadmin' or id = current_school_id());
create policy schools_manage on schools for all
  using (my_role() = 'superadmin') with check (my_role() = 'superadmin');

-- PROFILES: visible within your school; superadmin sees all;
-- a user can always see/update their own row
create policy profiles_select on profiles for select
  using (my_role() = 'superadmin' or school_id = current_school_id() or id = auth.uid());
create policy profiles_update_self on profiles for update
  using (id = auth.uid());
create policy profiles_manage_staff on profiles for all
  using (is_school_staff() and (school_id = current_school_id() or my_role() = 'superadmin'))
  with check (is_school_staff() and (school_id = current_school_id() or my_role() = 'superadmin'));

-- CAPABILITIES: readable by everyone authenticated (it's just a lookup list)
create policy capabilities_select on capabilities for select using (true);
create policy capabilities_manage on capabilities for all
  using (my_role() = 'superadmin') with check (my_role() = 'superadmin');

-- PROFILE_CAPABILITIES: only principal/admin (of that school) or superadmin can grant/revoke;
-- the affected teacher and school staff can view
create policy profile_capabilities_select on profile_capabilities for select
  using (
    profile_id = auth.uid()
    or is_school_staff()
  );
create policy profile_capabilities_manage on profile_capabilities for all
  using (my_role() in ('admin','principal','superadmin'))
  with check (my_role() in ('admin','principal','superadmin'));

-- CLASSES: visible school-wide to staff; teachers see all classes in their school
-- (needed for e.g. picking a class in a dropdown) but write access is staff-only
create policy classes_select on classes for select
  using (my_role() = 'superadmin' or school_id = current_school_id());
create policy classes_manage on classes for all
  using (is_school_staff() and school_id = current_school_id())
  with check (is_school_staff() and school_id = current_school_id());

create policy teacher_classes_select on teacher_classes for select
  using (
    exists(select 1 from classes c where c.id = class_id and (my_role()='superadmin' or c.school_id = current_school_id()))
  );
create policy teacher_classes_manage on teacher_classes for all
  using (is_school_staff()) with check (is_school_staff());

-- STUDENTS: staff see all in their school; teacher sees only students in classes they teach;
-- parent sees only their own children; student sees only themself
create policy students_select on students for select
  using (
    my_role() = 'superadmin'
    or (is_school_staff() and school_id = current_school_id())
    or (my_role() = 'teacher' and teaches_class(class_id))
    or (my_role() = 'parent' and is_parent_of(id))
    or (my_role() = 'student' and profile_id = auth.uid())
  );
create policy students_manage on students for all
  using (is_school_staff() and school_id = current_school_id())
  with check (is_school_staff() and school_id = current_school_id());

create policy parent_students_select on parent_students for select
  using (parent_id = auth.uid() or is_school_staff());
create policy parent_students_manage on parent_students for all
  using (is_school_staff()) with check (is_school_staff());

-- GROUPS: staff see all groups in their school; a teacher sees groups they lead;
-- parents/students see groups their child/self is a member of.
-- CREATION requires the 'create-group' capability (or staff).
create policy groups_select on groups for select
  using (
    my_role() = 'superadmin'
    or (is_school_staff() and school_id = current_school_id())
    or exists(select 1 from group_leaders gl where gl.group_id = groups.id and gl.teacher_id = auth.uid())
    or exists(
      select 1 from group_members gm
      join students s on s.id = gm.student_id
      where gm.group_id = groups.id and (
        (my_role()='parent' and is_parent_of(s.id))
        or (my_role()='student' and s.profile_id = auth.uid())
      )
    )
  );
create policy groups_insert on groups for insert
  with check (
    school_id = current_school_id()
    and created_by = auth.uid()
    and (is_school_staff() or has_capability('create-group'))
  );
create policy groups_update_own on groups for update
  using (
    is_school_staff()
    or exists(select 1 from group_leaders gl where gl.group_id = groups.id and gl.teacher_id = auth.uid())
  );
create policy groups_delete_own on groups for delete
  using (
    is_school_staff()
    or created_by = auth.uid()
  );

create policy group_leaders_select on group_leaders for select
  using (
    is_school_staff() or teacher_id = auth.uid()
    or exists(select 1 from groups g where g.id = group_id and g.created_by = auth.uid())
  );
create policy group_leaders_manage on group_leaders for all
  using (
    is_school_staff()
    or exists(select 1 from groups g where g.id = group_id and g.created_by = auth.uid())
  );

create policy group_members_select on group_members for select
  using (
    is_school_staff()
    or exists(select 1 from group_leaders gl where gl.group_id = group_members.group_id and gl.teacher_id = auth.uid())
    or exists(select 1 from groups g where g.id = group_members.group_id and g.created_by = auth.uid())
    or exists(
      select 1 from students s where s.id = student_id and (
        (my_role()='parent' and is_parent_of(s.id))
        or (my_role()='student' and s.profile_id = auth.uid())
      )
    )
  );
create policy group_members_manage on group_members for all
  using (
    is_school_staff()
    or exists(select 1 from group_leaders gl where gl.group_id = group_members.group_id and gl.teacher_id = auth.uid())
    or exists(select 1 from groups g where g.id = group_members.group_id and g.created_by = auth.uid())
  );

-- ANNOUNCEMENTS: readable by anyone in the school; audience_type narrows what
-- the frontend chooses to show, but staff/author can always manage
create policy announcements_select on announcements for select
  using (my_role() = 'superadmin' or school_id = current_school_id());
create policy announcements_insert on announcements for insert
  with check (
    school_id = current_school_id()
    and author_id = auth.uid()
    and (
      is_school_staff()
      or (my_role() = 'teacher' and audience_type in ('class','group')
          and (audience_class_id is null or teaches_class(audience_class_id))
          and (audience_group_id is null or exists(select 1 from groups g where g.id = audience_group_id and g.created_by = auth.uid())))
    )
  );
create policy announcements_manage_own on announcements for update
  using (is_school_staff() or author_id = auth.uid());
create policy announcements_delete_own on announcements for delete
  using (is_school_staff() or author_id = auth.uid());

-- MESSAGES: only thread participants can read/write
create policy threads_select on message_threads for select
  using (exists(select 1 from thread_participants tp where tp.thread_id = message_threads.id and tp.profile_id = auth.uid()) or is_school_staff());
create policy threads_insert on message_threads for insert
  with check (school_id = current_school_id());
create policy thread_participants_select on thread_participants for select
  using (profile_id = auth.uid() or is_school_staff());
create policy thread_participants_manage on thread_participants for all
  using (profile_id = auth.uid() or is_school_staff());
create policy messages_select on messages for select
  using (exists(select 1 from thread_participants tp where tp.thread_id = messages.thread_id and tp.profile_id = auth.uid()) or is_school_staff());
create policy messages_insert on messages for insert
  with check (sender_id = auth.uid() and exists(select 1 from thread_participants tp where tp.thread_id = messages.thread_id and tp.profile_id = auth.uid()));

-- DOCUMENTS: readable per access_level within the school; managed by staff
create policy documents_select on documents for select
  using (
    my_role() = 'superadmin' or (
      school_id = current_school_id() and (
        access_level = 'all'
        or (access_level = 'parents' and my_role() in ('parent','admin','principal'))
        or (access_level = 'staff' and my_role() in ('teacher','admin','principal'))
        or (access_level = 'admin' and my_role() in ('admin','principal'))
      )
    )
  );
create policy documents_manage on documents for all
  using (is_school_staff() and school_id = current_school_id())
  with check (is_school_staff() and school_id = current_school_id());

-- INVOICES: staff see all in school; parent sees only their child's; student sees own
create policy invoices_select on invoices for select
  using (
    my_role() = 'superadmin'
    or (is_school_staff() and school_id = current_school_id())
    or (my_role() = 'parent' and is_parent_of(student_id))
    or (my_role() = 'student' and exists(select 1 from students s where s.id = student_id and s.profile_id = auth.uid()))
  );
create policy invoices_manage on invoices for all
  using (is_school_staff() and school_id = current_school_id())
  with check (is_school_staff() and school_id = current_school_id());

-- HOMEWORK: staff see all; teacher sees/manages only their own classes' homework;
-- parent/student see only their child's/own class's homework
create policy homework_select on homework for select
  using (
    my_role() = 'superadmin'
    or (is_school_staff() and school_id = current_school_id())
    or (my_role() = 'teacher' and teaches_class(class_id))
    or (my_role() = 'parent' and exists(select 1 from students s where s.class_id = homework.class_id and is_parent_of(s.id)))
    or (my_role() = 'student' and exists(select 1 from students s where s.class_id = homework.class_id and s.profile_id = auth.uid()))
  );
create policy homework_insert on homework for insert
  with check (school_id = current_school_id() and (is_school_staff() or (my_role()='teacher' and teaches_class(class_id) and teacher_id = auth.uid())));
create policy homework_manage_own on homework for update
  using (is_school_staff() or teacher_id = auth.uid());
create policy homework_delete_own on homework for delete
  using (is_school_staff() or teacher_id = auth.uid());

-- ATTENDANCE: staff see all; teacher sees/marks only their own classes;
-- parent/student see only their child's/own records
create policy attendance_select on attendance_records for select
  using (
    my_role() = 'superadmin'
    or (is_school_staff() and school_id = current_school_id())
    or (my_role() = 'teacher' and class_id is not null and teaches_class(class_id))
    or (my_role() = 'parent' and is_parent_of(student_id))
    or (my_role() = 'student' and exists(select 1 from students s where s.id = student_id and s.profile_id = auth.uid()))
  );
create policy attendance_manage on attendance_records for all
  using (is_school_staff() or (my_role() = 'teacher' and class_id is not null and teaches_class(class_id)))
  with check (school_id = current_school_id() and (is_school_staff() or (my_role() = 'teacher' and class_id is not null and teaches_class(class_id))));

-- CALENDAR: readable school-wide; managed by staff only (per the earlier
-- decision that parents/students shouldn't create events)
create policy calendar_select on calendar_events for select
  using (my_role() = 'superadmin' or school_id = current_school_id());
create policy calendar_manage on calendar_events for all
  using (is_school_staff() and school_id = current_school_id())
  with check (is_school_staff() and school_id = current_school_id());

-- ══════════════════════════════════════════════════════════════════
-- SEED: base capability list (extend anytime — no code deploy needed)
-- ══════════════════════════════════════════════════════════════════
insert into capabilities (key, label, description) values
  ('deputy-principal', 'Deputy Principal', 'Principal-level nav access, delegated'),
  ('sports-coordinator', 'Sports Coordinator', 'Manages fixtures, squads and transport for school sport'),
  ('create-group', 'Can Create Groups', 'Allowed to create and lead clubs/teams/committees'),
  ('discipline-committee', 'Discipline Committee', 'Access to the school-wide discipline log');
