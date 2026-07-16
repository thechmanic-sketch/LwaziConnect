// ══ ROLE SYSTEM ══
let CU_ROLE = null;
let CU_PROFILE = null; // real Supabase profile row for the logged-in user: {id, school_id, role, full_name, ...}
let CU_SCHOOL = null; // real Supabase schools row for the logged-in user's school: {id, name, plan, status, logo_url}
let selRole = null;
let currentAllowedViews = null;

function schoolName(){ return (CU_SCHOOL && CU_SCHOOL.name) || 'Your School'; }

const ROLE_PROFILES = {
 superadmin: {name:'Themba Moyo',ini:'TM',bg:'#FEF3C7',fg:'#B45309',label:'Super Admin',nav:['dashboard','students','admissions','parents','classes','teachers','subjects','timetable','attendance','reportcards','fees','messages','announcements','documents','calendar','health','discipline','analytics','superadmin','enterprise','licensing','settings','aiassist','idcards','homework','commscentre','hr','transport','sgb','compliance']},
 principal:  {name:'Dr. S. Nkosi',ini:'SN',bg:'#D8F3DC',fg:'#1B4332',label:'Principal',nav:['dashboard','students','admissions','parents','classes','teachers','subjects','timetable','attendance','reportcards','fees','messages','announcements','documents','calendar','health','discipline','analytics','settings','aiassist','idcards','homework','commscentre','hr','sgb','compliance']},
 admin:      {name:'N. Khumalo',ini:'NK',bg:'#EFF6FF',fg:'#1D6FA4',label:'Administrator',nav:['dashboard','students','admissions','parents','classes','teachers','subjects','timetable','attendance','reportcards','fees','messages','announcements','documents','calendar','health','discipline','settings','aiassist','idcards','homework','commscentre']},
 teacher:    {name:'Mr. T. Zulu',ini:'TZ',bg:'#D8F3DC',fg:'#1B4332',label:'Teacher',nav:['dashboard','students','classes','subjects','timetable','attendance','reportcards','homework','messages','announcements','documents','calendar']},
 parent:     {name:'Lindiwe Dlamini',ini:'LD',bg:'#FFF8E7',fg:'#B45309',label:'Parent',nav:['dashboard','messages','announcements','fees','documents','calendar']},
 student:    {name:'Amahle Dlamini',ini:'AD',bg:'#EDE9FE',fg:'#5B21B6',label:'Student',nav:['dashboard','subjects','timetable','attendance','homework','announcements','documents','calendar']},
};

function togglePwVisibility() {
 const pw = document.getElementById('loginPassword');
 const icon = document.getElementById('pwToggleIcon');
 const showing = pw.type === 'text';
 pw.type = showing ? 'password' : 'text';
 icon.textContent = showing ? 'SHOW' : 'HIDE';
}

function initialsFromName(name) {
 return (name || 'U').trim().split(/\s+/).filter(Boolean).map(p => p[0]).slice(0, 2).join('').toUpperCase();
}

async function doLogin() {
 const email = document.getElementById('loginEmail').value.trim();
 const password = document.getElementById('loginPassword').value;
 if (!email || !password) { T('Enter your email and password','error'); return; }
 const cta = document.getElementById('loginCTA');
 if (cta) { cta.disabled = true; cta.textContent = 'SIGNING IN...'; }
 const { data, error } = await sb.auth.signInWithPassword({ email, password });
 if (error) {
  T(error.message || 'Login failed','error');
  if (cta) { cta.disabled = false; cta.textContent = 'LOGIN'; }
  return;
 }
 await loadProfileAndEnter(data.user.id);
 if (cta) { cta.disabled = false; cta.textContent = 'LOGIN'; }
}

async function doStaffLogin() {
 const email = document.getElementById('staffEmail').value.trim();
 const password = document.getElementById('staffPassword').value;
 if (!email || !password) { T('Enter your email and password','error'); return; }
 const cta = document.getElementById('staffCTA');
 if (cta) { cta.disabled = true; cta.textContent = 'SIGNING IN...'; }
 const { data, error } = await sb.auth.signInWithPassword({ email, password });
 if (error) {
  T(error.message || 'Login failed','error');
  if (cta) { cta.disabled = false; cta.textContent = 'SIGN IN'; }
  return;
 }
 const { data: profile, error: profErr } = await sb.from('profiles').select('*').eq('id', data.user.id).single();
 if (profErr || !profile || profile.role !== 'superadmin') {
  await sb.auth.signOut();
  T('Not authorized for staff access','error');
  if (cta) { cta.disabled = false; cta.textContent = 'SIGN IN'; }
  return;
 }
 await enterAppAsProfile(profile);
 if (cta) { cta.disabled = false; cta.textContent = 'SIGN IN'; }
}

// Fetch the caller's own profile row and enter the app as that user.
async function loadProfileAndEnter(userId) {
 const { data: profile, error } = await sb.from('profiles').select('*').eq('id', userId).single();
 if (error || !profile) {
  T('Could not load your account profile. Contact your school admin.','error');
  await sb.auth.signOut();
  return;
 }
 await enterAppAsProfile(profile);
}

// Pull the logged-in user's school data (classes/students/teachers) from
// Supabase and use it in place of the mock D.* arrays for the rest of the
// app. Superadmin spans schools, so it isn't school-scoped here.
async function loadSchoolData(schoolId) {
 if (!schoolId) return;
 const [{ data: classesRaw }, { data: studentsRaw }, { data: teacherProfiles }, { data: teacherLinks }] = await Promise.all([
  sb.from('classes').select('*').eq('school_id', schoolId),
  sb.from('students').select('*').eq('school_id', schoolId),
  sb.from('profiles').select('*').eq('school_id', schoolId).eq('role','teacher'),
  sb.from('teacher_classes').select('*'),
 ]);

 const classes = classesRaw || [];
 const students = studentsRaw || [];
 const teacherProfilesList = teacherProfiles || [];
 const links = teacherLinks || [];

 D.classes = classes.map(c => ({
  name: c.name,
  teacher: (teacherProfilesList.find(t => t.id === c.homeroom_teacher_id) || {}).full_name || '—',
  students: students.filter(s => s.class_id === c.id).length,
  cap: c.capacity || 0,
  room: c.room || '',
  _id: c.id,
 }));

 const classById = Object.fromEntries(classes.map(c => [c.id, c.name]));

 D.students = students.map(s => ({
  id: s.id,
  name: `${s.first_name} ${s.last_name}`,
  ini: initialsFromName(`${s.first_name} ${s.last_name}`),
  bg: '#D8F3DC', fg: '#1B4332',
  cls: classById[s.class_id] || '—',
  gender: s.gender || '',
  dob: s.dob || '',
  parent: '', phone: '', email: '', addr: '',
  // Not migrated yet (no marks/invoices/attendance tables wired to the
  // frontend): placeholder until Analytics/Fees/Attendance are ported.
  avg: 0, grade: '—', status: s.status, balance: 0, t1: 0, t2: 0, t3: 0, att: 0,
  medical: s.medical_condition || 'None', blood: s.blood_type || '—',
  _id: s.id,
 }));

 D.teachers = teacherProfilesList.map(t => ({
  id: t.id,
  name: t.full_name,
  ini: initialsFromName(t.full_name),
  bg: '#D8F3DC', fg: '#1B4332',
  subject: '',
  classes: links.filter(l => l.teacher_id === t.id).map(l => classById[l.class_id]).filter(Boolean),
  phone: t.phone || '', email: '', status: 'active', joined: '',
  profile_id: t.id,
 }));
}

// Pull every school on the platform for the Super Admin panel.
// Billing/CRM fields (contact, amount, health, lastLogin) aren't
// backed by any table yet, so they're placeholders until that's built.
async function loadAllSchools() {
 const { data: schoolsRaw } = await sb.from('schools').select('*');
 const { data: studentsRaw } = await sb.from('students').select('school_id');
 const schools = schoolsRaw || [];
 const students = studentsRaw || [];
 D.schools = schools.map(s => ({
  id: s.id,
  name: s.name,
  plan: s.plan,
  students: students.filter(x => x.school_id === s.id).length,
  status: s.status,
  contact: '—', amount: 0, health: 100, lastLogin: '—',
  _id: s.id,
 }));
}

async function enterAppAsProfile(profile) {
 CU_PROFILE = profile;
 selRole = profile.role;
 CU_ROLE = profile.role;
 const rp = ROLE_PROFILES[profile.role] || ROLE_PROFILES.admin;
 const ini = profile.initials || initialsFromName(profile.full_name);

 if (profile.role === 'superadmin') {
  CU_SCHOOL = null;
  await loadAllSchools();
 } else {
  const { data: schoolRow } = await sb.from('schools').select('*').eq('id', profile.school_id).single();
  CU_SCHOOL = schoolRow || null;
  await loadSchoolData(profile.school_id);
 }

 document.getElementById('loginScreen').style.display = 'none';
 document.getElementById('appWrap').classList.remove('hidden');
 document.getElementById('sideAvatar').textContent = ini;
 document.getElementById('sideAvatar').style.background = profile.avatar_bg || rp.bg;
 document.getElementById('sideAvatar').style.color = profile.avatar_fg || rp.fg;
 document.getElementById('sideName').textContent = profile.full_name || rp.name;
 document.getElementById('sideRoleLabel').textContent = rp.label;
 document.getElementById('roleBadgeTxt').textContent = rp.label;
 const sideSchoolName = document.getElementById('sideSchoolName');
 const sideSchoolPlan = document.getElementById('sideSchoolPlan');
 if (sideSchoolName) sideSchoolName.textContent = profile.role === 'superadmin' ? 'Platform Admin' : schoolName();
 if (sideSchoolPlan) sideSchoolPlan.textContent = CU_SCHOOL ? `${CU_SCHOOL.plan} · ${CU_SCHOOL.status}` : '';
 buildRoleNav(rp.nav);
 const topBtn = document.getElementById('topBtn');
 if (topBtn) topBtn.classList.toggle('hidden', profile.role === 'parent' || profile.role === 'student');
 if (profile.role === 'parent') { rParentPortal(); document.getElementById('ptitle').textContent = 'My Child'; }
 else if (profile.role === 'student') { rStudentPortal(); document.getElementById('ptitle').textContent = 'My Portal'; }
 else V('dashboard');
}

async function doLogout() {
 await sb.auth.signOut();
 CU_ROLE = null; selRole = null; CU_PROFILE = null;
 document.getElementById('appWrap').classList.add('hidden');
 document.getElementById('loginScreen').style.display = 'flex';
 document.getElementById('loginForm').reset();
 backToRoles();
}

function buildRoleNav(allowedViews) {
 currentAllowedViews = allowedViews;
 applyNavVisibility();
}

// Resume an existing Supabase session on page load/refresh, so the user
// isn't kicked back to the login screen every reload.
(async function resumeSession() {
 const { data } = await sb.auth.getSession();
 if (data && data.session && data.session.user) {
  await loadProfileAndEnter(data.session.user.id);
 }
})();
