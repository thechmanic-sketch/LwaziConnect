function rCalendar(area){
 const tyClr={academic:'ev-ac',event:'ev-ev',exam:'ev-ex',holiday:'ev-hol'};
 area.innerHTML=`<div class="g2 mb18">
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-calendar-event"></i>July 2025</div><div class="flex g6"><div class="ibt" onclick="T('Previous month','')"><i class="ti ti-chevron-left" style="font-size:13px"></i></div><div class="ibt" onclick="T('Next month','')"><i class="ti ti-chevron-right" style="font-size:13px"></i></div></div></div>
   <div class="cal-grid mb14">${['M','T','W','T','F','S','S'].map(d=>`<div class="cal-head">${d}</div>`).join('')}
   ${Array.from({length:31},(_,i)=>{const day=i+1;const evts=D.calEvents.filter(e=>parseInt(e.date.split('-')[2])===day);return`<div class="cal-cell${day===17?' today':''}"><div class="cal-num">${day}</div>${evts.map(e=>`<div class="cal-ev ${tyClr[e.type]||''}">${e.title}</div>`).join('')}</div>`;}).join('')}
   </div>
  </div>
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-list"></i>Upcoming Events</div>${(CU_ROLE==='parent'||CU_ROLE==='student')?'':'<button class="btn btn-g" onclick="mAddEvent()"><i class="ti ti-plus" style="font-size:11px"></i>Add Event</button>'}</div>
   ${D.calEvents.map(e=>{return`<div style="display:flex;align-items:flex-start;gap:9px;padding:9px 0;border-bottom:1px solid var(--sp)">
    <div style="background:var(--g);color:#fff;border-radius:7px;padding:5px 7px;text-align:center;flex-shrink:0;min-width:38px"><div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:14px;line-height:1">${e.date.split('-')[2]}</div><div style="font-size:7px;opacity:.6">Jul</div></div>
    <div style="flex:1"><div style="font-weight:600;font-size:12px">${e.title}</div><div class="tsm">${e.cls}</div></div>
    <span class="pill ${tyClr[e.type]?.replace('ev-','p')||'pn'}">${e.type}</span>
   </div>`;}).join('')}
  </div>
 </div>`;
}

function rHealth(area){
 area.innerHTML=`
 <div style="background:var(--rp);border:1px solid var(--r);border-radius:9px;padding:11px 14px;margin-bottom:14px;display:flex;align-items:center;gap:9px"><i class="ti ti-shield-lock" style="font-size:18px;color:var(--r)"></i><div><div style="font-weight:700;font-size:12px;color:var(--rm)">Confidential — Medical Records</div><div class="tsm">Visible to Admin and authorised staff only.</div></div></div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-first-aid-kit"></i>Health Records</div><button class="btn btn-g" onclick="mAddHealth()"><i class="ti ti-plus" style="font-size:11px"></i>Add Record</button></div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Student</th><th>Condition</th><th>Allergy</th><th>Blood Type</th><th>Medical Aid</th><th>Emergency Contact</th><th>Actions</th></tr></thead><tbody>
  ${D.health.map(h=>`<tr>
   <td style="font-weight:600">${h.student}</td>
   <td>${h.condition!=='None'?`<span class="pill pa">${h.condition}</span>`:'<span class="tsm">None</span>'}</td>
   <td>${h.allergy!=='None'?`<span class="pill pr">${h.allergy}</span>`:'<span class="tsm">None</span>'}</td>
   <td><span style="font-family:'Outfit',sans-serif;font-weight:800;color:var(--r)">${h.blood}</span></td>
   <td>${h.aid}</td><td>${h.emergency}</td>
   <td><div class="flex g6"><i class="ti ti-eye act" onclick="T('Viewing health record','')"></i><i class="ti ti-edit act" onclick="T('Editing record','')"></i><i class="ti ti-ambulance act" style="color:var(--r)" onclick="T('Emergency contact: ${h.emergency}','error')"></i></div></td>
  </tr>`).join('')}
  </tbody></table></div>
 </div>`;
}

function rDiscipline(area){
 area.innerHTML=`
 <div class="g3 mb18"><div class="sc"><div class="sc-icon ir"><i class="ti ti-gavel"></i></div><div class="sc-val">3</div><div class="sc-lbl">Incidents this term</div></div><div class="sc"><div class="sc-icon ia"><i class="ti ti-clock"></i></div><div class="sc-val">1</div><div class="sc-lbl">Open / unresolved</div></div><div class="sc"><div class="sc-icon ig"><i class="ti ti-circle-check"></i></div><div class="sc-val">2</div><div class="sc-lbl">Resolved</div></div></div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-gavel"></i>Incident Log</div><button class="btn btn-g" onclick="mLogInc()"><i class="ti ti-plus" style="font-size:11px"></i>Log Incident</button></div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>ID</th><th>Student</th><th>Type</th><th>Description</th><th>Date</th><th>Reported by</th><th>Action</th><th>Status</th><th></th></tr></thead><tbody>
  ${D.discipline.map(d=>`<tr>
   <td class="mono">${d.id}</td><td style="font-weight:600">${d.student}</td>
   <td><span class="pill ${d.type==='Misconduct'?'pr':d.type==='Late'?'pa':'pb'}">${d.type}</span></td>
   <td style="max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${d.desc}</td>
   <td>${d.date}</td><td>${d.teacher}</td><td>${d.action}</td>
   <td><span class="pill ${sc(d.status)}">${sl(d.status)}</span></td>
   <td><div class="flex g6"><i class="ti ti-eye act" onclick="T('Viewing ${d.id}','')"></i><i class="ti ti-brand-whatsapp act" style="color:var(--wd)" onclick="T('WhatsApp sent to parent','wa')"></i></div></td>
  </tr>`).join('')}
  </tbody></table></div>
 </div>`;
}

function rAnalytics(area){
 area.innerHTML=`
 <div class="tab-bar"><div class="tab active" onclick="anT(this,'an1')">Academic</div><div class="tab" onclick="anT(this,'an2')">Attendance</div><div class="tab" onclick="anT(this,'an3')">Finance</div><div class="tab" onclick="anT(this,'an4')">Overview</div></div>
 <div id="an1">
  <div class="g2 mb18">
   <div class="card"><div class="card-head"><div class="card-title"><i class="ti ti-chart-bar"></i>Avg Mark by Class</div><button class="btn btn-s" style="height:26px;font-size:10px" onclick="T('Exported','success')"><i class="ti ti-download" style="font-size:10px"></i>Export</button></div><div class="bar-chart" id="barAc"></div></div>
   <div class="card"><div class="card-head"><div class="card-title"><i class="ti ti-chart-pie"></i>Grade Distribution</div></div>
    ${[['A','80–100',D.students.filter(s=>s.grade==='A').length,'#1B4332'],['B','70–79',D.students.filter(s=>s.grade==='B').length,'#1D6FA4'],['C','60–69',D.students.filter(s=>s.grade==='C').length,'#E9A825'],['F','0–49',D.students.filter(s=>s.grade==='F').length,'#DC2626']].map(([g,r,c,col])=>`<div class="flex ic g8" style="margin-bottom:8px"><span class="pill" style="background:${col}22;color:${col};width:26px;justify-content:center;font-size:10px">${g}</span><span class="tsm" style="width:52px">${r}%</span><div class="pw-bar" style="flex:1"><div class="pb-bar" style="width:${Math.round(c/D.students.length*100)}%;background:${col}"></div></div><span style="font-size:12px;font-weight:700;width:18px">${c}</span></div>`).join('')}
   </div>
  </div>
  <div class="card"><div class="card-head"><div class="card-title"><i class="ti ti-trending-up"></i>Term-on-Term Progress</div></div>
   <div class="tw-wrap"><table class="dt"><thead><tr><th>Student</th><th>Class</th><th>Term 1</th><th>Term 2</th><th>Term 3</th><th>Trend</th><th>Grade</th></tr></thead><tbody>
   ${D.students.map(s=>{const trend=s.t3-s.t1;return`<tr><td><div class="flex ic g8"><div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div>${s.name}</div></td><td>${s.cls}</td><td>${s.t1}%</td><td>${s.t2}%</td><td style="font-weight:700">${s.t3}%</td><td><span style="color:${trend>0?'var(--g)':trend<0?'var(--r)':'var(--sl)'};font-weight:600"><i class="ti ti-trending-${trend>0?'up':trend<0?'down':'right'}" style="font-size:11px;margin-right:2px"></i>${trend>0?'+':''}${trend}%</span></td><td><span class="pill ${gc(s.grade)}">${s.grade}</span></td></tr>`;}).join('')}
   </tbody></table></div>
  </div>
 </div>
 <div id="an2" class="hidden"><div class="g4 mb18">${D.classes.map((c,i)=>`<div class="sc"><div class="sc-val">${[94,90,91,85,97,85][i]}%</div><div class="sc-lbl">${c.name}</div><div class="pw-bar" style="margin-top:5px"><div class="pb-bar" style="width:${[94,90,91,85,97,85][i]}%;background:${[94,90,91,85,97,85][i]>=90?'var(--g)':'var(--a)'}"></div></div></div>`).join('')}</div>
  <div class="card"><div class="card-head"><div class="card-title"><i class="ti ti-calendar-stats"></i>Monthly Trend</div><div style="font-size:11px;color:var(--r);display:flex;align-items:center;gap:4px"><i class="ti ti-target"></i>Target: 95%</div></div><div class="bar-chart" id="barAt"></div></div>
 </div>
 <div id="an3" class="hidden"><div class="g3 mb18"><div class="sc"><div class="sc-val">R176,000</div><div class="sc-lbl">Total billed</div></div><div class="sc"><div class="sc-val">R112,500</div><div class="sc-lbl">Collected</div></div><div class="sc"><div class="sc-val" style="color:var(--r)">R37,000</div><div class="sc-lbl">Outstanding</div></div></div>
  <div class="card"><div class="card-head"><div class="card-title"><i class="ti ti-chart-bar"></i>Collections by Month</div></div><div class="bar-chart" id="barFi"></div></div>
 </div>
 <div id="an4" class="hidden"><div class="g4 mb18"><div class="sc"><div class="sc-val">624</div><div class="sc-lbl">Students</div><div class="sc-trend tu"><i class="ti ti-trending-up" style="font-size:10px"></i>+8% YoY</div></div><div class="sc"><div class="sc-val">28</div><div class="sc-lbl">Staff</div></div><div class="sc"><div class="sc-val">91%</div><div class="sc-lbl">Attendance avg</div></div><div class="sc"><div class="sc-val" style="color:var(--wd)">2,847</div><div class="sc-lbl">WhatsApp msgs/mo</div></div></div>
  <div class="card"><div class="card-head"><div class="card-title"><i class="ti ti-chart-line"></i>Enrolment Growth</div></div><div class="bar-chart" id="barGr"></div></div>
 </div>`;
 setTimeout(()=>{bldBar('barAc',['Gr7A','Gr7B','Gr6A','Gr6B','Gr5A','Gr5B'],[82,78,73,64,86,79],100,'#1B4332');},60);
}
function anT(el,id){
 el.closest('.tab-bar').querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');
 ['an1','an2','an3','an4'].forEach(x=>{const e=document.getElementById(x);if(e)e.classList.toggle('hidden',x!==id);});
 setTimeout(()=>{
  if(id==='an2')bldBar('barAt',['Jan','Feb','Mar','Apr','May','Jun','Jul'],[93,91,88,94,90,92,91],100,'#1D6FA4');
  if(id==='an3')bldBar('barFi',['Jan','Feb','Mar','Apr','May','Jun','Jul'],[15000,18000,22000,19000,25000,28000,22000],30000,'#E9A825',true);
  if(id==='an4')bldBar('barGr',['2019','2020','2021','2022','2023','2024','2025'],[480,495,510,540,570,598,624],700,'#52B788');
 },60);
}

