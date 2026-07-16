-- 0006 mistakenly redefined public.handle_new_user(), but 0005 had
-- already moved the real function (the one the trigger actually
-- calls) to private.handle_new_user(). That's why dashboard-created
-- users kept failing with the same check-constraint error — this
-- fixes the function that's actually wired to the trigger.
create or replace function private.handle_new_user() returns trigger
language plpgsql security definer set search_path = private, public as $$
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

-- drop the harmless decoy 0006 created in public (nothing calls it,
-- but keep the schema clean)
drop function if exists public.handle_new_user();
