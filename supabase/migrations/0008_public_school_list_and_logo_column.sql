-- Public school listing for the signup dropdown — like
-- find_school_id_by_name, this needs to work before the user has a
-- session, so it's a narrow SECURITY DEFINER RPC rather than opening
-- the whole `schools` table to anon reads.
create function public.list_schools() returns table(id uuid, name text)
language sql stable security definer set search_path = public as $$
  select id, name from schools order by name;
$$;
grant execute on function public.list_schools() to anon, authenticated;

-- Column for per-school branding, starting with logo. Colors can be
-- added the same way later.
alter table schools add column logo_url text;
