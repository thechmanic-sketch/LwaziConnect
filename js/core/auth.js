// ══ ROLE SYSTEM ══
let CU_ROLE = null;
let CU_PROFILE = null; // real Supabase profile row for the logged-in user: {id, school_id, role, full_name, ...}
let CU_SCHOOL = null; // real Supabase schools row for the logged-in user's school: {id, name, plan, status, logo_url}
let CU_MY_STUDENT = null; // for role=student: their own D.students row. For role=parent: their first linked child's D.students row.
let selRole = null;
let currentAllowedViews = null;

function schoolName(){ return (CU_SCHOOL && CU_SCHOOL.name) || 'Your School'; }

const ROLE_PROFILES = {
 superadmin: {name:'Themba Moyo',ini:'TM',bg:'#FEF3C7',fg:'#B45309',label:'Super Admin',nav:['dashboard','students','admissions','parents','classes','teachers','subjects','timetable','attendance','reportcards','fees','messages','announcements','documents','calendar','health','discipline','analytics','superadmin','enterprise','licensing','settings','aiassist','idcards','homework','commscentre','hr','transport','sgb','compliance','groups']},
 principal:  {name:'Dr. S. Nkosi',ini:'SN',bg:'#D8F3DC',fg:'#1B4332',label:'Principal',nav:['dashboard','students','admissions','parents','classes','teachers','subjects','timetable','attendance','reportcards','fees','messages','announcements','documents','calendar','health','discipline','analytics','settings','aiassist','idcards','homework','commscentre','hr','sgb','compliance','groups']},
 admin:      {name:'N. Khumalo',ini:'NK',bg:'#EFF6FF',fg:'#1D6FA4',label:'Administrator',nav:['dashboard','students','admissions','parents','classes','teachers','subjects','timetable','attendance','reportcards','fees','messages','announcements','documents','calendar','health','discipline','settings','aiassist','idcards','homework','commscentre','groups']},
 teacher:    {name:'Mr. T. Zulu',ini:'TZ',bg:'#D8F3DC',fg:'#1B4332',label:'Teacher',nav:['dashboard','students','classes','subjects','timetable','attendance','reportcards','homework','messages','announcements','documents','calendar','groups']},
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
 const [{ data: classesRaw }, { data: studentsRaw }, { data: teacherProfiles }, { data: teacherLinks }, { data: admissionsRaw }, { data: parentProfiles }, { data: parentLinks }, { data: documentsRaw }, { data: calEventsRaw }, { data: healthRaw }, { data: disciplineRaw }, { data: invoicesRaw }] = await Promise.all([
  sb.from('classes').select('*').eq('school_id', schoolId),
  sb.from('students').select('*').eq('school_id', schoolId),
  sb.from('profiles').select('*').eq('school_id', schoolId).eq('role','teacher'),
  sb.from('teacher_classes').select('*'),
  sb.from('admissions').select('*').eq('school_id', schoolId).order('submitted_at', { ascending: false }),
  sb.from('profiles').select('*').eq('school_id', schoolId).eq('role','parent'),
  sb.from('parent_students').select('*'),
  sb.from('documents').select('*, uploader:profiles(full_name)').eq('school_id', schoolId).order('created_at', { ascending: false }),
  sb.from('calendar_events').select('*').eq('school_id', schoolId).order('event_date', { ascending: true }),
  sb.from('health_records').select('*').eq('school_id', schoolId),
  sb.from('discipline_records').select('*').eq('school_id', schoolId).order('incident_date', { ascending: false }),
  sb.from('invoices').select('*').eq('school_id', schoolId),
 ]);
 const [{ data: staffRaw }, { data: sgbMembersRaw }, { data: sgbMeetingsRaw }, { data: vehiclesRaw }, { data: campusesRaw }, { data: auditLogRaw }] = await Promise.all([
  sb.from('staff').select('*').eq('school_id', schoolId),
  sb.from('sgb_members').select('*').eq('school_id', schoolId),
  sb.from('sgb_meetings').select('*').eq('school_id', schoolId).order('meeting_date', { ascending: false }),
  sb.from('vehicles').select('*').eq('school_id', schoolId),
  sb.from('campuses').select('*').eq('school_id', schoolId),
  sb.from('audit_log').select('*').eq('school_id', schoolId).order('created_at', { ascending: false }).limit(50),
 ]);
 const { data: marksRaw } = await sb.from('marks').select('*').eq('school_id', schoolId);
 const { data: timetableRaw } = await sb.from('timetable_slots').select('*').eq('school_id', schoolId);
 D.timetableSlots = timetableRaw || [];

 const [{ data: capsRaw }, { data: profileCapsRaw }, { data: groupsRaw }, { data: groupLeadersRaw }, { data: groupMembersRaw }] = await Promise.all([
  sb.from('capabilities').select('*'),
  sb.from('profile_capabilities').select('*'),
  sb.from('groups').select('*').eq('school_id', schoolId),
  sb.from('group_leaders').select('*'),
  sb.from('group_members').select('*'),
 ]);
 D.capabilities = capsRaw || [];
 D.profileCapabilities = profileCapsRaw || [];

 const classes = classesRaw || [];
 const students = studentsRaw || [];
 const teacherProfilesList = teacherProfiles || [];
 const links = teacherLinks || [];
 const parentProfilesList = parentProfiles || [];
 const pLinks = parentLinks || [];

 D.classes = classes.map(c => ({
  name: c.name,
  teacher: (teacherProfilesList.find(t => t.id === c.homeroom_teacher_id) || {}).full_name || '—',
  students: students.filter(s => s.class_id === c.id).length,
  cap: c.capacity || 0,
  room: c.room || '',
  _id: c.id,
 }));

 const classById = Object.fromEntries(classes.map(c => [c.id, c.name]));

 const marksList = marksRaw || [];
 const marksByStudent = {};
 marksList.forEach(m => { (marksByStudent[m.student_id] = marksByStudent[m.student_id] || []).push(m); });
 const termAvg = (list, term) => {
  const rows = list.filter(m => m.term === term);
  if (!rows.length) return 0;
  return Math.round(rows.reduce((a, m) => a + (Number(m.mark) / Number(m.out_of)) * 100, 0) / rows.length);
 };
 const gradeFor = avg => avg >= 80 ? 'A' : avg >= 70 ? 'B' : avg >= 60 ? 'C' : avg >= 50 ? 'D' : avg > 0 ? 'F' : '—';

 D.students = students.map(s => {
  const sMarks = marksByStudent[s.id] || [];
  const avg = sMarks.length ? Math.round(sMarks.reduce((a, m) => a + (Number(m.mark) / Number(m.out_of)) * 100, 0) / sMarks.length) : 0;
  return {
   id: s.id,
   name: `${s.first_name} ${s.last_name}`,
   ini: initialsFromName(`${s.first_name} ${s.last_name}`),
   bg: '#D8F3DC', fg: '#1B4332',
   cls: classById[s.class_id] || '—',
   gender: s.gender || '',
   dob: s.dob || '',
   parent: '', phone: '', email: '', addr: '',
   avg, grade: gradeFor(avg), status: s.status, balance: 0,
   t1: termAvg(sMarks, 'Term 1'), t2: termAvg(sMarks, 'Term 2'), t3: termAvg(sMarks, 'Term 3'),
   // Not migrated yet (no attendance-aggregation table wired to the frontend).
   att: 0,
   medical: s.medical_condition || 'None', blood: s.blood_type || '—',
   marks: sMarks,
   _id: s.id,
  };
 });

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

 const studentById = Object.fromEntries(D.students.map(s => [s.id, s]));
 D.parents = parentProfilesList.map(p => {
  const childIds = pLinks.filter(l => l.parent_id === p.id).map(l => l.student_id);
  const childNames = childIds.map(id => studentById[id]?.name).filter(Boolean);
  childIds.forEach(id => { if (studentById[id]) studentById[id].parent = p.full_name; });
  return {
   id: p.id,
   name: p.full_name,
   ini: initialsFromName(p.full_name),
   bg: '#EFF6FF', fg: '#1D6FA4',
   children: childNames,
   phone: p.phone || '', email: '', portal: true, status: 'active',
  };
 });

 D.calEvents = (calEventsRaw || []).map(e => ({
  id: e.id,
  title: e.title,
  date: e.event_date,
  type: e.type,
  cls: e.class_id ? (classById[e.class_id] || 'All') : 'All',
 }));

 D.health = (healthRaw || []).map(h => ({
  id: h.id,
  student: studentById[h.student_id]?.name || '—',
  condition: h.medical_condition || 'None',
  allergy: h.allergy || 'None',
  blood: h.blood_type || '—',
  aid: h.medical_aid || '—',
  emergency: h.emergency_contact || '—',
 }));

 D.discipline = (disciplineRaw || []).map(d => ({
  id: d.id,
  student: studentById[d.student_id]?.name || '—',
  type: d.type,
  desc: d.description || '',
  date: d.incident_date,
  teacher: teacherProfilesList.find(t => t.id === d.reported_by)?.full_name || '—',
  action: d.action_taken || '—',
  status: d.status,
 }));

 D.invoices = (invoicesRaw || []).map(i => ({
  id: i.id,
  student: studentById[i.student_id]?.name || '—',
  term: i.term,
  amount: Number(i.amount) || 0,
  paid: Number(i.paid) || 0,
  status: i.status,
  due: i.due_date || '—',
 }));

 const groupLeadersList = groupLeadersRaw || [];
 const groupMembersList = groupMembersRaw || [];
 D.groups = (groupsRaw || []).map(g => ({
  id: g.id,
  name: g.name,
  type: g.type,
  leaders: groupLeadersList.filter(l => l.group_id === g.id).map(l => teacherProfilesList.find(t => t.id === l.teacher_id)?.full_name).filter(Boolean),
  memberCount: groupMembersList.filter(m => m.group_id === g.id).length,
  createdBy: g.created_by,
 }));

 D.staff = (staffRaw || []).map(s => ({
  id: s.id,
  name: s.full_name,
  role: s.role_title || '—',
  dept: s.department || '—',
  contract: s.contract_type || '—',
  startDate: s.start_date || '—',
  leaveBalance: s.leave_balance || 0,
  status: s.status,
 }));

 D.sgbMembers = (sgbMembersRaw || []).map(m => ({
  id: m.id,
  name: m.name,
  role: m.role_title || '—',
  category: m.category || '—',
  term: m.term || '—',
  phone: m.phone || '—',
 }));

 D.sgbMeetings = (sgbMeetingsRaw || []).map(m => ({
  id: m.id,
  date: m.meeting_date,
  title: m.title,
  attendance: m.attendance || '—',
  status: m.status,
  resolutions: m.resolutions_count || 0,
 }));

 D.vehicles = (vehiclesRaw || []).map(v => ({
  id: v.registration,
  reg: v.registration,
  driver: v.driver_name || '—',
  route: v.route || '—',
  capacity: v.capacity || 0,
  enrolled: 0,
  lastService: v.last_service || '—',
  status: v.status,
  _id: v.id,
 }));

 D.campuses = (campusesRaw || []).map(c => ({
  id: c.id,
  name: c.name,
  principal: c.principal_name || '—',
  type: c.type || '—',
  students: c.expected_students || 0,
  status: c.status,
 }));

 D.auditLog = (auditLogRaw || []).map(l => ({
  id: l.id,
  action: l.action,
  user: teacherProfilesList.find(t => t.id === l.actor_id)?.full_name || (l.actor_id ? '—' : 'System'),
  time: l.created_at ? new Date(l.created_at).toLocaleString() : '—',
 }));

 D.documents = (documentsRaw || []).map(d => ({
  id: d.id,
  name: d.name,
  type: (d.name.split('.').pop() || '').toLowerCase(),
  cat: d.category || 'General',
  access: d.access_level === 'all' ? 'All' : d.access_level.charAt(0).toUpperCase() + d.access_level.slice(1),
  by: d.uploader?.full_name || '—',
  date: d.created_at ? d.created_at.split('T')[0] : '—',
  size: '',
  storagePath: d.storage_path,
 }));

 D.admissions = (admissionsRaw || []).map(a => ({
  id: a.id,
  name: a.applicant_name,
  grade: a.grade_applying || '—',
  parent: a.parent_name || '—',
  phone: a.phone || '—',
  date: a.submitted_at ? a.submitted_at.split('T')[0] : '—',
  status: a.status,
 }));
}

// Resolve which real D.students row belongs to the logged-in user —
// their own record (student role, via students.profile_id) or their
// linked child's record (parent role, via parent_students). Without
// this, every parent/student saw D.students[0] — an arbitrary row,
// not necessarily theirs.
async function loadMyStudent(profile) {
 if (profile.role === 'student') {
  const { data: row } = await sb.from('students').select('id').eq('profile_id', profile.id).maybeSingle();
  return row ? (D.students.find(s => s.id === row.id) || null) : null;
 }
 if (profile.role === 'parent') {
  const { data: links } = await sb.from('parent_students').select('student_id').eq('parent_id', profile.id);
  const firstId = links && links[0] && links[0].student_id;
  // TODO: parents with multiple children only see the first linked one for now — needs a child switcher.
  return firstId ? (D.students.find(s => s.id === firstId) || null) : null;
 }
 return null;
}

// Loads the current user's message threads + messages into D.messages.
// A thread is assumed to be 1:1 (the "other" participant is whoever
// isn't me); avatar colour is just a deterministic pick from ROLE_PROFILES.
async function loadMessages(profileId) {
 D.messages = [];
 const { data: myParticipation } = await sb.from('thread_participants').select('thread_id').eq('profile_id', profileId);
 const threadIds = (myParticipation || []).map(p => p.thread_id);
 if (!threadIds.length) return;

 const [{ data: threadsRaw }, { data: allParticipants }, { data: messagesRaw }] = await Promise.all([
  sb.from('message_threads').select('*').in('id', threadIds),
  sb.from('thread_participants').select('*, profile:profiles(id, full_name, role)').in('thread_id', threadIds),
  sb.from('messages').select('*').in('thread_id', threadIds).order('sent_at', { ascending: true }),
 ]);

 const fmtTime = iso => { const d = new Date(iso); return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0'); };

 D.messages = (threadsRaw || []).map(t => {
  const others = (allParticipants || []).filter(p => p.thread_id === t.id && p.profile_id !== profileId);
  const other = others[0]?.profile;
  const rp = other ? (ROLE_PROFILES[other.role] || ROLE_PROFILES.admin) : null;
  const threadMsgs = (messagesRaw || []).filter(m => m.thread_id === t.id);
  const last = threadMsgs[threadMsgs.length - 1];
  return {
   id: t.id,
   recipientId: other?.id || null,
   from: other?.full_name || t.subject || 'Conversation',
   role: rp?.label || '',
   ini: other ? initialsFromName(other.full_name) : '?',
   bg: rp?.bg || '#EFF6FF', fg: rp?.fg || '#1D6FA4',
   unread: false,
   time: last ? fmtTime(last.sent_at) : '',
   thread: threadMsgs.map(m => ({ dir: m.sender_id === profileId ? 'out' : 'in', text: m.body, time: fmtTime(m.sent_at) })),
  };
 }).sort((a, b) => (b.time > a.time ? 1 : -1));
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
 if (profile.role === 'superadmin') {
  CU_SCHOOL = null;
  await loadAllSchools();
 } else {
  const { data: schoolRow } = await sb.from('schools').select('*').eq('id', profile.school_id).single();
  CU_SCHOOL = schoolRow || null;
  if (CU_SCHOOL && CU_SCHOOL.status === 'suspended') {
   await sb.auth.signOut();
   T('This school\'s account is currently suspended. Contact your school administrator.', 'error');
   return;
  }
  await loadSchoolData(profile.school_id);
  CU_MY_STUDENT = await loadMyStudent(profile);
 }

 CU_PROFILE = profile;
 selRole = profile.role;
 CU_ROLE = profile.role;
 await loadMessages(profile.id);
 const rp = ROLE_PROFILES[profile.role] || ROLE_PROFILES.admin;
 const ini = profile.initials || initialsFromName(profile.full_name);

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
