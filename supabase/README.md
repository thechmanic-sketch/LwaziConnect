# LwaziConnect — Supabase schema

## What's here

- `migrations/0001_init.sql` — full schema: schools (tenants), profiles/roles,
  capabilities (extra scopes like "Sports Coordinator"), classes, students,
  teacher↔class links, parent↔student links, teacher-created groups
  (clubs/teams), announcements, messages, documents, invoices, homework,
  attendance, calendar — every table scoped by `school_id` with Row Level
  Security policies enforcing that isolation at the database level.
- `migrations/0002_auth_signup_trigger.sql` — auto-creates a `profiles` row
  whenever someone signs up via Supabase Auth.

## How to run it

1. Open your Supabase project → **SQL Editor**.
2. Paste the contents of `0001_init.sql`, run it.
3. Paste the contents of `0002_auth_signup_trigger.sql`, run it.
4. Check **Table Editor** — you should see all the tables listed above, and
   `capabilities` should already have 4 seeded rows.

Run them in order — `0002` references the `profiles` table created in `0001`.

## Key design decisions (so this survives without me in the room)

- **Multi-school isolation is enforced at the database, not the frontend.**
  Every table has `school_id`, and RLS policies check
  `school_id = current_school_id()` (a helper function that reads the
  caller's own profile) on every query. Even a bug in frontend code that
  forgets to filter by school cannot leak another school's data — Postgres
  refuses to return rows outside the policy.
- **Roles stay simple, capabilities are additive.** `profiles.role` is still
  one of the 6 fixed roles (matches the current app). Extra responsibilities
  (Sports Coordinator, Deputy Principal, "can create a group") are granted
  via `profile_capabilities` — a join table Principal/Admin can manage
  through the UI, no code changes needed to add a new combination.
- **Groups are teacher-created, not admin-created.** A teacher can create a
  group (`groups` table) only if they're staff or hold the `create-group`
  capability. `group_leaders` and `group_members` control who can message
  the group and who's in it. Staff can always see every group in their
  school — teacher self-serve doesn't mean admin loses visibility.
- **Class-scoped RLS mirrors the frontend fixes already shipped.** Teachers
  can only see/mark attendance, set homework, etc. for classes they're
  linked to via `teacher_classes` — same rule we just enforced in the JS
  frontend (`myTeacherClasses()`), now enforced twice: once for UX, once for
  real by the database.

## What's NOT in this migration yet (intentionally deferred)

- Storage buckets for document/report-card files (needs bucket + policy
  design once we know upload flows).
- Discipline log and health records tables (same shape as the others, just
  not built yet — low priority per the earlier audit, admin/principal-only).
- Realtime subscription config for the Messages panel.

## Next steps once you've run this

1. Give me the **Project URL** and **anon key** (Settings → API) so I can
   wire the frontend to call Supabase instead of the in-memory `D` object.
2. Decide the actual signup/invite flow: do new users self-register with a
   school code, or does an admin invite them by email? This determines how
   `school_id` gets attached at signup time (see the comment in
   `0002_auth_signup_trigger.sql`).
3. I'll migrate one entity first (recommend: `students` + `classes` +
   `profiles`/auth) to validate the whole pipeline end-to-end before
   rewriting every view file.
