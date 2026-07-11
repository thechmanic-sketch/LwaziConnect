const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { schoolName, name, email, password, role } = req.body;
  if (!schoolName || !name || !email || !password || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!['admin', 'teacher', 'staff', 'parent'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  const school = db.prepare('INSERT INTO schools (name) VALUES (?)').run(schoolName);
  const passwordHash = await bcrypt.hash(password, 12);
  const user = db
    .prepare('INSERT INTO users (school_id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)')
    .run(school.lastInsertRowid, name, email, passwordHash, role);

  const token = jwt.sign(
    { id: user.lastInsertRowid, schoolId: school.lastInsertRowid, role },
    JWT_SECRET,
    { expiresIn: '12h' }
  );
  res.status(201).json({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, schoolId: user.school_id, role: user.role },
    JWT_SECRET,
    { expiresIn: '12h' }
  );
  res.json({ token });
});

module.exports = router;
