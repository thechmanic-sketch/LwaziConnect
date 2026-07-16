function rStudents(area){
 const isTeacher=CU_ROLE==='teacher';
 const myStudents=isTeacher?D.students.filter(s=>myTeacherClasses().includes(s.cls)):D.students;
 document.getElementById('topBtn')?.classList.toggle('hidden',isTeacher);
 area.innerHTML=`
 <div class="bulk-bar hidden" id="bulkBar">
  <span class="bc">0 selected</span>
  <button class="bbt" onclick="T(selRows.size+' WhatsApp reminders sent','wa')"><i class="ti ti-brand-whatsapp" style="font-size:12px"></i>WhatsApp Reminder</button>
  <button class="bbt" onclick="mGenReports()"><i class="ti ti-certificate" style="font-size:12px"></i>Generate Report Cards</button>
  <button class="bbt" onclick="exportStudentsCsv([...selRows])"><i class="ti ti-download" style="font-size:12px"></i>Export</button>
  <button class="bbt" onclick="T('Attendance marked for '+selRows.size+' students','success')"><i class="ti ti-calendar-check" style="font-size:12px"></i>Mark Attendance</button>
  ${isTeacher?'':`<button class="bbt danger" onclick="deleteStudents([...selRows])"><i class="ti ti-trash" style="font-size:12px"></i>Delete</button>`}
 </div>
 <div class="card">
  <div class="fbar">
   <div style="background:#fff;border:1px solid var(--sb);border-radius:7px;padding:0 9px;height:30px;display:flex;align-items:center;gap:6px;min-width:200px"><i class="ti ti-search" style="font-size:12px;color:var(--sx)"></i><input type="text" placeholder="Search students..." style="border:none;background:transparent;font-size:12px;color:var(--s);outline:none;width:100%" oninput="filtStu(this.value)"></div>
   <div class="chip active" onclick="filtStuCls('',this)">All</div>
   ${[...new Set(myStudents.map(s=>s.cls))].map(c=>`<div class="chip" onclick="filtStuCls('${c}',this)">${c}</div>`).join('')}
   <div class="chip" onclick="filtStuCls('at-risk',this)" style="border-color:var(--r);color:var(--r)">At Risk</div>
   <div style="margin-left:auto;display:flex;gap:7px">
    <button class="btn btn-s" onclick="exportStudentsCsv()"><i class="ti ti-download" style="font-size:11px"></i>Export</button>
    ${isTeacher?'':`<button class="btn btn-s" onclick="mImportCSV()"><i class="ti ti-upload" style="font-size:11px"></i>Import CSV</button>
    <button class="btn btn-g" onclick="mAddStu()"><i class="ti ti-user-plus" style="font-size:11px"></i>Add Student</button>`}
   </div>
  </div>
  <div class="tw-wrap"><table class="dt" id="stuT">
   <thead><tr><th class="cc"><input type="checkbox" class="rc" onchange="togAll(this,'stuT')"></th><th>Student</th><th>ID</th><th>Class</th><th>Avg</th><th>Attendance</th>${isTeacher?'':'<th>Balance</th>'}<th>Status</th><th>Actions</th></tr></thead>
   <tbody id="stuB"></tbody>
  </table></div>
 </div>`;
 rstStu(myStudents);
}

function rstStu(list){
 const tb=document.getElementById('stuB');if(!tb)return;
 const isTeacher=CU_ROLE==='teacher';
 tb.innerHTML=list.map(s=>`<tr>
  <td><input type="checkbox" class="rc" data-id="${s.id}" onchange="togRow(this,'${s.id}')"></td>
  <td><div class="flex ic g8"><div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div><div><div style="font-weight:600">${s.name}</div><div class="tsm">${s.gender}</div></div></div></td>
  <td class="mono">${s.id}</td><td>${s.cls}</td>
  <td>${s.avg}% <span class="pill ${gc(s.grade)}">${s.grade}</span></td>
  <td><div class="flex ic g6"><div class="pw-bar" style="width:46px"><div class="pb-bar" style="width:${s.att}%;background:${s.att<80?'var(--r)':s.att<90?'var(--a)':'var(--g)'}"></div></div><span style="font-size:11px;color:${s.att<80?'var(--r)':'var(--sl)'}">${s.att}%</span></div></td>
  ${isTeacher?'':`<td style="color:${s.balance>0?'var(--r)':'var(--sl)'};font-weight:${s.balance>0?600:400}">${s.balance>0?fmt(s.balance):'Settled'}</td>`}
  <td><span class="pill ${sc(s.status)}">${sl(s.status)}</span></td>
  <td><div class="flex g6">
   <i class="ti ti-eye act" onclick='openSP(${JSON.stringify(s).replace(/"/g,"'")})'></i>
   <i class="ti ti-brand-whatsapp act" style="color:var(--wd)" onclick="T('WhatsApp to ${s.parent}','wa')"></i>
   <i class="ti ti-edit act" onclick="T('Editing ${s.name}','')"></i>
   ${isTeacher?'':`<i class="ti ti-trash act" style="color:var(--r)" onclick="deleteStudents(['${s.id}'])"></i>`}
  </div></td>
 </tr>`).join('');
}
async function deleteStudents(ids){
 if(!ids.length){T('Select at least one student','error');return;}
 if(!confirm(`Delete ${ids.length} student${ids.length===1?'':'s'}? This can't be undone.`))return;
 try{
  const {error}=await sb.from('students').delete().in('id',ids);
  if(error)throw error;
  T(`${ids.length} student${ids.length===1?'':'s'} removed`,'success');
  selRows=new Set();
  const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
  await loadSchoolData(schoolId);
  V('students');
 }catch(err){
  T(err.message||'Failed to delete student(s)','error');
 }
}
function exportStudentsCsv(ids){
 const base=CU_ROLE==='teacher'?D.students.filter(s=>myTeacherClasses().includes(s.cls)):D.students;
 const rows=(ids&&ids.length)?base.filter(s=>ids.includes(s.id)):base;
 if(!rows.length){T('No students to export','error');return;}
 const header=['Name','Class','Gender','DOB','Status','Average','Grade'];
 const csv=[header.join(','),...rows.map(s=>[s.name,s.cls,s.gender,s.dob,s.status,s.avg,s.grade].map(v=>`"${(v??'').toString().replace(/"/g,'""')}"`).join(','))].join('\n');
 const blob=new Blob([csv],{type:'text/csv'});
 const url=URL.createObjectURL(blob);
 const a=document.createElement('a');
 a.href=url;a.download='students_export.csv';a.click();
 URL.revokeObjectURL(url);
 T(`${rows.length} record${rows.length===1?'':'s'} exported`,'success');
}
function filtStu(q){const base=CU_ROLE==='teacher'?D.students.filter(s=>myTeacherClasses().includes(s.cls)):D.students;rstStu(base.filter(s=>s.name.toLowerCase().includes(q.toLowerCase())||s.id.toLowerCase().includes(q.toLowerCase())));}
function filtStuCls(cls,el){el.closest('.fbar').querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));el.classList.add('active');const base=CU_ROLE==='teacher'?D.students.filter(s=>myTeacherClasses().includes(s.cls)):D.students;rstStu(cls==='at-risk'?base.filter(s=>s.att<80||s.grade==='F'):cls?base.filter(s=>s.cls===cls):base);}
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
  <div class="tab-bar"><div class="tab active" onclick="sTab(this,'sp1')">Personal</div><div class="tab" onclick="sTab(this,'sp2')">Academic</div>${CU_ROLE==='teacher'?'':'<div class="tab" onclick="sTab(this,\'sp3\')">Finance</div>'}<div class="tab" onclick="sTab(this,'sp4')">Medical</div></div>
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
   ${SUBS.slice(0,6).map(sub=>{const m=markFor(s,sub,'Term 3',20);const g=m>=80?'A':m>=70?'B':m>=60?'C':m>=50?'D':'F';return`<div class="flex ic g8" style="margin-bottom:7px"><span style="width:120px;font-size:11px">${sub}</span><div class="pw-bar" style="flex:1"><div class="pb-bar" style="width:${m}%;background:${m<50?'var(--r)':m<60?'var(--a)':'var(--g)'}"></div></div><span style="font-size:11px;font-weight:600;width:32px;text-align:right">${m}%</span><span class="pill ${gc(g)}">${g}</span></div>`;}).join('')}
  </div>
  <div id="sp3" class="hidden">
   ${(()=>{
    const myInv=D.invoices.filter(i=>i.student===s.name);
    const billed=myInv.reduce((a,i)=>a+i.amount,0);
    const paid=myInv.reduce((a,i)=>a+i.paid,0);
    const bal=billed-paid;
    return `<div class="fr3 mb14">
    <div class="sc" style="cursor:default"><div class="sc-val">${fmt(billed)}</div><div class="sc-lbl">Billed</div></div>
    <div class="sc" style="cursor:default"><div class="sc-val" style="color:var(--g)">${fmt(paid)}</div><div class="sc-lbl">Paid</div></div>
    <div class="sc" style="cursor:default"><div class="sc-val" style="color:${bal>0?'var(--r)':'var(--g)'}">${bal>0?fmt(bal):'R0'}</div><div class="sc-lbl">Balance</div></div>
   </div>
   ${bal>0?`<div class="pay-btn" style="display:inline-flex;padding:8px 13px;font-size:12px;border-radius:7px;margin-bottom:10px" onclick="T('PayFast link sent to ${s.parent} for ${fmt(bal)}','success')"><i class="ti ti-link" style="font-size:13px"></i>Send PayFast Link — ${fmt(bal)}</div>
   <div style="background:var(--rp);border:1px solid var(--r);border-radius:7px;padding:10px 13px;font-size:12px;color:var(--rm)"><i class="ti ti-alert-triangle" style="margin-right:5px"></i>Outstanding balance of ${fmt(bal)}.</div>`:`<div style="background:var(--gp);border:1px solid var(--gl);border-radius:7px;padding:10px 13px;font-size:12px;color:var(--g)"><i class="ti ti-circle-check" style="margin-right:5px"></i>No outstanding fees.</div>`}`;
   })()}
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
