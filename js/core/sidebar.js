// ══ MOBILE SIDEBAR ══
function openSidebar(){document.getElementById('sidebarEl').classList.add('open');document.getElementById('sideOverlay').classList.add('show');}
function closeSidebar(){document.getElementById('sidebarEl').classList.remove('open');document.getElementById('sideOverlay').classList.remove('show');}

// ══ NAV BINDING ══
document.querySelectorAll('.nav-item[data-v]').forEach(item=>{
 item.addEventListener('click',()=>{
  if(CU_ROLE==='student'){rStudentPortal();document.getElementById('ptitle').textContent=item.textContent.trim();if(window.innerWidth<=860)closeSidebar();return;}
  V(item.dataset.v);if(window.innerWidth<=860)closeSidebar();
 });
});

// INIT — show login, don't auto-launch dashboard
// (dashboard launches after login)
