alter table schools
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists address text,
  add column if not exists province text,
  add column if not exists school_type text;
