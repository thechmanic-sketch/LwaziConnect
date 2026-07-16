-- Move internal RLS-helper functions out of the `public` schema so
-- PostgREST no longer exposes them as callable RPC endpoints
-- (/rest/v1/rpc/my_role, etc.). They stay fully callable from within
-- RLS policies — Postgres resolves policy function calls by OID, not
-- by exposed-schema config, and EXECUTE stays granted to
-- authenticated/anon so policy evaluation keeps working.
-- find_school_id_by_name/register_school intentionally stay in
-- `public` — they're meant to be called via RPC from the signup flow.

create schema if not exists private;

alter function public.current_school_id() set schema private;
alter function public.my_role() set schema private;
alter function public.is_school_staff() set schema private;
alter function public.has_capability(text) set schema private;
alter function public.teaches_class(uuid) set schema private;
alter function public.is_parent_of(uuid) set schema private;
alter function public.handle_new_user() set schema private;

alter function private.current_school_id() set search_path = private, public;
alter function private.my_role() set search_path = private, public;
alter function private.is_school_staff() set search_path = private, public;
alter function private.has_capability(text) set search_path = private, public;
alter function private.teaches_class(uuid) set search_path = private, public;
alter function private.is_parent_of(uuid) set search_path = private, public;
alter function private.handle_new_user() set search_path = private, public;
