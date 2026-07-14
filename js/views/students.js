function rStudents(area){
 area.innerHTML=`
 <div class="bulk-bar hidden" id="bulkBar">
  <span class="bc">0 selected</span>
  <button class="bbt" onclick="T(selRows.size+' WhatsApp reminders sent','wa')"><i class="ti ti-brand-whatsapp" style="font-size:12px"></i>WhatsApp Reminder</button>
  <button class="bbt" onclick="mGenReports()"><i class="ti ti-certificate" style="font-size:12px"></i>Generate Report Cards</button>
  <button class="bbt" onclick="T(selRows.size+' records exported','success')"><i class="ti ti-download" style="font-size:12px"></i>Export</button>
  <button class="bbt" onclick="T('Attendance marked for '+selRows.size+' students','success')"><i class="ti ti-calendar-check" style="font-size:12px"></i>Mark Attendance</button>
  <button class="bbt danger" onclick="T(selRows.size+' students removed','error');selRows=new Set();updBulk()"><i class="ti ti-trash" style="font-size:12px"></i>Delete</button>
 </div>
 <div class="card">
  <div class="fbar">
   <div style="background:#fff;border:1px solid var(--sb);border-radius:7px;padding:0 9px;height:30px;display:flex;align-items:center;gap:6px;min-width:200px"><i class="ti ti-search" style="font-size:12px;color:var(--sx)"></i><input type="text" placeholder="Search students..." style="border:none;background:transparent;font-size:12px;color:var(--s);outline:none;width:100%" oninput="filtStu(this.value)"></div>
   <div class="chip active" onclick="filtStuCls('',this)">All</div>
   ${[...new Set(D.students.map(s=>s.cls))].map(c=>`<div class="chip" onclick="filtStuCls('${c}',this)">${c}</div>`).join('')}
   <div class="chip" onclick="filtStuCls('at-risk',this)" style="border-color:var(--r);color:var(--r)">At Risk</div>
   <div style="margin-left:auto;display:flex;gap:7px">
    <button class="btn btn-s" onclick="T('CSV exported','success')"><i class="ti ti-download" style="font-size:11px"></i>Export</button>
    <button class="btn btn-s" onclick="mImportCSV()"><i class="ti ti-upload" style="font-size:11px"></i>Import CSV</button>
    <button class="btn btn-g" onclick="mAddStu()"><i class="ti ti-user-plus" style="font-size:11px"></i>Add Student</button>
   </div>
  </div>
  <div class="tw-wrap"><table class="dt" id="stuT">
   <thead><tr><th class="cc"><input type="checkbox" class="rc" onchange="togAll(this,'stuT')"></th><th>Student</th><th>ID</th><th>Class</th><th>Avg</th><th>Attendance</th><th>Balance</th><th>Status</th><th>Actions</th></tr></thead>
   <tbody id="stuB"></tbody>
  </table></div>
 </div>`;
 rstStu(D.students);
}

function rstStu(list){
 const tb=document.getElementById('stuB');if(!tb)return;
 tb.innerHTML=list.map(s=>`<tr>
  <td><input type="checkbox" class="rc" data-id="${s.id}" onchange="togRow(this,'${s.id}')"></td>
  <td><div class="flex ic g8"><div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div><div><div style="font-weight:600">${s.name}</div><div class="tsm">${s.gender}</div></div></div></td>
  <td class="mono">${s.id}</td><td>${s.cls}</td>
  <td>${s.avg}% <span class="pill ${gc(s.grade)}">${s.grade}</span></td>
  <td><div class="flex ic g6"><div class="pw-bar" style="width:46px"><div class="pb-bar" style="width:${s.att}%;background:${s.att<80?'var(--r)':s.att<90?'var(--a)':'var(--g)'}"></div></div><span style="font-size:11px;color:${s.att<80?'var(--r)':'var(--sl)'}">${s.att}%</span></div></td>
  <td style="color:${s.balance>0?'var(--r)':'var(--sl)'};font-weight:${s.balance>0?600:400}">${s.balance>0?fmt(s.balance):'Settled'}</td>
  <td><span class="pill ${sc(s.status)}">${sl(s.status)}</span></td>
  <td><div class="flex g6">
   <i class="ti ti-eye act" onclick='openSP(${JSON.stringify(s).replace(/"/g,"'")})'></i>
   <i class="ti ti-brand-whatsapp act" style="color:var(--wd)" onclick="T('WhatsApp to ${s.parent}','wa')"></i>
   <i class="ti ti-edit act" onclick="T('Editing ${s.name}','')"></i>
   <i class="ti ti-trash act" style="color:var(--r)" onclick="T('Removed','error')"></i>
  </div></td>
 </tr>`).join('');
}
function filtStu(q){rstStu(D.students.filter(s=>s.name.toLowerCase().includes(q.toLowerCase())||s.id.toLowerCase().includes(q.toLowerCase())));}
function filtStuCls(cls,el){el.closest('.fbar').querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));el.classList.add('active');rstStu(cls==='at-risk'?D.students.filter(s=>s.att<80||s.grade==='F'):cls?D.students.filter(s=>s.cls===cls):D.students);}

function openSP(s){
 OM(`${s.name} — Profile`,`
  <div style="background:var(--g);border-radius:9px;padding:14px 16px;margin-bottom:16px;display:flex;align-items:center;gap:12px">
   <div class="av av-xl" style="background:${s.bg};color:${s.fg}">${s.ini}</div>
   <div style="flex:1">
    <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:17px;color:#fff">${s.name}</div>
    <div style="font-size:11px;color:rgba(255,255,255,.5);margin-top:2px">${s.id} · ${s.cls}</div>
    <div style="margin-top:7px;display:flex;gap:5px;flex-wrap:wrap">
     <span class="pill ${sc(s.status)}">${sl(s.status)}</span>
     <span class="pill ${gc(s.grade)}">Grade ${s.grade} · ${s.avg}%</span>
     <span class="pill" style="background:${s.att<80?'var(--rp)':'var(--gp)'};color:${s.att<80?'var(--r)':'var(--g)'}">${s.att}% att</span>
    </div>
   </div>
  </div>
  <div class="tab-bar"><div class="tab active" onclick="sTab(this,'sp1')">Personal</div><div class="tab" onclick="sTab(this,'sp2')">Academic</div><div class="tab" onclick="sTab(this,'sp3')">Finance</div><div class="tab" onclick="sTab(this,'sp4')">Medical</div></div>
  <div id="sp1">
   <div class="fr3 mb14"><div><div class="tsm fw6">DOB</div><div style="font-size:13px;margin-top:2px">${s.dob}</div></div><div><div class="tsm fw6">Gender</div><div style="font-size:13px;margin-top:2px">${s.gender}</div></div><div><div class="tsm fw6">Class</div><div style="font-size:13px;margin-top:2px">${s.cls}</div></div></div>
   <div class="divider"></div>
   <div style="font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.4px;color:var(--sl);margin-bottom:9px">Parent / Guardian</div>
   <div class="fr3"><div><div class="tsm fw6">Name</div><div style="font-size:12px;margin-top:2px">${s.parent}</div></div><div><div class="tsm fw6">Phone</div><div style="font-size:12px;margin-top:2px">${s.phone}</div></div><div><div class="tsm fw6">Email</div><div style="font-size:12px;margin-top:2px">${s.email}</div></div></div>
   <div style="margin-top:10px"><div class="tsm fw6">Address</div><div style="font-size:12px;margin-top:2px">${s.addr}</div></div>
  </div>
  <div id="sp2" class="hidden">
   <div class="fr3 mb14">
    <div class="sc" style="cursor:default;text-align:center"><div class="sc-val">${s.t1}%</div><div class="sc-lbl">Term 1</div></div>
    <div class="sc" style="cursor:default;text-align:center"><div class="sc-val">${s.t2}%</div><div class="sc-lbl">Term 2</div></div>
    <div class="sc" style="cursor:default;text-align:center"><div class="sc-val">${s.t3}%</div><div class="sc-lbl">Term 3</div></div>
   </div>
   ${SUBS.slice(0,6).map(sub=>{const m=Math.max(30,Math.min(100,Math.floor(s.avg+(Math.random()*20-10))));const g=m>=80?'A':m>=70?'B':m>=60?'C':m>=50?'D':'F';return`<div class="flex ic g8" style="margin-bottom:7px"><span style="width:120px;font-size:11px">${sub}</span><div class="pw-bar" style="flex:1"><div class="pb-bar" style="width:${m}%;background:${m<50?'var(--r)':m<60?'var(--a)':'var(--g)'}"></div></div><span style="font-size:11px;font-weight:600;width:32px;text-align:right">${m}%</span><span class="pill ${gc(g)}">${g}</span></div>`;}).join('')}
  </div>
  <div id="sp3" class="hidden">
   <div class="fr3 mb14">
    <div class="sc" style="cursor:default"><div class="sc-val">R2,500</div><div class="sc-lbl">Billed</div></div>
    <div class="sc" style="cursor:default"><div class="sc-val" style="color:var(--g)">${fmt(2500-s.balance)}</div><div class="sc-lbl">Paid</div></div>
    <div class="sc" style="cursor:default"><div class="sc-val" style="color:${s.balance>0?'var(--r)':'var(--g)'}">${s.balance>0?fmt(s.balance):'R0'}</div><div class="sc-lbl">Balance</div></div>
   </div>
   ${s.balance>0?`<div class="pay-btn" style="display:inline-flex;padding:8px 13px;font-size:12px;border-radius:7px;margin-bottom:10px" onclick="T('PayFast link sent to ${s.parent} for ${fmt(s.balance)}','success')"><i class="ti ti-link" style="font-size:13px"></i>Send PayFast Link — ${fmt(s.balance)}</div>
   <div style="background:var(--rp);border:1px solid var(--r);border-radius:7px;padding:10px 13px;font-size:12px;color:var(--rm)"><i class="ti ti-alert-triangle" style="margin-right:5px"></i>Outstanding balance of ${fmt(s.balance)}. Reminder sent 3 days ago.</div>`:`<div style="background:var(--gp);border:1px solid var(--gl);border-radius:7px;padding:10px 13px;font-size:12px;color:var(--g)"><i class="ti ti-circle-check" style="margin-right:5px"></i>All fees settled for Term 3 2025.</div>`}
  </div>
  <div id="sp4" class="hidden">
   <div class="fr mb14">
    <div class="sc" style="cursor:default"><div class="tsm fw6" style="margin-bottom:5px">Medical Condition</div><div style="font-size:13px">${s.medical}</div></div>
    <div class="sc" style="cursor:default"><div class="tsm fw6" style="margin-bottom:5px">Blood Type</div><div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:22px;color:var(--r)">${s.blood}</div></div>
   </div>
   <div style="background:var(--rp);border:1px solid var(--r);border-radius:7px;padding:10px 13px;font-size:12px;color:var(--rm)"><i class="ti ti-ambulance" style="margin-right:5px"></i><strong>Emergency:</strong> ${s.phone} (${s.parent})</div>
  </div>`,
  `<button class="btn btn-s" onclick="CM()">Close</button><button class="btn btn-w" onclick="T('WhatsApp opened with ${s.parent}','wa');CM()"><i class="ti ti-brand-whatsapp" style="font-size:11px"></i>WhatsApp Parent</button><button class="btn btn-g" onclick="T('Editing ${s.name}','');CM()"><i class="ti ti-edit" style="font-size:11px"></i>Edit</button>`,'620px');
}
function sTab(el,id){el.closest('.tab-bar').querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');['sp1','sp2','sp3','sp4'].forEach(x=>{const e=document.getElementById(x);if(e)e.classList.toggle('hidden',x!==id);});}

function rAdmissions(area){
 area.innerHTML=`
 <div style="background:var(--gp);border:1px solid var(--gl);border-radius:9px;padding:11px 15px;margin-bottom:16px;display:flex;align-items:center;gap:10px">
  <i class="ti ti-link" style="font-size:18px;color:var(--g)"></i>
  <div style="flex:1"><div style="font-weight:700;font-size:12px;color:var(--g)">Public Application Link Active</div><div class="tsm">apply.durbanprimary.lwaziconnect.co.za — parents can apply from their phone</div></div>
  <button class="btn btn-g" onclick="openPublicForm()"><i class="ti ti-eye" style="font-size:11px"></i>Preview Form</button>
  <button class="btn btn-s" onclick="T('Link copied!','success')"><i class="ti ti-copy" style="font-size:11px"></i>Copy Link</button>
 </div>
 <div class="g3 mb18">
  <div class="sc"><div class="sc-icon ia"><i class="ti ti-clipboard"></i></div><div class="sc-val">3</div><div class="sc-lbl">Pending Applications</div></div>
  <div class="sc"><div class="sc-icon ig"><i class="ti ti-circle-check"></i></div><div class="sc-val">12</div><div class="sc-lbl">Approved this term</div></div>
  <div class="sc"><div class="sc-icon ib"><i class="ti ti-calendar"></i></div><div class="sc-val">2026</div><div class="sc-lbl">Next intake year</div></div>
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-clipboard-list"></i>Applications</div><button class="btn btn-g" onclick="mAddAdmission()"><i class="ti ti-plus" style="font-size:11px"></i>New Application</button></div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>App ID</th><th>Applicant</th><th>Grade</th><th>Parent</th><th>Phone</th><th>Documents</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead><tbody>
  ${D.admissions.map(a=>`<tr>
   <td class="mono">${a.id}</td><td style="font-weight:600">${a.name}</td><td>${a.grade}</td><td>${a.parent}</td><td>${a.phone}</td>
   <td>${a.status==='approved'?'<span class="pill pg"><i class="ti ti-check"></i> Complete</span>':'<span class="pill pa"><i class="ti ti-clock"></i> Awaiting</span>'}</td>
   <td>${a.date}</td><td><span class="pill ${sc(a.status)}">${sl(a.status)}</span></td>
   <td><div class="flex g6"><i class="ti ti-eye act" onclick="T('Viewing ${a.id}','')"></i>
    ${a.status==='pending'?`<button class="btn btn-g" style="height:24px;font-size:10px;padding:0 7px" onclick="appApprove('${a.id}',this)"><i class="ti ti-check" style="font-size:10px"></i>Approve</button><button class="btn btn-r" style="height:24px;font-size:10px;padding:0 7px" onclick="T('Rejected','error')">Reject</button>`:''}
   </div></td>
  </tr>`).join('')}
  </tbody></table></div>
 </div>`;
}
function appApprove(id,btn){
 const row=btn.closest('tr');
 row.querySelector('.pill').textContent='Approved';row.querySelector('.pill').className='pill pg';
 btn.closest('div').innerHTML='<span class="tsm" style="color:var(--g)"><i class="ti ti-circle-check"></i> Approved</span>';
 T(`${id} approved — student record created. WhatsApp sent to parent.`,'wa');
}
function openPublicForm(){
 OM('Online Application Form Preview',`
  <div style="background:var(--g);border-radius:9px;padding:18px;text-align:center;margin-bottom:14px">
   <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:17px;color:#fff">Durban Primary School</div>
   <div style="font-size:10px;color:rgba(255,255,255,.45);margin-top:2px">Online Admission Application 2026</div>
  </div>
  <div class="tsm" style="text-align:center;margin-bottom:14px;color:var(--ad)">This is what parents see on their phone when they click the application link</div>
  <div class="fr"><div class="fg"><div class="fl">Applicant First Name</div><input class="fi" placeholder="e.g. Lesedi"></div><div class="fg"><div class="fl">Last Name</div><input class="fi" placeholder="e.g. Khumalo"></div></div>
  <div class="fr"><div class="fg"><div class="fl">Date of Birth</div><input class="fi" type="date"></div><div class="fg"><div class="fl">Grade Applying For</div><select class="fs">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div></div>
  <div class="fr"><div class="fg"><div class="fl">Parent / Guardian</div><input class="fi" placeholder="Full name"></div><div class="fg"><div class="fl">Phone</div><input class="fi" placeholder="071 xxx xxxx"></div></div>
  <div style="margin:12px 0 8px;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.4px;color:var(--sl)">Upload Documents</div>
  ${[["Child's Birth Certificate",'Required'],["Parent's ID",'Required'],['Previous School Report','Optional'],['Proof of Address','Required']].map(([doc,req])=>`
  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--sp)">
   <div><div style="font-size:12px;font-weight:500">${doc}</div><div class="tsm" style="color:${req==='Required'?'var(--r)':'var(--sl)'}">${req}</div></div>
   <button class="btn btn-s" style="height:26px;font-size:10px" onclick="T('File uploaded','success')"><i class="ti ti-upload" style="font-size:10px"></i>Upload</button>
  </div>`).join('')}`,
  `<button class="btn btn-s" onclick="CM()">Close Preview</button><button class="btn btn-g" onclick="T('Application submitted — APP-004 created','success');CM()"><i class="ti ti-send" style="font-size:11px"></i>Submit Application</button>`,'540px');
}

function rParents(area){
 area.innerHTML=`<div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-heart-handshake"></i>Parent Directory</div>
   <div class="flex g8">
    <button class="btn btn-w" onclick="T('WhatsApp broadcast sent to all parents','wa')"><i class="ti ti-brand-whatsapp" style="font-size:11px"></i>Broadcast All</button>
    <button class="btn btn-g" onclick="mAddParent()"><i class="ti ti-user-plus" style="font-size:11px"></i>Add Parent</button>
   </div>
  </div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th class="cc"><input type="checkbox" class="rc" onchange="togAll(this,'parT')"></th><th>Parent</th><th>Children</th><th>Phone</th><th>Portal</th><th>Status</th><th>Actions</th></tr></thead><tbody>
  ${D.parents.map(p=>`<tr>
   <td><input type="checkbox" class="rc" data-id="${p.name}" onchange="togRow(this,'${p.name}')"></td>
   <td><div class="flex ic g8"><div class="av av-s" style="background:${p.bg};color:${p.fg}">${p.ini}</div><span style="font-weight:600">${p.name}</span></div></td>
   <td>${p.children.map(c=>`<span class="pill pg">${c}</span>`).join(' ')}</td>
   <td>${p.phone}</td>
   <td>${p.portal?'<span class="pill pg"><i class="ti ti-check"></i> Active</span>':`<button class="btn btn-s" style="height:22px;font-size:10px;padding:0 7px" onclick="T('Portal invite sent via WhatsApp','wa')">Invite</button>`}</td>
   <td><span class="pill ${sc(p.status)}">${sl(p.status)}</span></td>
   <td><div class="flex g6"><i class="ti ti-brand-whatsapp act" style="color:var(--wd)" onclick="T('WhatsApp to ${p.name}','wa')"></i><i class="ti ti-edit act" onclick="T('Editing ${p.name}','')"></i></div></td>
  </tr>`).join('')}
  </tbody></table></div>
 </div>`;
}

