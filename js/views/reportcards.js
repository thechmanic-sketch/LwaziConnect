function rReportCards(area){
 const isTeacher=CU_ROLE==='teacher';
 const availClasses=isTeacher?D.classes.filter(c=>myTeacherClasses().includes(c.name)):D.classes;
 const availStudents=isTeacher?D.students.filter(s=>myTeacherClasses().includes(s.cls)):D.students;
 area.innerHTML=`
 <div class="g2 mb18">
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-certificate"></i>Generate Report Cards</div></div>
   <div class="fg"><div class="fl">Class</div><select class="fs" id="rcClsSel" onchange="rcFilterStudents(this.value)">${availClasses.map(c=>`<option>${c.name}</option>`).join('')}</select></div>
   <div class="fg"><div class="fl">Term</div><select class="fs"><option>Term 3 — 2025</option><option>Term 2</option><option>Term 1</option></select></div>
   <div class="fg"><div class="fl">Student</div><select class="fs" id="rcSel">${availStudents.filter(s=>!availClasses.length||s.cls===availClasses[0].name).map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
   <div style="display:flex;flex-direction:column;gap:7px;margin-top:12px">
    <button class="btn btn-g w100" style="justify-content:center" onclick="prevRC()"><i class="ti ti-eye" style="font-size:11px"></i>Preview Report Card</button>
    <button class="btn btn-w w100" style="justify-content:center" onclick="T('Report card sent via WhatsApp to parent','wa')"><i class="ti ti-brand-whatsapp" style="font-size:11px"></i>Send via WhatsApp</button>
    <button class="btn btn-s w100" style="justify-content:center" onclick="T('Report card emailed to parent','success')"><i class="ti ti-mail" style="font-size:11px"></i>Email to Parent</button>
    <button class="btn btn-a w100" style="justify-content:center" onclick="mGenReports()"><i class="ti ti-sparkles" style="font-size:11px"></i>Bulk Generate — Whole Class</button>
   </div>
  </div>
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-chart-bar"></i>Class Performance</div></div>
   ${availClasses.map(c=>{const stus=D.students.filter(s=>s.cls===c.name);const avg=stus.length?Math.round(stus.reduce((a,s)=>a+s.avg,0)/stus.length):0;return`<div class="flex ic g8" style="margin-bottom:8px"><span style="width:74px;font-size:11px">${c.name}</span><div class="pw-bar" style="flex:1"><div class="pb-bar" style="width:${avg}%;background:${avg>=75?'var(--g)':avg>=60?'var(--a)':'var(--r)'}"></div></div><span style="font-size:11px;font-weight:600;width:34px;text-align:right">${avg}%</span></div>`;}).join('')}
   <div class="divider"></div>
   <div class="card-title" style="margin-bottom:9px"><i class="ti ti-send"></i>WhatsApp Delivery</div>
   <div class="flex ic g8 mb14" style="margin-bottom:7px"><i class="ti ti-circle-check" style="color:var(--g)"></i><span style="flex:1;font-size:12px">Grade 5A — 36 sent</span><span class="wast read"><i class="ti ti-checks"></i>All read</span></div>
   <div class="flex ic g8"><i class="ti ti-clock" style="color:var(--a)"></i><span style="flex:1;font-size:12px">Grade 7A — Pending</span><button class="btn btn-w" style="height:22px;font-size:10px" onclick="T('Sending 32 reports via WhatsApp','wa')">Send Now</button></div>
  </div>
 </div>`;
}

function rcFilterStudents(clsName){
 const sel=document.getElementById('rcSel');if(!sel)return;
 sel.innerHTML=D.students.filter(s=>s.cls===clsName).map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
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

