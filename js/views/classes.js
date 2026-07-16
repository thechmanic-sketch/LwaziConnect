function rClasses(area){
 const classes=CU_ROLE==='teacher'?D.classes.filter(c=>myTeacherClasses().includes(c.name)):D.classes;
 area.innerHTML=`<div class="g3 mb18">${classes.map(c=>`
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
 const canSeeFees=CU_ROLE!=='teacher';
 OM(`${name} — Detail`,`
  <div class="fr3 mb14"><div class="sc" style="cursor:default"><div class="sc-val">${cls.students}</div><div class="sc-lbl">Students</div></div><div class="sc" style="cursor:default"><div class="sc-val">${avg}%</div><div class="sc-lbl">Class avg</div></div>${canSeeFees?`<div class="sc" style="cursor:default"><div class="sc-val">${stus.filter(s=>s.balance>0).length}</div><div class="sc-lbl">Fee arrears</div></div>`:`<div class="sc" style="cursor:default"><div class="sc-val">${stus.length?Math.round(stus.reduce((a,s)=>a+s.att,0)/stus.length):0}%</div><div class="sc-lbl">Avg attendance</div></div>`}</div>
  <div class="tsm mb14" style="margin-bottom:11px">Teacher: <strong>${cls.teacher}</strong> · Room: <strong>${cls.room}</strong></div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Student</th><th>Avg</th><th>Att</th><th>Status</th></tr></thead><tbody>
  ${stus.map(s=>`<tr><td><div class="flex ic g8"><div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div>${s.name}</div></td><td>${s.avg}% <span class="pill ${gc(s.grade)}">${s.grade}</span></td><td style="color:${s.att<80?'var(--r)':'var(--sl)'}">${s.att}%</td><td><span class="pill ${sc(s.status)}">${sl(s.status)}</span></td></tr>`).join('')}
  </tbody></table></div>`,
  `<button class="btn btn-s" onclick="CM()">Close</button><button class="btn btn-g" onclick="V('attendance');CM()">Mark Attendance</button>`);
}

