-- Track who started a thread so they can add the other participant(s) —
-- the existing thread_participants_manage policy only let staff or a user
-- adding themselves insert a participant row, which made it impossible for
-- a parent/teacher to start a 1:1 conversation with anyone else.
alter table message_threads add column if not exists created_by uuid references profiles(id);

drop policy if exists threads_insert on message_threads;
create policy threads_insert on message_threads for insert
  with check (school_id = private.current_school_id() and created_by = auth.uid());

drop policy if exists thread_participants_manage on thread_participants;
create policy thread_participants_manage on thread_participants for all
  using (
    profile_id = auth.uid()
    or private.is_school_staff()
    or exists(select 1 from message_threads mt where mt.id = thread_participants.thread_id and mt.created_by = auth.uid())
  )
  with check (
    profile_id = auth.uid()
    or private.is_school_staff()
    or exists(select 1 from message_threads mt where mt.id = thread_participants.thread_id and mt.created_by = auth.uid())
  );
