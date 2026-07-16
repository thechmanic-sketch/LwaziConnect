alter table health_records
  add column if not exists medical_condition text,
  add column if not exists allergy text,
  add column if not exists blood_type text;
