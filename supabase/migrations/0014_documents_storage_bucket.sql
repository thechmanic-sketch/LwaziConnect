-- Private storage bucket for the Documents feature. Objects are stored under
-- `${school_id}/${filename}`; access mirrors the documents table's own RLS
-- (fine-grained access_level enforcement stays at the documents-row layer —
-- the frontend only ever requests a signed URL for a document row it was
-- already allowed to see).
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

create policy documents_bucket_staff_write on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'documents'
    and private.is_school_staff()
    and (storage.foldername(name))[1] = private.current_school_id()::text
  );

create policy documents_bucket_staff_delete on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'documents'
    and private.is_school_staff()
    and (storage.foldername(name))[1] = private.current_school_id()::text
  );

create policy documents_bucket_school_read on storage.objects for select
  to authenticated
  using (
    bucket_id = 'documents'
    and (
      private.my_role() = 'superadmin'
      or (storage.foldername(name))[1] = private.current_school_id()::text
    )
  );
