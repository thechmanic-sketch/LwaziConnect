function rStudentPortal() {
 const area = document.getElementById('CA');
 const s = CU_MY_STUDENT;
 if(!s){
  area.innerHTML=`<div class="card" style="text-align:center;padding:40px 20px"><i class="ti ti-user-question" style="font-size:32px;color:var(--sl);display:block;margin-bottom:10px"></i><div style="font-weight:600;margin-bottom:4px">Your student record isn't linked yet</div><div class="tsm">Once the school links your account to your student record, your portal will appear here.</div></div>`;
  document.getElementById('ptitle').textContent='My Portal';
  return;
 }
 const myHw=D.homework.filter(h=>h.cls===s.cls&&h.status!=='completed');
 area.innerHTML = `
 <div style="background:linear-gradient(135deg,var(--g),var(--gm));border-radius:12px;padding:18px 20px;margin-bottom:18px;display:flex;align-items:center;gap:14px">
  <div style="width:50px;height:50px;background:var(--a);border-radius:12px;display:flex;align-items:center;justify-content:center;font-family:'Outfit',sans-serif;font-weight:800;font-size:20px;color:var(--g);">${s.ini}</div>
  <div>
   <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:18px;color:#fff">${s.name}</div>
   <div style="font-size:12px;color:rgba(255,255,255,.65);margin-top:2px">${s.cls} · Student ID: ${s.id}</div>
   <div style="display:flex;gap:7px;margin-top:8px">
    <span class="pill" style="background:rgba(255,255,255,.15);color:#fff;font-size:10px"><i class="ti ti-chart-bar" style="font-size:10px"></i>${s.avg}% avg</span>
    <span class="pill" style="background:rgba(255,255,255,.15);color:#fff;font-size:10px"><i class="ti ti-calendar-check" style="font-size:10px"></i>${s.att}% attendance</span>
   </div>
  </div>
 </div>
 <div class="g4" style="margin-bottom:18px">
  <div class="sc" onclick="rStudentSubjects()"><div class="sc-icon ig"><i class="ti ti-book"></i></div><div class="sc-val">${s.avg}%</div><div class="sc-lbl">My Average</div><div style="font-size:10px;margin-top:5px;color:var(--gl);display:flex;align-items:center;gap:3px"><i class="ti ti-trending-up" style="font-size:10px"></i>Grade ${s.grade}</div></div>
  <div class="sc" onclick="rStudentAttendance()"><div class="sc-icon ia"><i class="ti ti-calendar-check"></i></div><div class="sc-val">${s.att}%</div><div class="sc-lbl">Attendance</div></div>
  <div class="sc" onclick="rStudentHomework()"><div class="sc-icon ib"><i class="ti ti-notebook"></i></div><div class="sc-val">${myHw.length}</div><div class="sc-lbl">Tasks due</div></div>
  <div class="sc" onclick="V('announcements')"><div class="sc-icon ip"><i class="ti ti-speakerphone"></i></div><div class="sc-val">${D.announcements.filter(a=>annVisible(a)).length}</div><div class="sc-lbl">New notices</div></div>
 </div>
 <div class="g2">
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-book"></i>My Marks — Term 3</div></div>
   ${stuMarksHtml(s)}
  </div>
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-calendar-time"></i>Today's Timetable</div></div>
   ${stuTimetableHtml()}
  </div>
 </div>`;
}

// ── shared fragments reused across the personalized tabs below ──
function stuMarksHtml(s){
 return ['Mathematics','English','IsiZulu','Natural Sciences','Social Sciences'].map(sub=>{const m=markFor(s,sub,'Term 3',18);const g=m>=80?'A':m>=70?'B':m>=60?'C':m>=50?'D':'F';return`<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="width:120px;font-size:11px;color:var(--sm)">${sub}</span><div style="flex:1;height:6px;background:var(--sp);border-radius:3px;overflow:hidden"><div style="height:100%;width:${m}%;background:${m<50?'var(--r)':m<70?'var(--a)':'var(--g)'};border-radius:3px"></div></div><span style="font-size:11px;font-weight:700;width:32px;text-align:right">${m}%</span><span class="pill ${gc(g)}">${g}</span></div>`;}).join('');
}
function stuTimetableHtml(){
 const s=CU_MY_STUDENT;
 const periods=['Period 1','Period 2','Period 3','Period 4','Period 5','Period 6'];
 if(!s||!s.cls)return '<div class="tsm">No timetable available yet.</div>';
 const sched=genClassSchedule(s.cls);
 return periods.map(p=>{
  const subj=sched[p]&&sched[p][0];
  const t=TT_PERIODS.find(x=>x.l===p);
  if(p==='Break'||!subj)return '';
  return `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--sp)"><span style="font-size:10px;color:var(--sl);width:38px">${t?t.t:''}</span><div style="flex:1"><div style="font-size:12px;font-weight:600">${subj}</div></div></div>`;
 }).join('')||'<div class="tsm">No timetable available yet.</div>';
}

function stuHeader(title){
 document.getElementById('ptitle').textContent=title;
}

function rStudentSubjects(){
 stuHeader('Subjects & Marks');
 const area=document.getElementById('CA');
 const s=CU_MY_STUDENT;
 if(!s){area.innerHTML='<div class="tsm">No student record linked yet.</div>';return;}
 area.innerHTML=`<div class="card"><div class="card-head"><div class="card-title"><i class="ti ti-book"></i>My Marks — Term 3</div></div>${stuMarksHtml(s)}</div>`;
}

function rStudentTimetableView(){
 stuHeader('Timetable');
 const area=document.getElementById('CA');
 area.innerHTML=`<div class="card"><div class="card-head"><div class="card-title"><i class="ti ti-calendar-time"></i>My Weekly Timetable</div></div>${stuTimetableHtml()}</div>`;
}

function rStudentAttendance(){
 stuHeader('Attendance');
 const area=document.getElementById('CA');
 const s=CU_MY_STUDENT;
 if(!s){area.innerHTML='<div class="tsm">No student record linked yet.</div>';return;}
 area.innerHTML=`<div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-calendar-check"></i>My Attendance — Term 3</div></div>
  <div class="g3 mb18">
   <div class="sc" style="cursor:default"><div class="sc-val" style="color:var(--g)">${s.att}%</div><div class="sc-lbl">Overall attendance</div></div>
   <div class="sc" style="cursor:default"><div class="sc-val">—</div><div class="sc-lbl">Days absent</div></div>
   <div class="sc" style="cursor:default"><div class="sc-val">—</div><div class="sc-lbl">Days late</div></div>
  </div>
  <div class="tsm">Attendance is recorded by your teachers each morning. Contact the school office if you believe a record is incorrect.</div>
 </div>`;
}

function rStudentHomework(){
 stuHeader('Homework');
 const area=document.getElementById('CA');
 const s=CU_MY_STUDENT;
 const tasks=s?D.homework.filter(h=>h.cls===s.cls):[];
 area.innerHTML=`<div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-notebook"></i>My Homework</div></div>
  ${tasks.length?tasks.map(t=>`<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--sp)">
   <i class="ti ${t.status==='completed'?'ti-circle-check':'ti-circle-dashed'}" style="font-size:18px;color:${t.status==='completed'?'var(--g)':'var(--sl)'}"></i>
   <div style="flex:1"><div style="font-size:12px;font-weight:600">${t.title}</div><div class="tsm">${t.subject} · Due ${t.due_date||'—'}</div></div>
   <span class="pill ${t.status==='completed'?'pg':'pa'}">${t.status==='completed'?'Done':'Pending'}</span>
  </div>`).join(''):'<div class="tsm" style="padding:10px 0">No homework set yet.</div>'}
 </div>`;
}
