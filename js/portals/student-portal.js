function rStudentPortal() {
 const area = document.getElementById('CA');
 const s = D.students[0]; // Amahle — the demo student
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
  <div class="sc" onclick="rStudentHomework()"><div class="sc-icon ib"><i class="ti ti-notebook"></i></div><div class="sc-val">3</div><div class="sc-lbl">Tasks due</div></div>
  <div class="sc" onclick="V('announcements')"><div class="sc-icon ip"><i class="ti ti-speakerphone"></i></div><div class="sc-val">2</div><div class="sc-lbl">New notices</div></div>
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
 return ['Mathematics','English','IsiZulu','Natural Sciences','Social Sciences'].map(sub=>{const m=Math.max(40,Math.min(100,Math.floor(s.avg+(Math.random()*18-9))));const g=m>=80?'A':m>=70?'B':m>=60?'C':m>=50?'D':'F';return`<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="width:120px;font-size:11px;color:var(--sm)">${sub}</span><div style="flex:1;height:6px;background:var(--sp);border-radius:3px;overflow:hidden"><div style="height:100%;width:${m}%;background:${m<50?'var(--r)':m<70?'var(--a)':'var(--g)'};border-radius:3px"></div></div><span style="font-size:11px;font-weight:700;width:32px;text-align:right">${m}%</span><span class="pill ${gc(g)}">${g}</span></div>`;}).join('');
}
function stuTimetableHtml(){
 return [['07:30','Mathematics','Mr. T. Zulu','Room 12'],['08:30','English','Mrs. R. Sithole','Room 11'],['10:00','☕ Break','—','—'],['11:00','Natural Sciences','Mrs. P. Ndlovu','Room 9'],['12:00','IsiZulu','Ms. B. Gumede','Room 8'],['13:00','Social Sciences','Mr. S. Mthethwa','Room 10']].map(([t,s,te,r])=>s.includes('Break')?`<div style="background:var(--ap);border-radius:6px;padding:6px 10px;font-size:11px;color:var(--ad);margin-bottom:5px;text-align:center;">${t} — ${s}</div>`:`<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--sp)"><span style="font-size:10px;color:var(--sl);width:38px">${t}</span><div style="flex:1"><div style="font-size:12px;font-weight:600">${s}</div><div style="font-size:10px;color:var(--sl)">${te} · ${r}</div></div></div>`).join('');
}

function stuHeader(title){
 document.getElementById('ptitle').textContent=title;
}

function rStudentSubjects(){
 stuHeader('Subjects & Marks');
 const area=document.getElementById('CA');
 const s=D.students[0];
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
 const s=D.students[0];
 area.innerHTML=`<div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-calendar-check"></i>My Attendance — Term 3</div></div>
  <div class="g3 mb18">
   <div class="sc" style="cursor:default"><div class="sc-val" style="color:var(--g)">${s.att}%</div><div class="sc-lbl">Overall attendance</div></div>
   <div class="sc" style="cursor:default"><div class="sc-val">2</div><div class="sc-lbl">Days absent</div></div>
   <div class="sc" style="cursor:default"><div class="sc-val">1</div><div class="sc-lbl">Days late</div></div>
  </div>
  <div class="tsm">Attendance is recorded by your teachers each morning. Contact the school office if you believe a record is incorrect.</div>
 </div>`;
}

function rStudentHomework(){
 stuHeader('Homework');
 const area=document.getElementById('CA');
 const tasks=[
  {sub:'Mathematics',title:'Fractions worksheet — Ch. 4',due:'Tomorrow',status:'pending'},
  {sub:'English',title:'Book report: chapters 1-3',due:'Fri, 18 Jul',status:'pending'},
  {sub:'Natural Sciences',title:'Plant cell diagram labelling',due:'Mon, 21 Jul',status:'pending'},
  {sub:'IsiZulu',title:'Vocabulary list — Unit 5',due:'Completed',status:'done'},
 ];
 area.innerHTML=`<div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-notebook"></i>My Homework</div></div>
  ${tasks.map(t=>`<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--sp)">
   <i class="ti ${t.status==='done'?'ti-circle-check':'ti-circle-dashed'}" style="font-size:18px;color:${t.status==='done'?'var(--g)':'var(--sl)'}"></i>
   <div style="flex:1"><div style="font-size:12px;font-weight:600">${t.title}</div><div class="tsm">${t.sub} · Due ${t.due}</div></div>
   <span class="pill ${t.status==='done'?'pg':'pa'}">${t.status==='done'?'Done':'Pending'}</span>
  </div>`).join('')}
 </div>`;
}
