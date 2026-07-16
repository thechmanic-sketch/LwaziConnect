-- Users created outside the app's signup flow (e.g. via the Supabase
-- Dashboard's "Add user" screen, used to bootstrap the first Super
-- Admin) carry no role/school_id metadata. The old default
-- (role='student') would violate school_required_unless_superadmin
-- (students need a school_id) and abort the whole user creation.
-- Now: skip auto-provisioning a profile when no role metadata is
-- present, so the auth user still gets created successfully — the
-- profile can then be inserted manually (e.g. to bootstrap superadmin).
--
-- NOTE: this originally (mistakenly) targeted public.handle_new_user(),
-- but migration 0005 had already moved the real trigger function to
-- private.handle_new_user() — see 0007 for the actual fix.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.raw_user_meta_data->>'role' is null then
    return new;
  end if;
  insert into public.profiles (id, school_id, role, full_name, phone)
  values (
    new.id,
    nullif(new.raw_user_meta_data->>'school_id','')::uuid,
    new.raw_user_meta_data->>'role',
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$;
