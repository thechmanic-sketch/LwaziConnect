create table marks (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  class_id uuid references classes(id),
  subject text not null,
  term text not null,
  mark numeric(5,2) not null,
  out_of numeric(5,2) not null default 100,
  teacher_id uuid references profiles(id),
  created_at timestamptz not null default now(),
  unique(student_id, subject, term)
);
create index marks_school_idx on marks(school_id);
create index marks_student_idx on marks(student_id);

alter table marks enable row level security;

-- staff see all in school; teacher sees marks for classes they teach;
-- parent sees their child's; student sees their own
create policy marks_select on marks for select
  using (
    private.my_role() = 'superadmin'
    or (
      school_id = private.current_school_id()
      and (
        private.is_school_staff()
        or (private.my_role() = 'teacher' and class_id is not null and private.teaches_class(class_id))
        or (private.my_role() = 'parent' and private.is_parent_of(student_id))
        or (private.my_role() = 'student' and exists(select 1 from students st where st.id = student_id and st.profile_id = auth.uid()))
      )
    )
  );

create policy marks_manage on marks for all
  using (
    school_id = private.current_school_id()
    and (private.is_school_staff() or (private.my_role() = 'teacher' and class_id is not null and private.teaches_class(class_id)))
  )
  with check (
    school_id = private.current_school_id()
    and (private.is_school_staff() or (private.my_role() = 'teacher' and class_id is not null and private.teaches_class(class_id)))
  );
