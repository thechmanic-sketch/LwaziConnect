// ─── HOMEWORK ───
function rHomework(area){
 area.innerHTML=`
 <div class="g4 mb18">
  <div class="sc"><div class="sc-icon ig"><i class="ti ti-notebook"></i></div><div class="sc-val">${D.homework.length}</div><div class="sc-lbl">Active assignments</div></div>
  <div class="sc"><div class="sc-icon ir"><i class="ti ti-alert-circle"></i></div><div class="sc-val">${D.homework.filter(h=>h.status==='overdue').length}</div><div class="sc-lbl">Overdue</div></div>
  <div class="sc"><div class="sc-icon ib"><i class="ti ti-chart-bar"></i></div><div class="sc-val">${Math.round(D.homework.reduce((a,h)=>a+h.completion,0)/D.homework.length)}%</div><div class="sc-lbl">Avg completion rate</div></div>
  <div class="sc"><div class="sc-icon iw"><i class="ti ti-brand-whatsapp"></i></div><div class="sc-val">312</div><div class="sc-lbl">Parents reminded today</div></div>
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-notebook"></i>Homework & Assignments</div><button class="btn btn-g" onclick="mSetHomework()"><i class="ti ti-plus" style="font-size:11px"></i>Set Homework</button></div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Assignment</th><th>Subject</th><th>Class</th><th>Teacher</th><th>Due Date</th><th>Completion</th><th>Status</th><th>Actions</th></tr></thead><tbody>
  ${D.homework.map(h=>`<tr>
   <td style="font-weight:600">${h.title}</td><td>${h.subject}</td><td>${h.cls}</td><td>${h.teacher}</td><td>${h.due}</td>
   <td><div class="flex ic g6"><div class="pw-bar" style="width:60px"><div class="pb-bar" style="width:${h.completion}%;background:${h.completion<60?'var(--r)':h.completion<80?'var(--a)':'var(--g)'}"></div></div><span style="font-size:11px">${h.completion}%</span></div></td>
   <td><span class="pill ${h.status==='overdue'?'pr':'pg'}">${h.status==='overdue'?'Overdue':'Active'}</span></td>
   <td><div class="flex g6"><i class="ti ti-eye act" onclick="T('Viewing submissions for ${h.title}','')"></i><i class="ti ti-brand-whatsapp act" style="color:var(--wd)" onclick="T('Reminder sent to parents of incomplete learners','wa')"></i></div></td>
  </tr>`).join('')}
  </tbody></table></div>
 </div>`;
}

// ─── COMMUNICATION CENTRE ───
function rCommsCentre(area){
 
 area.innerHTML=`
 <div class="g4 mb18">
  <div class="sc"><div class="sc-icon iw"><i class="ti ti-brand-whatsapp"></i></div><div class="sc-val">2,847</div><div class="sc-lbl">WhatsApp sent</div></div>
  <div class="sc"><div class="sc-icon ib"><i class="ti ti-mail"></i></div><div class="sc-val">1,204</div><div class="sc-lbl">Emails sent</div></div>
  <div class="sc"><div class="sc-icon ia"><i class="ti ti-message"></i></div><div class="sc-val">186</div><div class="sc-lbl">SMS sent</div></div>
  <div class="sc"><div class="sc-icon ip"><i class="ti ti-bell-ringing"></i></div><div class="sc-val">3,902</div><div class="sc-lbl">Push notifications</div></div>
 </div>
 <div class="card mb18">
  <div class="card-head"><div class="card-title"><i class="ti ti-bolt"></i>Automation Rules</div><span class="phase-badge ph1">Phase 1</span></div>
  ${[['Learner marked absent','Sends WhatsApp to parent within 5 minutes','WhatsApp',true],['Fee 3 days overdue','Sends automated reminder with PayFast link','WhatsApp + Email',true],['Report card published','Notifies parent it is ready to view','WhatsApp + Push',true],['Homework due tomorrow','Reminds parent and learner','Push',true],['SGB meeting scheduled','Notifies all SGB members','Email + SMS',false]].map(([t,d,ch,on])=>`
  <div class="tog-row"><div><div style="font-size:12px;font-weight:500">${t}</div><div class="tsm">${d} · <span style="color:var(--g)">${ch}</span></div></div><label class="tog-sw"><input type="checkbox" ${on?'checked':''} onchange="T('Automation updated','success')"><div class="t-tr"></div><div class="t-th"></div></label></div>`).join('')}
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-broadcast"></i>Send New Broadcast</div></div>
  <div class="fr"><div class="fg"><div class="fl">Channel</div><select class="fs"><option>WhatsApp</option><option>Email</option><option>SMS</option><option>Push Notification</option><option>All Channels</option></select></div><div class="fg"><div class="fl">Audience</div><select class="fs"><option>All Parents</option><option>All Staff</option><option>Fee Defaulters</option>${D.classes.map(c=>`<option>${c.name} Parents</option>`).join('')}</select></div></div>
  <div class="fg"><div class="fl">Message</div><textarea class="fta" placeholder="Type your broadcast message..."></textarea></div>
  <button class="btn btn-w" onclick="T('Broadcast sent across selected channel(s)','wa')"><i class="ti ti-send" style="font-size:11px"></i>Send Broadcast</button>
 </div>`;
}

// ─── HR & STAFF ───
function rHR(area){
 
 area.innerHTML=`
 <div class="g4 mb18">
  <div class="sc"><div class="sc-icon ig"><i class="ti ti-users"></i></div><div class="sc-val">${D.staff.length}</div><div class="sc-lbl">Total staff</div></div>
  <div class="sc"><div class="sc-icon ia"><i class="ti ti-calendar-off"></i></div><div class="sc-val">${D.staff.filter(s=>s.status==='on-leave').length}</div><div class="sc-lbl">On leave</div></div>
  <div class="sc"><div class="sc-icon ib"><i class="ti ti-file-certificate"></i></div><div class="sc-val">${D.staff.filter(s=>s.contract==='Permanent').length}</div><div class="sc-lbl">Permanent contracts</div></div>
  <div class="sc"><div class="sc-icon ip"><i class="ti ti-currency-dollar"></i></div><div class="sc-val">R412,000</div><div class="sc-lbl">Monthly payroll</div></div>
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-id-badge-2"></i>Staff Directory</div><button class="btn btn-g" onclick="mAddStaff()"><i class="ti ti-user-plus" style="font-size:11px"></i>Add Staff Member</button></div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Staff Member</th><th>Role</th><th>Department</th><th>Contract</th><th>Start Date</th><th>Leave Balance</th><th>Status</th><th>Actions</th></tr></thead><tbody>
  ${D.staff.map(s=>`<tr>
   <td style="font-weight:600">${s.name}</td><td>${s.role}</td><td><span class="pill pn">${s.dept}</span></td><td>${s.contract}</td><td>${s.startDate}</td>
   <td>${s.leaveBalance} days</td>
   <td><span class="pill ${sc(s.status)}">${sl(s.status)}</span></td>
   <td><div class="flex g6"><i class="ti ti-eye act" onclick="T('Viewing ${s.name} HR profile','')"></i><i class="ti ti-file-text act" onclick="T('Viewing contract','')"></i><i class="ti ti-calendar-off act" onclick="T('Leave request form opened','')"></i></div></td>
  </tr>`).join('')}
  </tbody></table></div>
 </div>`;
}

// ─── TRANSPORT ───
function rTransport(area){
 area.innerHTML=`
 <div class="g3 mb18">
  <div class="sc"><div class="sc-icon ig"><i class="ti ti-bus"></i></div><div class="sc-val">${D.vehicles.length}</div><div class="sc-lbl">Vehicles in fleet</div></div>
  <div class="sc"><div class="sc-icon ib"><i class="ti ti-route"></i></div><div class="sc-val">${D.vehicles.reduce((a,v)=>a+v.enrolled,0)}</div><div class="sc-lbl">Learners using transport</div></div>
  <div class="sc"><div class="sc-icon ia"><i class="ti ti-tool"></i></div><div class="sc-val">${D.vehicles.filter(v=>v.status==='maintenance').length}</div><div class="sc-lbl">In maintenance</div></div>
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-bus"></i>Fleet & Routes</div><span class="phase-badge ph3">Phase 3</span><button class="btn btn-g" onclick="mAddVehicle()"><i class="ti ti-plus" style="font-size:11px"></i>Add Vehicle</button></div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Vehicle</th><th>Registration</th><th>Driver</th><th>Route</th><th>Capacity</th><th>Last Service</th><th>Status</th><th>Actions</th></tr></thead><tbody>
  ${D.vehicles.map(v=>`<tr>
   <td style="font-weight:600">${v.id}</td><td class="mono">${v.reg}</td><td>${v.driver}</td><td>${v.route}</td>
   <td><div class="flex ic g6"><div class="pw-bar" style="width:50px"><div class="pb-bar" style="width:${Math.round(v.enrolled/v.capacity*100)}%;background:${v.enrolled/v.capacity>0.9?'var(--a)':'var(--g)'}"></div></div><span style="font-size:11px">${v.enrolled}/${v.capacity}</span></div></td>
   <td>${v.lastService}</td>
   <td><span class="pill ${v.status==='active'?'pg':'pa'}">${v.status==='active'?'Active':'Maintenance'}</span></td>
   <td><div class="flex g6"><i class="ti ti-map act" onclick="T('Viewing live route map','')"></i><i class="ti ti-edit act" onclick="T('Editing vehicle','')"></i></div></td>
  </tr>`).join('')}
  </tbody></table></div>
 </div>`;
}

// ─── WEBSITE BUILDER ───
function rWebsite(area){
 area.innerHTML=`
 <div style="background:var(--bp);border:1px solid var(--b);border-radius:9px;padding:11px 15px;margin-bottom:16px;display:flex;align-items:center;gap:10px">
  <i class="ti ti-world" style="font-size:18px;color:var(--b)"></i>
  <div style="flex:1"><div style="font-weight:700;font-size:12px;color:var(--b)">Your school website is live</div><div class="tsm">durbanprimary.lwaziconnect.co.za</div></div>
  <span class="phase-badge ph2">Phase 2</span>
  <button class="btn btn-s" onclick="T('Opening live site preview','')"><i class="ti ti-external-link" style="font-size:11px"></i>View Live Site</button>
 </div>
 <div class="g2 mb18">
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-layout"></i>Page Builder</div></div>
   ${[['Home','Hero banner, welcome message, stats','published'],['About Us','School history, vision, mission','published'],['Admissions','Online application form embedded','published'],['News & Events','Auto-synced with School Calendar','published'],['Gallery','Photo albums by event','published'],['Contact','Map, contact form, hours','published']].map(([p,d,st])=>`
   <div class="flex ic g8" style="padding:9px 0;border-bottom:1px solid var(--sp)">
    <i class="ti ti-file-text" style="font-size:16px;color:var(--g)"></i>
    <div style="flex:1"><div style="font-size:12px;font-weight:600">${p}</div><div class="tsm">${d}</div></div>
    <span class="pill pg">Live</span>
    <i class="ti ti-edit act" onclick="T('Opening ${p} page editor','')"></i>
   </div>`).join('')}
  </div>
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-palette"></i>Branding</div></div>
   <div class="fg"><div class="fl">Primary Colour</div><div class="flex g8"><input class="fi" value="#1B4332" style="flex:1"><div style="width:34px;height:34px;background:#1B4332;border-radius:7px;border:1px solid var(--sb)"></div></div></div>
   <div class="fg"><div class="fl">School Logo</div><div class="drop-zone" style="padding:16px" onclick="T('Logo uploaded','success')"><i class="ti ti-upload" style="font-size:22px;color:var(--gl)"></i><div class="tsm" style="margin-top:5px">Click to upload logo</div></div></div>
   <div class="fg"><div class="fl">Domain</div><input class="fi" value="durbanprimary.lwaziconnect.co.za"></div>
   <button class="btn btn-g w100" style="justify-content:center" onclick="T('Website changes published live','success')"><i class="ti ti-world" style="font-size:11px"></i>Publish Changes</button>
  </div>
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-chart-bar"></i>Website Traffic — Last 30 Days</div></div>
  <div class="bar-chart" id="barWeb"></div>
 </div>`;
 setTimeout(()=>bldBar('barWeb',['Week 1','Week 2','Week 3','Week 4'],[420,510,680,590],700,'#1D6FA4'),60);
}

// ─── SGB GOVERNANCE ───
