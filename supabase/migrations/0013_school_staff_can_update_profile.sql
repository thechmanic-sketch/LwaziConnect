-- Allow school staff (admin/principal) to update their own school's profile
-- fields (name, contact info, logo) — but not status/plan, which stay
-- superadmin-only (billing/suspension controls).
create policy schools_staff_update on schools for update
  using (private.is_school_staff() and id = private.current_school_id())
  with check (private.is_school_staff() and id = private.current_school_id());

create function private.prevent_school_status_plan_change() returns trigger
language plpgsql as $$
begin
  if private.my_role() <> 'superadmin' and (new.status <> old.status or new.plan <> old.plan) then
    raise exception 'Only a super admin can change a school''s status or plan';
  end if;
  return new;
end;
$$;

create trigger schools_guard_status_plan
  before update on schools
  for each row execute function private.prevent_school_status_plan_change();
