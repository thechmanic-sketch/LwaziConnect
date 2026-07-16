// ══ LOGIN SCREEN — LOGIN <-> SIGNUP <-> STAFF SWITCH ══
function openSignup() {
 document.getElementById('lsFormView').classList.add('hidden');
 document.getElementById('lsStaffView').classList.add('hidden');
 document.getElementById('lsSignupView').classList.remove('hidden');
 loadSchoolsForSignup();
 const school = document.getElementById('suSchool');
 if (school) school.focus();
}

async function loadSchoolsForSignup() {
 const sel = document.getElementById('suSchool');
 if (!sel || sel.dataset.loaded) return;
 try {
  const { data, error } = await sb.rpc('list_schools');
  if (error) throw error;
  const opts = (data || []).map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  sel.innerHTML = `<option value="" selected disabled>Select your school...</option>${opts}<option value="__new__">My school isn't listed — register it</option>`;
  sel.dataset.loaded = '1';
 } catch (err) {
  sel.innerHTML = `<option value="" selected disabled>Could not load schools</option><option value="__new__">My school isn't listed — register it</option>`;
 }
}

function toggleNewSchoolField() {
 const sel = document.getElementById('suSchool');
 const wrap = document.getElementById('suNewSchoolWrap');
 if (!sel || !wrap) return;
 wrap.classList.toggle('hidden', sel.value !== '__new__');
}

function backToRoles() {
 document.getElementById('lsSignupView').classList.add('hidden');
 document.getElementById('lsStaffView').classList.add('hidden');
 document.getElementById('lsFormView').classList.remove('hidden');
 const email = document.getElementById('loginEmail');
 if (email) email.focus();
}

// Super Admin / Techmanic staff sign-in is intentionally NOT exposed anywhere
// on the public login form or role dropdown — it's only reachable via a
// direct link carrying #staff in the URL (e.g. index.html#staff).
function openStaffLogin() {
 document.getElementById('lsFormView').classList.add('hidden');
 document.getElementById('lsSignupView').classList.add('hidden');
 document.getElementById('lsStaffView').classList.remove('hidden');
 const email = document.getElementById('staffEmail');
 if (email) email.focus();
}

(function () {
 function checkStaffHash() {
  if (window.location.hash === '#staff') openStaffLogin();
 }
 checkStaffHash();
 window.addEventListener('hashchange', checkStaffHash);
})();

function toggleSuPwVisibility(inputId, iconId) {
 const pw = document.getElementById(inputId);
 const icon = document.getElementById(iconId);
 const showing = pw.type === 'text';
 pw.type = showing ? 'password' : 'text';
 icon.textContent = showing ? 'SHOW' : 'HIDE';
}

async function doSignup() {
 const role = document.getElementById('suRole').value;
 const schoolSel = document.getElementById('suSchool').value;
 const newSchoolName = document.getElementById('suNewSchoolName').value.trim();
 const fullName = document.getElementById('suName').value.trim();
 const email = document.getElementById('suEmail').value.trim();
 const phone = document.getElementById('suPhone').value.trim();
 const password = document.getElementById('suPassword').value;
 const confirm = document.getElementById('suConfirm').value;
 if (!schoolSel) { T('Select your school','error'); return; }
 if (schoolSel === '__new__' && !newSchoolName) { T('Enter your new school\'s name','error'); return; }
 if (password !== confirm) { T('Passwords do not match','error'); return; }
 if (password.length < 8) { T('Password must be at least 8 characters','error'); return; }

 const cta = document.getElementById('signupCTA');
 if (cta) { cta.disabled = true; cta.textContent = 'CREATING ACCOUNT...'; }

 try {
  let schoolId;
  if (schoolSel === '__new__') {
   if (role !== 'principal' && role !== 'admin') {
    T('Only a Principal or Admin can register a new school — ask them to register first, then select it here.','error');
    if (cta) { cta.disabled = false; cta.textContent = 'CREATE ACCOUNT'; }
    return;
   }
   const { data: newId, error: createErr } = await sb.rpc('register_school', { p_name: newSchoolName });
   if (createErr) throw createErr;
   schoolId = newId;
  } else {
   schoolId = schoolSel;
  }

  const { data, error } = await sb.auth.signUp({
   email, password,
   options: { data: { role, school_id: schoolId, full_name: fullName, phone } }
  });
  if (error) throw error;

  document.getElementById('signupForm').reset();
  if (data.session) {
   await loadProfileAndEnter(data.user.id);
  } else {
   T('Account created — check your email to confirm, then log in.','success');
   backToRoles();
  }
 } catch (err) {
  T(err.message || 'Registration failed','error');
 } finally {
  if (cta) { cta.disabled = false; cta.textContent = 'CREATE ACCOUNT'; }
 }
}

// ══ LOGIN SCREEN — SUPPORT CHAT WIDGET (draggable balloon) ══
function toggleLsChat() {
 document.getElementById('lsChatPanel').classList.toggle('hidden');
}

(function () {
 const chat = document.getElementById('lsChat');
 const fab = document.getElementById('lsChatFab');
 if (!chat || !fab) return;

 let dragging = false, moved = false, startX = 0, startY = 0, startLeft = 0, startTop = 0;

 function toXY(e) {
  if (e.touches && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  return { x: e.clientX, y: e.clientY };
 }

 function pinToLeftTop() {
  const r = chat.getBoundingClientRect();
  chat.style.left = r.left + 'px';
  chat.style.top = r.top + 'px';
  chat.style.right = 'auto';
  chat.style.bottom = 'auto';
 }

 function onDown(e) {
  dragging = true; moved = false;
  const p = toXY(e);
  startX = p.x; startY = p.y;
  pinToLeftTop();
  startLeft = parseFloat(chat.style.left);
  startTop = parseFloat(chat.style.top);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('mouseup', onUp);
  document.addEventListener('touchend', onUp);
 }

 function onMove(e) {
  if (!dragging) return;
  const p = toXY(e);
  const dx = p.x - startX, dy = p.y - startY;
  if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
  if (!moved) return;
  e.preventDefault();
  const w = chat.offsetWidth, h = chat.offsetHeight;
  let newLeft = startLeft + dx, newTop = startTop + dy;
  newLeft = Math.max(4, Math.min(window.innerWidth - w - 4, newLeft));
  newTop = Math.max(4, Math.min(window.innerHeight - h - 4, newTop));
  chat.style.left = newLeft + 'px';
  chat.style.top = newTop + 'px';
 }

 function onUp() {
  dragging = false;
  document.removeEventListener('mousemove', onMove);
  document.removeEventListener('touchmove', onMove);
  document.removeEventListener('mouseup', onUp);
  document.removeEventListener('touchend', onUp);
  if (!moved) toggleLsChat();
 }

 fab.addEventListener('mousedown', onDown);
 fab.addEventListener('touchstart', onDown, { passive: true });
})();

// ══ LOGIN SCREEN — IMAGE CAROUSEL (Ken Burns zoom/pan + crossfade) ══
(function () {
 let lsSlideIdx = 0;
 setInterval(() => {
  const slides = document.querySelectorAll('#lsSlides .ls-slide');
  if (!slides.length) return;
  slides[lsSlideIdx].classList.remove('active');
  lsSlideIdx = (lsSlideIdx + 1) % slides.length;
  slides[lsSlideIdx].classList.add('active');
 }, 6500);
})();

// ══ LOGIN SCREEN — EDUCATION QUOTE ROTATOR (smooth crossfade) ══
const LS_QUOTES = [
 { text: '“Education is the most powerful weapon which you can use to change the world.”', author: '— Nelson Mandela' },
 { text: '“The beautiful thing about learning is that no one can take it away from you.”', author: '— B.B. King' },
 { text: '“An investment in knowledge pays the best interest.”', author: '— Benjamin Franklin' },
 { text: '“Education is not the filling of a pail, but the lighting of a fire.”', author: '— William Butler Yeats' },
];
(function () {
 let qIdx = 0;
 setInterval(() => {
  const inner = document.getElementById('lsQuoteInner');
  const txt = document.getElementById('lsQuoteText');
  const auth = document.getElementById('lsQuoteAuthor');
  if (!inner) return;
  inner.classList.add('fade');
  setTimeout(() => {
   qIdx = (qIdx + 1) % LS_QUOTES.length;
   txt.textContent = LS_QUOTES[qIdx].text;
   auth.textContent = LS_QUOTES[qIdx].author;
   inner.classList.remove('fade');
  }, 500);
 }, 7000);
})();
