// ══ LOGIN SCREEN — ROLE PICKER ══
const LS_ROLE_LABELS = {principal:'Principal',admin:'Admin',teacher:'Teacher',student:'Student',parent:'Parent'};

function openRoleLogin(role) {
 document.getElementById('lsRoleView').classList.add('hidden');
 document.getElementById('lsFormView').classList.remove('hidden');
 document.getElementById('loginRole').value = role;
 document.getElementById('lsChosenRoleLabel').textContent = LS_ROLE_LABELS[role] || role;
 const email = document.getElementById('loginEmail');
 if (email) email.focus();
}

function backToRoles() {
 document.getElementById('lsFormView').classList.add('hidden');
 document.getElementById('lsSignupView').classList.add('hidden');
 document.getElementById('lsRoleView').classList.remove('hidden');
}

// ══ LOGIN SCREEN — CREATE ACCOUNT ══
function openSignup() {
 document.getElementById('lsRoleView').classList.add('hidden');
 document.getElementById('lsFormView').classList.add('hidden');
 document.getElementById('lsSignupView').classList.remove('hidden');
 const school = document.getElementById('suSchool');
 if (school) school.focus();
}

function toggleSuPwVisibility(inputId, iconId) {
 const pw = document.getElementById(inputId);
 const icon = document.getElementById(iconId);
 const showing = pw.type === 'text';
 pw.type = showing ? 'password' : 'text';
 icon.classList.toggle('ti-eye', showing);
 icon.classList.toggle('ti-eye-off', !showing);
}

function doSignup() {
 const password = document.getElementById('suPassword').value;
 const confirm = document.getElementById('suConfirm').value;
 if (password !== confirm) { T('Passwords do not match','error'); return; }
 const school = document.getElementById('suSchool').value.trim();
 T(`Account request received for ${school || 'your school'} — check your email to confirm (demo)`, 'success');
 document.getElementById('signupForm').reset();
 backToRoles();
}

// ══ LOGIN SCREEN — SUPPORT CHAT WIDGET ══
function toggleLsChat() {
 document.getElementById('lsChatPanel').classList.toggle('hidden');
}

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
