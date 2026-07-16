-- ══════════════════════════════════════════════════════════════════
-- Auto-create a profiles row whenever a new auth.users row appears.
-- Expects role/school_id/full_name to be passed as user metadata at
-- signup time, e.g.:
--   supabase.auth.signUp({ email, password, options: { data: {
--     role: 'teacher', school_id: '...', full_name: 'Mr. T. Zulu'
--   }}})
-- Registration is role-based (per the existing product decision —
-- "Register as Principal" etc., not school selection), so school_id
-- must already be known at signup (e.g. resolved from an invite link
-- or a school code the user enters).
-- ══════════════════════════════════════════════════════════════════

create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, school_id, role, full_name)
  values (
    new.id,
    nullif(new.raw_user_meta_data->>'school_id','')::uuid,
    coalesce(new.raw_user_meta_data->>'role','student'),
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
