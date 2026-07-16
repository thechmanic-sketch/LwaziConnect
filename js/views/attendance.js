function rAttendance(area,clsName){
 const isTeacher=CU_ROLE==='teacher';
 const availClasses=isTeacher?D.classes.filter(c=>myTeacherClasses().includes(c.name)):D.classes;
 const cls=clsName||(availClasses[0]&&availClasses[0].name)||'Grade 7A';
 const clsStudents=D.students.filter(s=>s.cls===cls);
 const atRiskInClass=clsStudents.filter(s=>s.att<80).sort((a,b)=>a.att-b.att)[0];
 area.innerHTML=`
 <div class="g4 mb18">
  <div class="sc"><div class="sc-icon ig"><i class="ti ti-users"></i></div><div class="sc-val">0</div><div class="sc-lbl">Present today</div></div>
  <div class="sc"><div class="sc-icon ir"><i class="ti ti-user-x"></i></div><div class="sc-val">0</div><div class="sc-lbl">Absent today</div></div>
  <div class="sc"><div class="sc-icon ia"><i class="ti ti-clock"></i></div><div class="sc-val">0</div><div class="sc-lbl">Late arrivals</div></div>
  <div class="sc"><div class="sc-icon ib"><i class="ti ti-chart-bar"></i></div><div class="sc-val">${D.students.length?Math.round(D.students.reduce((a,s)=>a+s.att,0)/D.students.length):0}%</div><div class="sc-lbl">Term avg</div><div class="sc-trend tw"><i class="ti ti-target" style="font-size:10px"></i>Target: 95%</div></div>
 </div>
 <div class="g2 mb18">
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-calendar-check"></i>Mark — ${cls}</div>
    <div class="flex g8"><select class="fs" style="width:130px;height:26px;font-size:11px" onchange="rAttendance(null,this.value)">${availClasses.map(c=>`<option ${c.name===cls?'selected':''}>${c.name}</option>`).join('')}</select><input class="fi" id="attDate" type="date" style="width:130px;height:26px;font-size:11px" value="${new Date().toISOString().split('T')[0]}"><button class="btn btn-g" id="attSaveBtn" style="height:26px;font-size:10px" onclick="submitAttendanceView('${cls}')"><i class="ti ti-check" style="font-size:10px"></i>Save</button></div>
   </div>
   <div style="max-height:290px;overflow-y:auto">
   ${clsStudents.length?clsStudents.map(s=>`
    <div class="flex ic g8" style="padding:6px 0;border-bottom:1px solid var(--sp)">
     <div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div>
     <span style="flex:1;font-size:12px;font-weight:500">${s.name}</span>
     ${[['P','Present'],['A','Absent'],['L','Late'],['E','Excused'],['S','Sick']].map(([o,lbl])=>`<label title="${lbl}" style="cursor:pointer"><input type="radio" name="a_${s.id}" value="${o}" ${o==='P'?'checked':''} style="display:none"><div class="att-cell att-${o}">${o}</div></label>`).join('')}
    </div>`).join(''):'<div class="tsm" style="padding:10px 0">No students in this class.</div>'}
   </div>
  </div>
  <div class="card">
   <div class="card-head"><div class="card-title"><i class="ti ti-calendar-stats"></i>${cls}</div></div>
   <div class="tsm" style="margin-bottom:10px">Class average attendance: <strong>${clsStudents.length?Math.round(clsStudents.reduce((a,s)=>a+s.att,0)/clsStudents.length):0}%</strong></div>
   ${atRiskInClass?`<div style="background:var(--rp);border:1px solid var(--r);border-radius:7px;padding:8px 11px;font-size:11px;color:var(--rm)">
    <i class="ti ti-alert-triangle" style="margin-right:4px"></i><strong>${atRiskInClass.name}</strong> at ${atRiskInClass.att}% — below threshold. <strong>WhatsApp auto-alert sent to parent.</strong>
   </div>`:`<div style="background:var(--gp);border:1px solid var(--gl);border-radius:7px;padding:8px 11px;font-size:11px;color:var(--g)"><i class="ti ti-circle-check" style="margin-right:4px"></i>No students below the 80% attendance threshold in this class.</div>`}
  </div>
 </div>`;
}

async function submitAttendanceView(clsName){
 const date=document.getElementById('attDate').value;
 if(!date){T('Pick a date','error');return;}
 const cls=D.classes.find(c=>c.name===clsName);
 const stus=D.students.filter(s=>s.cls===clsName);
 if(!stus.length){T('No students in this class','error');return;}
 const statusMap={P:'present',A:'absent',L:'late',E:'excused',S:'sick'};
 const rows=stus.map(s=>{
  const checked=document.querySelector(`input[name="a_${s.id}"]:checked`);
  const code=checked?checked.value:'P';
  return {school_id:CU_SCHOOL?.id||CU_PROFILE?.school_id,student_id:s.id,class_id:cls?cls._id:null,date,status:statusMap[code],marked_by:CU_PROFILE?.id||null};
 });
 const btn=document.getElementById('attSaveBtn');
 if(btn){btn.disabled=true;btn.textContent='Saving...';}
 try{
  const {error}=await sb.from('attendance_records').upsert(rows,{onConflict:'student_id,date'});
  if(error)throw error;
  T('Attendance saved','success');
  if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-check" style="font-size:10px"></i>Save';}
 }catch(err){
  T(err.message||'Failed to save attendance','error');
  if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-check" style="font-size:10px"></i>Save';}
 }
}

