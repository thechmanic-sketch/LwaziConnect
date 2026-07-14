function selectRole(role, el) {
 selRole = role;
 document.querySelectorAll('.role-pick').forEach(e => e.classList.remove('selected'));
 el.classList.add('selected');
 document.getElementById('loginCTA').disabled = false;
}

function doLogin() {
 if (!selRole) return;
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
 document.querySelectorAll('.role-pick').forEach(e => e.classList.remove('selected'));
 document.getElementById('loginCTA').disabled = true;
}

function buildRoleNav(allowedViews) {
 document.querySelectorAll('.nav-item[data-v]').forEach(item => {
  const v = item.dataset.v;
  item.style.display = allowedViews.includes(v) ? '' : 'none';
 });
 document.querySelectorAll('.nav-sec').forEach(sec => {
  // hide section label if all items below it are hidden
  let next = sec.nextElementSibling;
  let anyVisible = false;
  while (next && !next.classList.contains('nav-sec')) {
   if (next.style.display !== 'none') anyVisible = true;
   next = next.nextElementSibling;
  }
  sec.style.display = anyVisible ? '' : 'none';
 });
}

