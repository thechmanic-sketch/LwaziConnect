function rGroups(area){
 const typeCol={club:'pg',team:'pb',committee:'pa',other:'pn'};
 area.innerHTML=`<div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-users-group"></i>Groups & Clubs</div><button class="btn btn-g" onclick="mAddGroup()"><i class="ti ti-plus" style="font-size:11px"></i>Create Group</button></div>
  ${D.groups.length?D.groups.map(g=>`
  <div class="sa-card">
   <div class="av av-m" style="background:var(--gp);color:var(--g)"><i class="ti ti-users-group"></i></div>
   <div style="flex:1"><div style="font-weight:600;font-size:13px">${g.name}</div><div class="tsm">${g.leaders.length?g.leaders.join(', '):'No leader assigned'} · ${g.memberCount} member${g.memberCount===1?'':'s'}</div></div>
   <span class="pill ${typeCol[g.type]||'pn'}">${g.type}</span>
  </div>`).join(''):'<div class="tsm" style="padding:12px 0">No groups yet — create a club, team, or committee.</div>'}
 </div>`;
}
