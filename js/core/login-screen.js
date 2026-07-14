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
 document.getElementById('lsRoleView').classList.remove('hidden');
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
