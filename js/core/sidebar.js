// ══ MOBILE SIDEBAR ══
function openSidebar(){document.getElementById('sidebarEl').classList.add('open');document.getElementById('sideOverlay').classList.add('show');}
function closeSidebar(){document.getElementById('sidebarEl').classList.remove('open');document.getElementById('sideOverlay').classList.remove('show');}

// ══ NAV SEARCH + VISIBILITY ══
let navSearchQ='';
function filterNav(q){
 navSearchQ=q.trim().toLowerCase();
 document.getElementById('navSearchClear').classList.toggle('hidden',!navSearchQ);
 applyNavVisibility();
}
function clearNavSearch(){
 navSearchQ='';
 document.getElementById('navSearchInput').value='';
 document.getElementById('navSearchClear').classList.add('hidden');
 applyNavVisibility();
}
function applyNavVisibility(){
 let anyItemVisible=false;
 document.querySelectorAll('.nav-item[data-v]').forEach(item=>{
  const v=item.dataset.v;
  const roleOk=!currentAllowedViews||currentAllowedViews.includes(v);
  const searchOk=!navSearchQ||item.textContent.toLowerCase().includes(navSearchQ);
  const visible=roleOk&&searchOk;
  item.style.display=visible?'':'none';
  if(visible)anyItemVisible=true;
 });
 document.querySelectorAll('.nav-sec').forEach(sec=>{
  let next=sec.nextElementSibling;
  let anyVisible=false;
  while(next&&!next.classList.contains('nav-sec')){
   if(next.style.display!=='none'&&!next.classList.contains('nav-empty'))anyVisible=true;
   next=next.nextElementSibling;
  }
  sec.style.display=anyVisible?'':'none';
 });
 const emptyMsg=document.getElementById('navEmptyMsg');
 if(emptyMsg)emptyMsg.classList.toggle('hidden',anyItemVisible);
}

// ══ NAV SCROLL ARROWS ══
function scrollNav(dir){
 const nav=document.getElementById('navEl');
 if(nav)nav.scrollBy({top:dir*140,behavior:'smooth'});
}

// ══ NAV BINDING ══
document.querySelectorAll('.nav-item[data-v]').forEach(item=>{
 item.addEventListener('click',()=>{
  if(CU_ROLE==='student'){rStudentPortal();document.getElementById('ptitle').textContent=item.textContent.trim();if(window.innerWidth<=860)closeSidebar();return;}
  V(item.dataset.v);if(window.innerWidth<=860)closeSidebar();
 });
});

// INIT — show login, don't auto-launch dashboard
// (dashboard launches after login)
