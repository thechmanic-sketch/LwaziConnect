-- ══════════════════════════════════════════════════════════════════
-- Signup needs to (a) check if a school already exists by name, and
-- (b) create one if the registrant is a Principal/Admin — both before
-- the user has a profile/session, so plain RLS on `schools` blocks
-- both. These SECURITY DEFINER functions expose exactly the two
-- narrow operations signup needs, nothing else about the schools
-- table is opened up to anonymous callers.
-- ══════════════════════════════════════════════════════════════════

create function public.find_school_id_by_name(p_name text) returns uuid
language sql stable security definer set search_path = public as $$
  select id from schools where lower(name) = lower(trim(p_name)) limit 1;
$$;
grant execute on function public.find_school_id_by_name(text) to anon, authenticated;

create function public.register_school(p_name text) returns uuid
language plpgsql security definer set search_path = public as $$
declare
  new_id uuid;
begin
  if trim(p_name) = '' then
    raise exception 'School name is required';
  end if;
  if exists(select 1 from schools where lower(name) = lower(trim(p_name))) then
    raise exception 'A school with this name is already registered';
  end if;
  insert into schools(name) values (trim(p_name)) returning id into new_id;
  return new_id;
end;
$$;
grant execute on function public.register_school(text) to anon, authenticated;
