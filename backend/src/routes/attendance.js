const express = require('express');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

function assertStudentInSchool(studentId, schoolId) {
  return db
    .prepare('SELECT id FROM students WHERE id = ? AND school_id = ?')
    .get(studentId, schoolId);
}

router.get('/:studentId', (req, res) => {
  const { studentId } = req.params;
  if (!assertStudentInSchool(studentId, req.user.schoolId)) {
    return res.status(404).json({ error: 'Student not found' });
  }
  const records = db
    .prepare('SELECT * FROM attendance WHERE student_id = ? ORDER BY date DESC')
    .all(studentId);
  res.json(records);
});

router.post('/:studentId', requireRole('admin', 'teacher', 'staff'), (req, res) => {
  const { studentId } = req.params;
  const { date, status } = req.body;
  if (!date || !['present', 'absent', 'late'].includes(status)) {
    return res.status(400).json({ error: 'Valid date and status are required' });
  }
  if (!assertStudentInSchool(studentId, req.user.schoolId)) {
    return res.status(404).json({ error: 'Student not found' });
  }

  db.prepare(
    `INSERT INTO attendance (student_id, date, status, marked_by) VALUES (?, ?, ?, ?)
     ON CONFLICT(student_id, date) DO UPDATE SET status = excluded.status, marked_by = excluded.marked_by`
  ).run(studentId, date, status, req.user.id);

  res.status(204).end();
});

module.exports = router;
