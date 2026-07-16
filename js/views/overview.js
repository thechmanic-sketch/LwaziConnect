// ══════════════════════════════════════
// VIEWS
// ══════════════════════════════════════

function rDash(area){
 if(CU_ROLE==='teacher')return rTeacherDash(area);
 const atRisk=D.students.filter(s=>s.att<85||s.grade==='F');
 const def=D.invoices.filter(i=>i.status!=='paid');
 const pendingAdmissions=D.admissions.filter(a=>a.status==='pending').length;
 const activeTeachers=D.teachers.filter(t=>t.status==='active').length;
 const onLeaveTeachers=D.teachers.filter(t=>t.status==='on-leave').length;
 const totalOutstanding=D.invoices.reduce((a,i)=>a+(i.amount-i.paid),0);
 const avgAtt=D.students.length?Math.round(D.students.reduce((a,s)=>a+s.att,0)/D.students.length):0;
 area.innerHTML=`
 <div class="alert-banner">
  <span style="font-size:9px;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.5px;margin-right:3px">Alerts</span>
  <div class="al-item red" onclick="V('attendance')"><i class="ti ti-user-exclamation"></i>${atRisk.length} students need attention</div>
  <div class="al-item amb" onclick="V('fees')"><i class="ti ti-receipt"></i>${def.length} fee accounts overdue</div>
  <div class="al-item amb" onclick="V('admissions')"><i class="ti ti-clipboard"></i>${pendingAdmissions} pending applications</div>
  <div class="al-item" onclick="openWA()"><i class="ti ti-brand-whatsapp" style="color:#DCF8C6"></i>WhatsApp updates</div>
 </div>
 <div class="g4 mb18">
  <div class="sc" onclick="V('students')"><div class="sc-icon ig"><i class="ti ti-users"></i></div><div class="sc-val" id="sv1">0</div><div class="sc-lbl">Total Students</div></div>
  <div class="sc" onclick="V('teachers')"><div class="sc-icon ib"><i class="ti ti-user-check"></i></div><div class="sc-val" id="sv2">0</div><div class="sc-lbl">Active Teachers</div><div class="sc-trend tu"><i class="ti ti-circle-check" style="font-size:10px"></i>${activeTeachers} active · ${onLeaveTeachers} leave</div></div>
  <div class="sc" onclick="V('attendance')"><div class="sc-icon ia"><i class="ti ti-calendar-check"></i></div><div class="sc-val" id="sv3">0%</div><div class="sc-lbl">Avg Attendance</div></div>
  <div class="sc" onclick="V('fees')"><div class="sc-icon ir"><i class="ti ti-receipt-2"></i></div><div class="sc-val" id="sv4">R0</div><div class="sc-lbl">Fees Outstanding</div><div class="sc-trend tw"><i class="ti ti-alert-circle" style="font-size:10px"></i>${def.length} accounts overdue</div></div>
 </div>
 <div class="g2 mb18">
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-calendar-check"></i>Today's Attendance</div><span class="tsm" style="cursor:pointer;color:var(--g)" onclick="V('attendance')">View all →</span></div>
   <div id="attBars"></div>
  </div>
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-alert-triangle" style="color:var(--r)"></i>At-Risk Students</div></div>
   ${atRisk.map(s=>`<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--sp);cursor:pointer" onclick='openSP(${JSON.stringify(s).replace(/"/g,"'")})'>
    <div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div>
    <div style="flex:1"><div style="font-size:12px;font-weight:600">${s.name} <span class="pill ${gc(s.grade)}">${s.grade}</span></div>
    <div class="tsm">${s.cls} · Att: <span style="color:${s.att<80?'var(--r)':'var(--ad)'};font-weight:600">${s.att}%</span>${s.balance>0?` · <span style="color:var(--r);font-weight:600">${fmt(s.balance)}</span>`:''}</div></div>
    <button class="btn btn-w" style="height:24px;font-size:9px;padding:0 7px" onclick="event.stopPropagation();T('WhatsApp alert sent to ${s.parent}','wa')"><i class="ti ti-brand-whatsapp" style="font-size:10px"></i>Alert</button>
   </div>`).join('')}
  </div>
 </div>
 <div class="g2 mb18">
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-receipt-2"></i>Fee Collection — Term 3</div><span class="tsm" style="cursor:pointer;color:var(--g)" onclick="V('fees')">Details →</span></div>
   ${(()=>{
    const paidTotal=D.invoices.filter(i=>i.status==='paid').reduce((a,i)=>a+i.paid,0);
    const partialTotal=D.invoices.filter(i=>i.status==='partial').reduce((a,i)=>a+i.paid,0);
    const outstandingTotal=D.invoices.reduce((a,i)=>a+(i.amount-i.paid),0);
    const totalBilled=D.invoices.reduce((a,i)=>a+i.amount,0);
    const paidPct=totalBilled?Math.round((paidTotal/totalBilled)*100):0;
    const partialPct=totalBilled?Math.round((partialTotal/totalBilled)*100):0;
    const circumference=239;
    const paidLen=Math.round(circumference*paidPct/100);
    const partialLen=Math.round(circumference*partialPct/100);
    return `<div style="display:flex;align-items:center;gap:18px">
    <svg width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="none" stroke="#F3F4F6" stroke-width="13"/><circle cx="50" cy="50" r="38" fill="none" stroke="#1B4332" stroke-width="13" stroke-dasharray="${paidLen} ${circumference}" stroke-dashoffset="60" stroke-linecap="round"/><circle cx="50" cy="50" r="38" fill="none" stroke="#E9A825" stroke-width="13" stroke-dasharray="${partialLen} ${circumference}" stroke-dashoffset="${60-paidLen}" stroke-linecap="round"/><text x="50" y="47" text-anchor="middle" font-family="Outfit" font-weight="800" font-size="17" fill="#1B4332">${paidPct}%</text><text x="50" y="59" text-anchor="middle" font-size="8" fill="#6B7280">collected</text></svg>
    <div style="flex:1">
     <div style="display:flex;align-items:center;gap:7px;margin-bottom:8px"><div style="width:10px;height:10px;border-radius:2px;background:var(--g);flex-shrink:0"></div><div style="flex:1;font-size:11px">Paid in full</div><strong style="font-size:12px">${fmt(paidTotal)}</strong></div>
     <div style="display:flex;align-items:center;gap:7px;margin-bottom:8px"><div style="width:10px;height:10px;border-radius:2px;background:var(--a);flex-shrink:0"></div><div style="flex:1;font-size:11px">Partial</div><strong style="font-size:12px">${fmt(partialTotal)}</strong></div>
     <div style="display:flex;align-items:center;gap:7px"><div style="width:10px;height:10px;border-radius:2px;background:var(--sb);flex-shrink:0"></div><div style="flex:1;font-size:11px">Outstanding</div><strong style="font-size:12px;color:var(--r)">${fmt(outstandingTotal)}</strong></div>
    </div>
   </div>`;
   })()}
  </div>
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-bolt"></i>Quick Actions</div></div>
   <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:7px">
    ${[['ti-user-plus','Add\nStudent','mAddStu()'],['ti-calendar-check','Attendance',"V('attendance')"],['ti-receipt','Invoice','mAddInv()'],['ti-brand-whatsapp','WhatsApp','openWA()'],['ti-certificate','Reports','mGenReports()'],['ti-clipboard-plus','Admissions',"V('admissions')"],['ti-chart-bar','Analytics',"V('analytics')"],['ti-speakerphone','Announce','mNewAnn()']].map(([ic,lbl,fn])=>`
    <div onclick="${fn}" style="background:var(--sp);border:1px solid var(--sb);border-radius:8px;padding:10px 5px;text-align:center;cursor:pointer;transition:all .15s" onmouseover="this.style.background='var(--gp)';this.style.borderColor='var(--g)'" onmouseout="this.style.background='var(--sp)';this.style.borderColor='var(--sb)'">
     <i class="ti ${ic}" style="font-size:19px;color:var(--g);display:block;margin-bottom:4px"></i>
     <span style="font-size:9px;color:var(--sl);font-weight:600;line-height:1.3;display:block">${lbl.replace('\n','<br>')}</span>
    </div>`).join('')}
   </div>
  </div>
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-alert-circle" style="color:var(--r)"></i>Fee Defaulters — Priority List</div>
   <div class="flex g8">
    <button class="btn btn-w" onclick="T('WhatsApp reminders sent to all defaulters','wa')"><i class="ti ti-brand-whatsapp" style="font-size:12px"></i>Remind All via WhatsApp</button>
    <button class="btn btn-g" onclick="V('fees')">View All Invoices</button>
   </div>
  </div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Student</th><th>Class</th><th>Amount Due</th><th>Days Overdue</th><th>Actions</th></tr></thead><tbody>
  ${D.invoices.filter(i=>i.status!=='paid').map(inv=>{const s=D.students.find(x=>x.name===inv.student);const bal=inv.amount-inv.paid;const d=inv.status==='overdue'?21:7;return`<tr>
   <td><div class="flex ic g8"><div class="av av-s" style="background:${s?.bg};color:${s?.fg}">${s?.ini}</div><span style="font-weight:600">${inv.student}</span></div></td>
   <td>${inv.cls}</td>
   <td style="font-weight:700;color:var(--r)">${fmt(bal)}</td>
   <td><span class="pill ${d>14?'pr':'pa'}">${d} days</span></td>
   <td><div class="flex g6">
    <div class="pay-btn" onclick="T('PayFast link sent for ${fmt(bal)}','success')"><i class="ti ti-link"></i>PayFast Link</div>
    <i class="ti ti-brand-whatsapp act" style="color:var(--wd)" onclick="T('WhatsApp reminder sent to parent','wa')"></i>
    <i class="ti ti-mail act" onclick="T('Email reminder sent','success')"></i>
   </div></td>
  </tr>`;}).join('')}
  </tbody></table></div>
 </div>`;
 aN('sv1',D.students.length);aN('sv2',activeTeachers);
 let a=0,f=0;
 const at=setInterval(()=>{a=Math.min(a+3,avgAtt);const e=document.getElementById('sv3');if(e)e.textContent=a+'%';if(a>=avgAtt)clearInterval(at);},32);
 const ft=setInterval(()=>{f=Math.min(f+800,totalOutstanding);const e=document.getElementById('sv4');if(e)e.textContent=fmt(f);if(f>=totalOutstanding)clearInterval(ft);},22);
 if(avgAtt===0){const e=document.getElementById('sv3');if(e)e.textContent='0%';}
 if(totalOutstanding===0){const e=document.getElementById('sv4');if(e)e.textContent='R0';}
 const cls=D.classes.map(c=>{const stus=D.students.filter(s=>s.cls===c.name);const p=stus.length?Math.round(stus.reduce((a,s)=>a+s.att,0)/stus.length):0;return{l:c.name,p,c:p>=90?'var(--g)':'var(--a)'};});
 document.getElementById('attBars').innerHTML=cls.length?cls.map(c=>`<div class="flex ic g8" style="margin-bottom:8px"><span style="width:70px;font-size:11px">${c.l}</span><div class="pw-bar" style="flex:1"><div class="pb-bar" style="width:0%;background:${c.c}" data-w="${c.p}"></div></div><span class="tsm" style="width:28px;text-align:right">${c.p}%</span></div>`).join(''):'<div class="tsm">No classes yet.</div>';
 setTimeout(()=>document.querySelectorAll('.pb-bar').forEach(b=>{b.style.width=b.dataset.w+'%';}),80);
}

function rTeacherDash(area){
 const t=myTeacher();
 if(!t){
  area.innerHTML=`<div class="card" style="text-align:center;padding:40px 20px"><div class="tsm">Your teacher record isn't linked yet. Contact your school admin.</div></div>`;
  return;
 }
 const myClasses=t.classes;
 const myStudents=D.students.filter(s=>myClasses.includes(s.cls));
 const atRisk=myStudents.filter(s=>s.att<85||s.grade==='F');
 const myHomework=D.homework.filter(h=>myClasses.includes(h.cls));
 area.innerHTML=`
 <div class="alert-banner">
  <span style="font-size:9px;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.5px;margin-right:3px">Alerts</span>
  <div class="al-item red" onclick="V('attendance')"><i class="ti ti-user-exclamation"></i>${atRisk.length} of my students need attention</div>
  <div class="al-item amb" onclick="V('homework')"><i class="ti ti-notebook"></i>${myHomework.filter(h=>h.status==='overdue').length} overdue homework items</div>
 </div>
 <div class="g3 mb18">
  <div class="sc" onclick="V('classes')"><div class="sc-icon ig"><i class="ti ti-school"></i></div><div class="sc-val">${myClasses.length}</div><div class="sc-lbl">My Classes</div></div>
  <div class="sc" onclick="V('students')"><div class="sc-icon ib"><i class="ti ti-users"></i></div><div class="sc-val">${myStudents.length}</div><div class="sc-lbl">My Students</div></div>
  <div class="sc" onclick="V('attendance')"><div class="sc-icon ia"><i class="ti ti-calendar-check"></i></div><div class="sc-val">${myStudents.length?Math.round(myStudents.reduce((a,s)=>a+s.att,0)/myStudents.length):0}%</div><div class="sc-lbl">My Classes' Attendance</div></div>
 </div>
 <div class="g2 mb18">
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-alert-triangle" style="color:var(--r)"></i>At-Risk Students</div></div>
   ${atRisk.length?atRisk.map(s=>`<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--sp);cursor:pointer" onclick='openSP(${JSON.stringify(s).replace(/"/g,"'")})'>
    <div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div>
    <div style="flex:1"><div style="font-size:12px;font-weight:600">${s.name} <span class="pill ${gc(s.grade)}">${s.grade}</span></div>
    <div class="tsm">${s.cls} · Att: <span style="color:${s.att<80?'var(--r)':'var(--ad)'};font-weight:600">${s.att}%</span></div></div>
   </div>`).join(''):'<div class="tsm" style="padding:8px 0">No students at risk right now.</div>'}
  </div>
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-bolt"></i>Quick Actions</div></div>
   <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px">
    ${[['ti-calendar-check','Attendance',"V('attendance')"],['ti-notebook','Homework','mSetHomework()'],['ti-certificate','Reports','V(\'reportcards\')'],['ti-send','Message','mNewMsg()'],['ti-book','Mark Sheet',"V('subjects')"],['ti-calendar-time','Timetable',"V('timetable')"]].map(([ic,lbl,fn])=>`
    <div onclick="${fn}" style="background:var(--sp);border:1px solid var(--sb);border-radius:8px;padding:10px 5px;text-align:center;cursor:pointer;transition:all .15s" onmouseover="this.style.background='var(--gp)';this.style.borderColor='var(--g)'" onmouseout="this.style.background='var(--sp)';this.style.borderColor='var(--sb)'">
     <i class="ti ${ic}" style="font-size:19px;color:var(--g);display:block;margin-bottom:4px"></i>
     <span style="font-size:9px;color:var(--sl);font-weight:600;line-height:1.3;display:block">${lbl}</span>
    </div>`).join('')}
   </div>
  </div>
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-school"></i>My Classes</div></div>
  ${myClasses.map(cn=>{const c=D.classes.find(x=>x.name===cn);const stus=D.students.filter(s=>s.cls===cn);const avg=stus.length?Math.round(stus.reduce((a,s)=>a+s.avg,0)/stus.length):0;return`<div class="flex ic g8" style="padding:9px 0;border-bottom:1px solid var(--sp);cursor:pointer" onclick="openCls('${cn}')">
   <div style="flex:1"><div style="font-weight:600;font-size:12px">${cn}</div><div class="tsm">${c?c.room:''} · ${stus.length} students</div></div>
   <span class="pill ${avg>=75?'pg':avg>=60?'pa':'pr'}">${avg}% avg</span>
  </div>`;}).join('')}
 </div>`;
}

