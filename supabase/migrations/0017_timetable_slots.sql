create table timetable_slots (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  class_id uuid not null references classes(id) on delete cascade,
  day text not null,
  period text not null,
  subject text,
  teacher_id uuid references profiles(id),
  created_at timestamptz not null default now(),
  unique(class_id, day, period)
);
create index timetable_slots_school_idx on timetable_slots(school_id);
create index timetable_slots_class_idx on timetable_slots(class_id);

alter table timetable_slots enable row level security;

create policy timetable_slots_select on timetable_slots for select
  using (
    private.my_role() = 'superadmin'
    or school_id = private.current_school_id()
  );

create policy timetable_slots_manage on timetable_slots for all
  using (private.is_school_staff() and school_id = private.current_school_id())
  with check (private.is_school_staff() and school_id = private.current_school_id());
