function rClasses(area){
 area.innerHTML=`<div class="g3 mb18">${D.classes.map(c=>`
  <div class="card" style="cursor:pointer" onclick="openCls('${c.name}')">
   <div class="card-head" style="margin-bottom:8px"><div class="card-title">${c.name}</div><span class="pill ${c.students/c.cap>0.9?'pa':'pg'}">${c.students}/${c.cap}</span></div>
   <div class="tsm mb14" style="margin-bottom:6px"><i class="ti ti-user-check" style="font-size:11px;margin-right:3px"></i>${c.teacher}</div>
   <div class="tsm mb14" style="margin-bottom:8px"><i class="ti ti-door" style="font-size:11px;margin-right:3px"></i>${c.room}</div>
   <div class="pw-bar"><div class="pb-bar" style="width:${Math.round(c.students/c.cap*100)}%;background:${c.students/c.cap>0.9?'var(--a)':'var(--g)'}"></div></div>
   <div class="tsm" style="margin-top:4px">${Math.round(c.students/c.cap*100)}% capacity</div>
  </div>`).join('')}</div>`;
}
function openCls(name){
 const cls=D.classes.find(c=>c.name===name);const stus=D.students.filter(s=>s.cls===name);
 const avg=stus.length?Math.round(stus.reduce((a,s)=>a+s.avg,0)/stus.length):0;
 OM(`${name} — Detail`,`
  <div class="fr3 mb14"><div class="sc" style="cursor:default"><div class="sc-val">${cls.students}</div><div class="sc-lbl">Students</div></div><div class="sc" style="cursor:default"><div class="sc-val">${avg}%</div><div class="sc-lbl">Class avg</div></div><div class="sc" style="cursor:default"><div class="sc-val">${stus.filter(s=>s.balance>0).length}</div><div class="sc-lbl">Fee arrears</div></div></div>
  <div class="tsm mb14" style="margin-bottom:11px">Teacher: <strong>${cls.teacher}</strong> · Room: <strong>${cls.room}</strong></div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Student</th><th>Avg</th><th>Att</th><th>Status</th></tr></thead><tbody>
  ${stus.map(s=>`<tr><td><div class="flex ic g8"><div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div>${s.name}</div></td><td>${s.avg}% <span class="pill ${gc(s.grade)}">${s.grade}</span></td><td style="color:${s.att<80?'var(--r)':'var(--sl)'}">${s.att}%</td><td><span class="pill ${sc(s.status)}">${sl(s.status)}</span></td></tr>`).join('')}
  </tbody></table></div>`,
  `<button class="btn btn-s" onclick="CM()">Close</button><button class="btn btn-g" onclick="V('attendance');CM()">Mark Attendance</button>`);
}

function rTeachers(area){
 area.innerHTML=`
 <div class="g3 mb18"><div class="sc"><div class="sc-icon ig"><i class="ti ti-user-check"></i></div><div class="sc-val">5</div><div class="sc-lbl">Active Staff</div></div><div class="sc"><div class="sc-icon ia"><i class="ti ti-user-minus"></i></div><div class="sc-val">1</div><div class="sc-lbl">On Leave</div></div><div class="sc"><div class="sc-icon ir"><i class="ti ti-school"></i></div><div class="sc-val">1</div><div class="sc-lbl">Sub Needed</div></div></div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-user-check"></i>Teaching Staff</div><button class="btn btn-g" onclick="mAddTeacher()"><i class="ti ti-user-plus" style="font-size:11px"></i>Add Teacher</button></div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Teacher</th><th>ID</th><th>Subject(s)</th><th>Classes</th><th>Phone</th><th>Status</th><th>Actions</th></tr></thead><tbody>
  ${D.teachers.map(t=>`<tr>
   <td><div class="flex ic g8"><div class="av av-s" style="background:${t.bg};color:${t.fg}">${t.ini}</div><div><div style="font-weight:600">${t.name}</div><div class="tsm">${t.email}</div></div></div></td>
   <td class="mono">${t.id}</td><td>${t.subject}</td>
   <td>${t.classes.map(c=>`<span class="pill pb" style="margin-right:2px">${c}</span>`).join('')}</td>
   <td>${t.phone}</td>
   <td><span class="pill ${sc(t.status)}">${sl(t.status)}</span>${t.status==='on-leave'?'<span class="tsm" style="color:var(--r);margin-left:5px">Sub needed</span>':''}</td>
   <td><div class="flex g6"><i class="ti ti-eye act" onclick="T('Viewing ${t.name}','')"></i><i class="ti ti-edit act" onclick="T('Editing ${t.name}','')"></i><i class="ti ti-brand-whatsapp act" style="color:var(--wd)" onclick="T('WhatsApp to ${t.name}','wa')"></i></div></td>
  </tr>`).join('')}
  </tbody></table></div>
 </div>`;
}

function rSubjects(area){
 area.innerHTML=`
 <div class="tab-bar"><div class="tab active" onclick="xT(this,'sm1')">Mark Sheet</div><div class="tab" onclick="xT(this,'sm2')">Subjects</div><div class="tab" onclick="xT(this,'sm3')">Exams</div></div>
 <div id="sm1"><div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-table"></i>Grade 7A — Term 3 Marks</div>
   <div class="flex g8"><select class="fs" style="width:140px;height:28px;font-size:11px">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select><select class="fs" style="width:100px;height:28px;font-size:11px"><option>Term 3</option><option>Term 2</option><option>Term 1</option></select><button class="btn btn-g" style="height:28px;font-size:10px" onclick="mUploadMarks()"><i class="ti ti-upload" style="font-size:10px"></i>Upload</button></div>
  </div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Student</th>${SUBS.map(s=>`<th>${s.split(' ')[0].substring(0,4)}</th>`).join('')}<th>Avg</th><th>Grade</th></tr></thead><tbody>
  ${D.students.filter(s=>s.cls==='Grade 7A').map(s=>{const ms=SUBS.map(()=>Math.max(30,Math.min(100,Math.floor(s.avg+(Math.random()*22-11)))));const avg=Math.round(ms.reduce((a,b)=>a+b,0)/ms.length);const g=avg>=80?'A':avg>=70?'B':avg>=60?'C':avg>=50?'D':'F';return`<tr><td><div class="flex ic g6"><div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div>${s.name}</div></td>${ms.map(m=>`<td style="font-weight:500;color:${m<50?'var(--r)':m<60?'var(--ad)':'var(--sm)'}">${m}</td>`).join('')}<td style="font-weight:700">${avg}%</td><td><span class="pill ${gc(g)}">${g}</span></td></tr>`;}).join('')}
  </tbody></table></div>
 </div></div>
 <div id="sm2" class="hidden"><div class="g3">${SUBS.map((sub,i)=>{const c=SUB_C[i%SUB_C.length].split('|');return`<div class="card" style="cursor:pointer" onclick="T('Viewing ${sub} curriculum','')"><div style="width:36px;height:36px;border-radius:8px;background:${c[0]};display:flex;align-items:center;justify-content:center;margin-bottom:9px"><i class="ti ti-book" style="font-size:17px;color:${c[1]}"></i></div><div style="font-weight:600;font-size:13px;margin-bottom:3px">${sub}</div><div class="tsm">All grades</div><span class="pill pg" style="margin-top:7px">Active</span></div>`;}).join('')}</div></div>
 <div id="sm3" class="hidden"><div class="card"><div class="card-head"><div class="card-title"><i class="ti ti-file-check"></i>Examinations</div><button class="btn btn-g" onclick="T('Creating exam','')"><i class="ti ti-plus" style="font-size:11px"></i>Create</button></div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Exam</th><th>Subject</th><th>Grade</th><th>Date</th><th>Duration</th><th>Marks</th><th>Status</th></tr></thead><tbody>
  ${SUBS.slice(0,5).map((s,i)=>`<tr><td style="font-weight:600">Term 3 — ${s}</td><td>${s}</td><td>Grade 7</td><td>${['11 Aug','12 Aug','13 Aug','14 Aug','18 Aug'][i]} 2025</td><td>2 hours</td><td>100</td><td><span class="pill pa">Upcoming</span></td></tr>`).join('')}
  </tbody></table></div></div></div>`;
}
function xT(el,id){el.closest('.tab-bar').querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');['sm1','sm2','sm3'].forEach(x=>{const e=document.getElementById(x);if(e)e.classList.toggle('hidden',x!==id);});}

function rTimetable(area){
 area.innerHTML=`<div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-calendar-time"></i>Grade 7A — Weekly Timetable</div>
   <div class="flex g8"><select class="fs" style="width:140px;height:28px;font-size:11px">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select><button class="btn btn-s" style="height:28px;font-size:10px" onclick="T('Printed','success')"><i class="ti ti-printer" style="font-size:10px"></i>Print</button><button class="btn btn-g" style="height:28px;font-size:10px" onclick="mEditTT()"><i class="ti ti-edit" style="font-size:10px"></i>Edit</button></div>
  </div>
  <div class="tt-grid">
   <div></div>${TT_DAYS.map(d=>`<div class="tt-head">${d}</div>`).join('')}
   ${TT_PERIODS.map(p=>{const row=TT_S[p.l];if(!row)return`<div class="tt-time">${p.t}<br><span style="font-size:7px">${p.l}</span></div><div class="tt-break" style="grid-column:span 5">☕ Break 10:00–11:00</div>`;return`<div class="tt-time">${p.t}<br><span style="font-size:7px">${p.l}</span></div>`+row.map((sub,di)=>{const c=subClr(sub);const tch=D.teachers[di%D.teachers.length];return`<div class="tt-cell" style="background:${c.bg};color:${c.fg}" onclick="T('${sub} — ${tch.name}','')"><div style="font-weight:700;font-size:10px">${sub}</div><div style="font-size:8px;opacity:.6;margin-top:1px">${tch.name.split(' ')[1]}</div></div>`;}).join('');}).join('')}
  </div>
 </div>`;
}

function rAttendance(area){
 area.innerHTML=`
 <div class="g4 mb18">
  <div class="sc"><div class="sc-icon ig"><i class="ti ti-users"></i></div><div class="sc-val">576</div><div class="sc-lbl">Present today</div></div>
  <div class="sc"><div class="sc-icon ir"><i class="ti ti-user-x"></i></div><div class="sc-val">48</div><div class="sc-lbl">Absent today</div><div class="sc-trend" style="color:var(--wd)"><i class="ti ti-brand-whatsapp" style="font-size:10px"></i>12 parents auto-notified</div></div>
  <div class="sc"><div class="sc-icon ia"><i class="ti ti-clock"></i></div><div class="sc-val">14</div><div class="sc-lbl">Late arrivals</div></div>
  <div class="sc"><div class="sc-icon ib"><i class="ti ti-chart-bar"></i></div><div class="sc-val">91%</div><div class="sc-lbl">Term avg</div><div class="sc-trend tw"><i class="ti ti-target" style="font-size:10px"></i>Target: 95%</div></div>
 </div>
 <div class="g2 mb18">
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-calendar-check"></i>Mark — Grade 7A</div>
    <div class="flex g8"><select class="fs" style="width:130px;height:26px;font-size:11px">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select><button class="btn btn-g" style="height:26px;font-size:10px" onclick="T('Attendance saved. 2 parents notified via WhatsApp','wa')"><i class="ti ti-check" style="font-size:10px"></i>Save</button></div>
   </div>
   <div style="max-height:290px;overflow-y:auto">
   ${D.students.filter(s=>s.cls==='Grade 7A').map(s=>`
    <div class="flex ic g8" style="padding:6px 0;border-bottom:1px solid var(--sp)">
     <div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div>
     <span style="flex:1;font-size:12px;font-weight:500">${s.name}</span>
     ${[['P','Present'],['A','Absent'],['L','Late'],['E','Excused'],['S','Sick']].map(([o,lbl])=>`<label title="${lbl}" style="cursor:pointer"><input type="radio" name="a_${s.id}" value="${o}" ${o==='P'?'checked':''} style="display:none"><div class="att-cell att-${o}">${o}</div></label>`).join('')}
     <select style="border:1px solid var(--sb);border-radius:5px;font-size:9px;height:22px;color:var(--sl);padding:0 3px"><option>—</option><option>Sick</option><option>Family</option><option>Unexplained</option></select>
    </div>`).join('')}
   </div>
  </div>
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-calendar-stats"></i>July 2025 — Amahle Dlamini</div></div>
   <div class="cal-grid mb14" style="margin-bottom:8px">${['M','T','W','T','F','S','S'].map(d=>`<div class="cal-head">${d}</div>`).join('')}
   ${Array.from({length:31},(_,i)=>{const day=i+1;const ss=['P','P','P','P','P',null,null,'P','P','P','A','P','P',null,null,'P','L','P'];const s=ss[i]||null;return s?`<div class="att-cell att-${s}" style="width:100%;border-radius:4px" onclick="T('July ${day}: ${s==='P'?'Present':s==='A'?'Absent':'Late'}','')"><span style="font-size:8px">${day}</span></div>`:`<div style="min-height:22px;border-radius:4px;background:${day>17?'var(--sp)':'#fff'};display:flex;align-items:center;justify-content:center;font-size:8px;color:var(--sx)">${day}</div>`;}).join('')}
   </div>
   <div style="background:var(--rp);border:1px solid var(--r);border-radius:7px;padding:8px 11px;font-size:11px;color:var(--rm)">
    <i class="ti ti-alert-triangle" style="margin-right:4px"></i><strong>Kabelo Mokoena</strong> at 72% — below threshold. <strong>WhatsApp auto-alert sent to parent.</strong>
   </div>
  </div>
 </div>`;
}

function rReportCards(area){
 area.innerHTML=`
 <div class="g2 mb18">
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-certificate"></i>Generate Report Cards</div></div>
   <div class="fg"><div class="fl">Class</div><select class="fs">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div>
   <div class="fg"><div class="fl">Term</div><select class="fs"><option>Term 3 — 2025</option><option>Term 2</option><option>Term 1</option></select></div>
   <div class="fg"><div class="fl">Student</div><select class="fs" id="rcSel">${D.students.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
   <div style="display:flex;flex-direction:column;gap:7px;margin-top:12px">
    <button class="btn btn-g w100" style="justify-content:center" onclick="prevRC()"><i class="ti ti-eye" style="font-size:11px"></i>Preview Report Card</button>
    <button class="btn btn-w w100" style="justify-content:center" onclick="T('Report card sent via WhatsApp to parent','wa')"><i class="ti ti-brand-whatsapp" style="font-size:11px"></i>Send via WhatsApp</button>
    <button class="btn btn-s w100" style="justify-content:center" onclick="T('Report card emailed to parent','success')"><i class="ti ti-mail" style="font-size:11px"></i>Email to Parent</button>
    <button class="btn btn-a w100" style="justify-content:center" onclick="mGenReports()"><i class="ti ti-sparkles" style="font-size:11px"></i>Bulk Generate — Whole Class</button>
   </div>
  </div>
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-chart-bar"></i>Class Performance</div></div>
   ${D.classes.map(c=>{const stus=D.students.filter(s=>s.cls===c.name);const avg=stus.length?Math.round(stus.reduce((a,s)=>a+s.avg,0)/stus.length):0;return`<div class="flex ic g8" style="margin-bottom:8px"><span style="width:74px;font-size:11px">${c.name}</span><div class="pw-bar" style="flex:1"><div class="pb-bar" style="width:${avg}%;background:${avg>=75?'var(--g)':avg>=60?'var(--a)':'var(--r)'}"></div></div><span style="font-size:11px;font-weight:600;width:34px;text-align:right">${avg}%</span></div>`;}).join('')}
   <div class="divider"></div>
   <div class="card-title" style="margin-bottom:9px"><i class="ti ti-send"></i>WhatsApp Delivery</div>
   <div class="flex ic g8 mb14" style="margin-bottom:7px"><i class="ti ti-circle-check" style="color:var(--g)"></i><span style="flex:1;font-size:12px">Grade 5A — 36 sent</span><span class="wast read"><i class="ti ti-checks"></i>All read</span></div>
   <div class="flex ic g8"><i class="ti ti-clock" style="color:var(--a)"></i><span style="flex:1;font-size:12px">Grade 7A — Pending</span><button class="btn btn-w" style="height:22px;font-size:10px" onclick="T('Sending 32 reports via WhatsApp','wa')">Send Now</button></div>
  </div>
 </div>`;
}

function prevRC(){
 const id=document.getElementById('rcSel')?.value;const s=D.students.find(x=>x.id===id)||D.students[0];
 const marks=SUBS.map(sub=>{const m=Math.max(30,Math.min(100,Math.floor(s.avg+(Math.random()*20-10))));const g=m>=80?'A':m>=70?'B':m>=60?'C':m>=50?'D':'F';return{sub,m,g};});
 OM('Report Card Preview',`
  <div class="rc-wrap">
   <div class="rc-head"><div class="rc-school">Durban Primary School</div><div class="rc-sub">Term 3 Academic Report · 2025</div></div>
   <div class="rc-body">
    <div class="rc-info mb14"><div class="rc-ib"><div class="rc-il">Student</div><div class="rc-iv">${s.name}</div></div><div class="rc-ib"><div class="rc-il">Student ID</div><div class="rc-iv">${s.id}</div></div><div class="rc-ib"><div class="rc-il">Class</div><div class="rc-iv">${s.cls}</div></div><div class="rc-ib"><div class="rc-il">Average</div><div class="rc-iv" style="color:var(--g)">${s.avg}% — Grade ${s.grade}</div></div></div>
    <div class="rc-row rc-rh"><div>Subject</div><div>Term 1</div><div>Term 2</div><div>Term 3</div><div>Grade</div></div>
    ${marks.map(({sub,m,g})=>`<div class="rc-row"><div style="font-size:11px;font-weight:500">${sub}</div><div class="tsm">${Math.max(30,m-8)}%</div><div class="tsm">${Math.max(30,m-4)}%</div><div style="font-weight:700">${m}%</div><div><span class="pill ${gc(g)}">${g}</span></div></div>`).join('')}
    <div style="margin-top:11px;background:var(--sp);border-radius:7px;padding:10px 12px;font-size:11px"><div style="font-weight:600;margin-bottom:2px">Teacher's Comment</div><div style="color:var(--sm)">${s.avg>=80?`${s.name.split(' ')[0]} demonstrates exceptional dedication and consistently achieves outstanding results.`:s.avg>=65?`${s.name.split(' ')[0]} is making good progress. Continued effort will lead to excellent results.`:`${s.name.split(' ')[0]} requires additional academic support. Parent involvement is strongly encouraged.`}</div></div>
    <div style="margin-top:10px;display:flex;align-items:center;gap:9px;padding:9px;background:var(--wp);border-radius:7px">
     <i class="ti ti-brand-whatsapp" style="font-size:18px;color:var(--wd)"></i>
     <div style="flex:1"><div style="font-size:11px;font-weight:600;color:var(--wd)">WhatsApp Delivery</div><div class="tsm">Will send to ${s.parent} — ${s.phone}</div></div>
     <button class="btn btn-w" style="height:24px;font-size:10px" onclick="T('Sent via WhatsApp to ${s.parent}','wa')">Send</button>
    </div>
   </div>
  </div>`,
  `<button class="btn btn-s" onclick="CM()">Close</button><button class="btn btn-s" onclick="T('Printed','success')"><i class="ti ti-printer" style="font-size:11px"></i>Print</button><button class="btn btn-w" onclick="T('Sent via WhatsApp','wa');CM()"><i class="ti ti-brand-whatsapp" style="font-size:11px"></i>WhatsApp</button><button class="btn btn-g" onclick="T('Emailed','success');CM()"><i class="ti ti-mail" style="font-size:11px"></i>Email</button>`,'600px');
}

