function rSGB(area){
 area.innerHTML=`
 <div style="background:var(--pp);border:1px solid var(--p);border-radius:9px;padding:11px 15px;margin-bottom:16px;display:flex;align-items:center;gap:10px">
  <i class="ti ti-gavel" style="font-size:18px;color:var(--p)"></i>
  <div style="flex:1"><div style="font-weight:700;font-size:12px;color:var(--p)">School Governing Body — South African Schools Act compliant</div><div class="tsm">Members, meetings, minutes, resolutions, and policy records</div></div>
  <span class="phase-badge" style="background:var(--pp);color:var(--p)">Phase 2 · SA Advantage</span>
 </div>
 <div class="g2 mb18">
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-users-group"></i>SGB Members</div><button class="btn btn-g" onclick="T('Member form opened','')"><i class="ti ti-plus" style="font-size:11px"></i>Add Member</button></div>
   ${D.sgbMembers.map(m=>`<div class="flex ic g8" style="padding:9px 0;border-bottom:1px solid var(--sp)">
    <div class="av av-s" style="background:var(--pp);color:var(--p)">${m.name.split(' ').map(n=>n[0]).slice(-2).join('')}</div>
    <div style="flex:1"><div style="font-size:12px;font-weight:600">${m.name}</div><div class="tsm">${m.role} · ${m.category}</div></div>
    <span class="pill pn">${m.term}</span>
   </div>`).join('')}
  </div>
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-calendar-event"></i>Meetings & Minutes</div><button class="btn btn-g" onclick="mSchedMeeting()"><i class="ti ti-plus" style="font-size:11px"></i>Schedule Meeting</button></div>
   ${D.sgbMeetings.map(m=>`<div class="flex ic g8" style="padding:9px 0;border-bottom:1px solid var(--sp)">
    <div style="background:var(--g);color:#fff;border-radius:6px;padding:4px 7px;text-align:center;flex-shrink:0;min-width:36px"><div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:12px;line-height:1">${m.date.split('-')[2]}</div><div style="font-size:7px;opacity:.6">${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'][parseInt(m.date.split('-')[1])-1]}</div></div>
    <div style="flex:1"><div style="font-size:12px;font-weight:600">${m.title}</div><div class="tsm">Attendance: ${m.attendance} · ${m.resolutions} resolutions</div></div>
    <span class="pill ${m.status==='minutes-ready'?'pg':'pa'}">${m.status==='minutes-ready'?'Minutes Ready':'Scheduled'}</span>
    ${m.status==='minutes-ready'?`<i class="ti ti-file-text act" onclick="T('Opening minutes for ${m.title}','')"></i>`:''}
   </div>`).join('')}
  </div>
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-shield-check"></i>Policies & Compliance Records</div></div>
  <div class="g3">
   ${[['Code of Conduct','Reviewed May 2025','pg'],['Admission Policy','Reviewed Mar 2025','pg'],['Finance Policy','Review due Sep 2025','pa'],['Language Policy','Reviewed Jan 2025','pg']].map(([p,d,c])=>`<div class="sc" style="cursor:pointer" onclick="T('Viewing ${p}','')"><div style="font-weight:600;font-size:12px;margin-bottom:4px">${p}</div><div class="tsm" style="margin-bottom:6px">${d}</div><span class="pill ${c}">${c==='pg'?'Current':'Review Due'}</span></div>`).join('')}
  </div>
 </div>`;
}

// ─── SECURITY & COMPLIANCE ───
function rCompliance(area){
 area.innerHTML=`
 <div class="g4 mb18">
  <div class="sc"><div class="sc-icon ig"><i class="ti ti-shield-check"></i></div><div class="sc-val">POPIA</div><div class="sc-lbl">Compliance status</div><div class="sc-trend tu"><i class="ti ti-circle-check" style="font-size:10px"></i>Compliant</div></div>
  <div class="sc"><div class="sc-icon ib"><i class="ti ti-database"></i></div><div class="sc-val">Today</div><div class="sc-lbl">Last automated backup</div></div>
  <div class="sc"><div class="sc-icon ia"><i class="ti ti-lock"></i></div><div class="sc-val">AES-256</div><div class="sc-lbl">Data encryption</div></div>
  <div class="sc"><div class="sc-icon ip"><i class="ti ti-key"></i></div><div class="sc-val">Off</div><div class="sc-lbl">Two-factor auth</div></div>
 </div>
 <div class="g2 mb18">
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-shield-lock"></i>POPIA & Data Protection</div></div>
   ${[['Data encrypted at rest and in transit','All learner and staff records use AES-256 encryption',true],['Automated nightly backups','Backed up to redundant SA-based servers',true],['Right to access requests','Parents can request their data via portal',true],['Data retention policy','Records auto-archived after 7 years per SA law',true],['Two-factor authentication','Require OTP for admin accounts',false]].map(([l,d,on])=>`
   <div class="tog-row"><div><div style="font-size:12px;font-weight:500">${l}</div><div class="tsm">${d}</div></div><label class="tog-sw"><input type="checkbox" ${on?'checked':''} onchange="T('Setting updated','success')"><div class="t-tr"></div><div class="t-th"></div></label></div>`).join('')}
  </div>
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-history"></i>Audit Log</div><button class="btn btn-s" style="height:26px;font-size:10px" onclick="T('Audit log exported','success')"><i class="ti ti-download" style="font-size:10px"></i>Export</button></div>
   ${D.auditLog.map(l=>`<div style="padding:8px 0;border-bottom:1px solid var(--sp)"><div class="flex ic g8"><i class="ti ti-${l.user==='System'?'robot':'user'}" style="font-size:13px;color:var(--sl)"></i><div style="flex:1"><div style="font-size:11px;font-weight:600">${l.action}</div><div class="tsm">${l.user} · ${l.time}</div></div></div></div>`).join('')}
  </div>
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-database-export"></i>Backup & Recovery</div></div>
  <div style="background:var(--gp);border:1px solid var(--gl);border-radius:8px;padding:12px 16px;display:flex;align-items:center;gap:10px">
   <i class="ti ti-circle-check" style="font-size:20px;color:var(--g)"></i>
   <div style="flex:1"><div style="font-weight:600;font-size:12px;color:var(--g)">All systems backed up</div><div class="tsm">Last backup: Today 03:00 AM · Next: Tomorrow 03:00 AM</div></div>
   <button class="btn btn-g" onclick="T('Manual backup started — complete in ~2 minutes','success')"><i class="ti ti-refresh" style="font-size:11px"></i>Backup Now</button>
  </div>
 </div>`;
}

// ─── ENTERPRISE / MULTI-CAMPUS ───
function rEnterprise(area){
 area.innerHTML=`
 <div style="background:var(--pp);border:1px solid var(--p);border-radius:9px;padding:11px 15px;margin-bottom:16px;display:flex;align-items:center;gap:10px">
  <i class="ti ti-building-skyscraper" style="font-size:18px;color:var(--p)"></i>
  <div style="flex:1"><div style="font-weight:700;font-size:12px;color:var(--p)">Enterprise Multi-Campus Mode</div><div class="tsm">Central reporting and management across multiple campuses under one school group</div></div>
  <span class="phase-badge ph3">Phase 3 · Enterprise</span>
 </div>
 <div class="g2 mb18">
  <div class="sc"><div class="sc-icon ip"><i class="ti ti-building-skyscraper"></i></div><div class="sc-val">${D.campuses.length}</div><div class="sc-lbl">Campuses under this group</div></div>
  <div class="sc"><div class="sc-icon ig"><i class="ti ti-users"></i></div><div class="sc-val">${D.campuses.reduce((a,c)=>a+c.students,0)}</div><div class="sc-lbl">Total learners group-wide</div></div>
 </div>
 <div class="card mb18">
  <div class="card-head"><div class="card-title"><i class="ti ti-building"></i>Campuses</div><button class="btn btn-g" onclick="mAddCampus()"><i class="ti ti-plus" style="font-size:11px"></i>Add Campus</button></div>
  ${D.campuses.map(c=>`<div class="sa-card">
   <div class="av av-m" style="background:var(--pp);color:var(--p)"><i class="ti ti-building-skyscraper"></i></div>
   <div style="flex:1"><div style="font-weight:600;font-size:13px">${c.name}</div><div class="tsm">${c.principal} · ${c.type}</div></div>
   <div style="text-align:right;min-width:80px"><div style="font-weight:600">${c.students} students</div></div>
   <span class="pill pg">${c.status}</span>
   <div class="flex g6"><i class="ti ti-eye act" onclick="T('Viewing ${c.name} dashboard','')"></i><i class="ti ti-settings act" onclick="T('Managing campus','')"></i></div>
  </div>`).join('')}
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-api"></i>API & Integrations</div></div>
  <div class="g3">
   ${[['REST API Access','Full programmatic access to all data','pg'],['Single Sign-On (SSO)','Group-wide staff login','pa'],['Custom Branding','White-label per campus','pg']].map(([t,d,c])=>`<div class="sc" style="cursor:default"><div style="font-weight:600;font-size:12px;margin-bottom:4px">${t}</div><div class="tsm" style="margin-bottom:6px">${d}</div><span class="pill ${c}">${c==='pg'?'Enabled':'Available'}</span></div>`).join('')}
  </div>
 </div>`;
}

