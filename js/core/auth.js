// ══ ROLE SYSTEM ══
let CU_ROLE = null;
let selRole = null;
let currentAllowedViews = null;

const ROLE_PROFILES = {
 superadmin: {name:'Themba Moyo',ini:'TM',bg:'#FEF3C7',fg:'#B45309',label:'Super Admin',nav:['dashboard','students','admissions','parents','classes','teachers','subjects','timetable','attendance','reportcards','fees','messages','announcements','documents','calendar','health','discipline','analytics','superadmin','enterprise','licensing','settings','aiassist','idcards','homework','commscentre','hr','transport','sgb','compliance']},
 principal:  {name:'Dr. S. Nkosi',ini:'SN',bg:'#D8F3DC',fg:'#1B4332',label:'Principal',nav:['dashboard','students','admissions','parents','classes','teachers','subjects','timetable','attendance','reportcards','fees','messages','announcements','documents','calendar','health','discipline','analytics','settings','aiassist','idcards','homework','commscentre','hr','sgb','compliance']},
 admin:      {name:'N. Khumalo',ini:'NK',bg:'#EFF6FF',fg:'#1D6FA4',label:'Administrator',nav:['dashboard','students','admissions','parents','classes','teachers','subjects','timetable','attendance','reportcards','fees','messages','announcements','documents','calendar','health','discipline','settings','aiassist','idcards','homework','commscentre']},
 parent:     {name:'Lindiwe Dlamini',ini:'LD',bg:'#FFF8E7',fg:'#B45309',label:'Parent',nav:['dashboard','messages','announcements','fees','documents','calendar']},
 student:    {name:'Amahle Dlamini',ini:'AD',bg:'#EDE9FE',fg:'#5B21B6',label:'Student',nav:['dashboard','subjects','timetable','attendance','homework','announcements','documents','calendar']},
};

function togglePwVisibility() {
 const pw = document.getElementById('loginPassword');
 const icon = document.getElementById('pwToggleIcon');
 const showing = pw.type === 'text';
 pw.type = showing ? 'password' : 'text';
 icon.classList.toggle('ti-eye', showing);
 icon.classList.toggle('ti-eye-off', !showing);
}

function doLogin() {
 const email = document.getElementById('loginEmail').value.trim();
 const password = document.getElementById('loginPassword').value;
 if (!email || !password) { T('Enter your email and password','error'); return; }
 selRole = document.getElementById('loginRole').value;
 CU_ROLE = selRole;
 const p = ROLE_PROFILES[selRole];
 // hide login, show app
 document.getElementById('loginScreen').style.display = 'none';
 document.getElementById('appWrap').classList.remove('hidden');
 // update sidebar footer
 document.getElementById('sideAvatar').textContent = p.ini;
 document.getElementById('sideAvatar').style.background = p.bg;
 document.getElementById('sideAvatar').style.color = p.fg;
 document.getElementById('sideName').textContent = p.name;
 document.getElementById('sideRoleLabel').textContent = p.label;
 // update role badge in topbar
 document.getElementById('roleBadgeTxt').textContent = p.label;
 // rebuild nav — show only items for this role
 buildRoleNav(p.nav);
 // go to dashboard
 if (selRole === 'parent') { rParentPortal(); document.getElementById('ptitle').textContent = 'My Child'; }
 else if (selRole === 'student') { rStudentPortal(); document.getElementById('ptitle').textContent = 'My Portal'; }
 else V('dashboard');
}

function doLogout() {
 CU_ROLE = null; selRole = null;
 document.getElementById('appWrap').classList.add('hidden');
 document.getElementById('loginScreen').style.display = 'flex';
 document.getElementById('loginForm').reset();
}

function buildRoleNav(allowedViews) {
 currentAllowedViews = allowedViews;
 applyNavVisibility();
}

