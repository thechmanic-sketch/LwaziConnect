-- Patch handle_new_user to also capture phone from signup metadata
-- (0002 only captured role/school_id/full_name).
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, school_id, role, full_name, phone)
  values (
    new.id,
    nullif(new.raw_user_meta_data->>'school_id','')::uuid,
    coalesce(new.raw_user_meta_data->>'role','student'),
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$;
