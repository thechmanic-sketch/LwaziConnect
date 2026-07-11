const express = require('express');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  const students = db
    .prepare('SELECT * FROM students WHERE school_id = ? ORDER BY name')
    .all(req.user.schoolId);
  res.json(students);
});

router.post('/', requireRole('admin', 'teacher', 'staff'), (req, res) => {
  const { name, className, guardianName, guardianContact } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const result = db
    .prepare(
      'INSERT INTO students (school_id, name, class_name, guardian_name, guardian_contact) VALUES (?, ?, ?, ?, ?)'
    )
    .run(req.user.schoolId, name, className || null, guardianName || null, guardianContact || null);

  res.status(201).json({ id: result.lastInsertRowid });
});

module.exports = router;
