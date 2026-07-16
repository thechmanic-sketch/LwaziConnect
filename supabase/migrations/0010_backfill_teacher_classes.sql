-- Backfill teacher_classes for classes that already have a homeroom_teacher_id
-- but never got a corresponding teacher_classes row (bug: submitAddClass() only
-- started inserting into teacher_classes as of the frontend fix accompanying this migration).
insert into teacher_classes (teacher_id, class_id)
select c.homeroom_teacher_id, c.id
from classes c
where c.homeroom_teacher_id is not null
on conflict (teacher_id, class_id, subject) do nothing;
