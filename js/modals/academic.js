function mEditTT(classId){OM('Edit Timetable',`
 <div class="fr"><div class="fg"><div class="fl">Class</div><select class="fs" id="ettCls">${D.classes.map(c=>`<option value="${c._id}" ${c._id===classId?'selected':''}>${c.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Day</div><select class="fs" id="ettDay">${TT_DAYS.map(d=>`<option>${d}</option>`).join('')}</select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Period</div><select class="fs" id="ettPeriod">${TT_PERIODS.filter(p=>p.l!=='Break').map(p=>`<option>${p.l}</option>`).join('')}</select></div><div class="fg"><div class="fl">Subject</div><select class="fs" id="ettSub">${SUBS.map(s=>`<option>${s}</option>`).join('')}</select></div></div>
 <div class="fg"><div class="fl">Teacher</div><select class="fs" id="ettTeacher"><option value="">Unassigned</option>${D.teachers.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}</select></div>
 <div class="tsm" style="margin-top:4px">Saves one lesson slot at a time — repeat to build up the full week.</div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="ettSubmitBtn" onclick="submitEditTT()"><i class="ti ti-calendar-check" style="font-size:11px"></i>Save Slot</button>`);}

async function submitEditTT(){
 const classId=document.getElementById('ettCls').value;
 const day=document.getElementById('ettDay').value;
 const period=document.getElementById('ettPeriod').value;
 const subject=document.getElementById('ettSub').value;
 const teacherId=document.getElementById('ettTeacher').value;
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 if(!classId||!schoolId){T('No school context — please re-login','error');return;}
 const btn=document.getElementById('ettSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Saving...';}
 try{
  const {error}=await sb.from('timetable_slots').upsert({
   school_id:schoolId,class_id:classId,day,period,subject,teacher_id:teacherId||null
  },{onConflict:'class_id,day,period'});
  if(error)throw error;
  T('Timetable slot saved','success');
  CM();
  await loadSchoolData(schoolId);
  if(CV==='timetable')V('timetable');
 }catch(err){
  T(err.message||'Failed to save timetable slot','error');
  if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-calendar-check" style="font-size:11px"></i>Save Slot';}
 }
}

function mUploadMarks(){
 const availClasses=CU_ROLE==='teacher'?D.classes.filter(c=>myTeacherClasses().includes(c.name)):D.classes;
 OM('Upload Marks',`
 <div class="fr"><div class="fg"><div class="fl">Class</div><select class="fs" id="umCls" onchange="umRenderStudents()">${availClasses.map(c=>`<option value="${c._id}">${c.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Subject</div><select class="fs" id="umSub">${SUBS.map(s=>`<option>${s}</option>`).join('')}</select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Term</div><select class="fs" id="umTerm"><option>Term 1</option><option>Term 2</option><option selected>Term 3</option></select></div><div class="fg"><div class="fl">Out of</div><input class="fi" id="umOutOf" type="number" value="100"></div></div>
 <div id="umStudents" style="max-height:260px;overflow-y:auto;margin-top:8px"></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="umSubmitBtn" onclick="submitUploadMarks()"><i class="ti ti-upload" style="font-size:11px"></i>Save Marks</button>`);
 umRenderStudents();
}

function umRenderStudents(){
 const wrap=document.getElementById('umStudents');
 if(!wrap)return;
 const classId=document.getElementById('umCls').value;
 const cls=D.classes.find(c=>c._id===classId);
 const stus=cls?D.students.filter(s=>s.cls===cls.name):[];
 wrap.innerHTML=stus.length?stus.map(s=>`
  <div class="flex ic g8" style="padding:6px 0;border-bottom:1px solid var(--sp)">
   <div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div>
   <span style="flex:1;font-size:12px;font-weight:500">${s.name}</span>
   <input class="fi" data-stu="${s.id}" type="number" style="width:70px;height:28px" placeholder="Mark">
  </div>`).join(''):'<div class="tsm" style="padding:10px 0">No students in this class.</div>';
}

async function submitUploadMarks(){
 const classId=document.getElementById('umCls').value;
 const subject=document.getElementById('umSub').value;
 const term=document.getElementById('umTerm').value;
 const outOf=parseFloat(document.getElementById('umOutOf').value)||100;
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 if(!schoolId){T('No school context — please re-login','error');return;}
 const inputs=[...document.querySelectorAll('#umStudents input[data-stu]')];
 const rows=inputs.filter(i=>i.value!=='').map(i=>({
  school_id:schoolId,student_id:i.dataset.stu,class_id:classId||null,
  subject,term,mark:parseFloat(i.value),out_of:outOf,teacher_id:CU_PROFILE?.id||null
 }));
 if(!rows.length){T('Enter at least one mark','error');return;}
 const btn=document.getElementById('umSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Saving...';}
 try{
  const {error}=await sb.from('marks').upsert(rows,{onConflict:'student_id,subject,term'});
  if(error)throw error;
  T('Marks saved','success');
  CM();
  await loadSchoolData(schoolId);
  if(CV==='subjects')V('subjects');
 }catch(err){
  T(err.message||'Failed to save marks','error');
  if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-upload" style="font-size:11px"></i>Save Marks';}
 }
}

function mImportCSV(){OM('Import Students via CSV',`
 <div class="drop-zone" onclick="document.getElementById('icFile').click()"><input type="file" id="icFile" accept=".csv" style="display:none" onchange="document.getElementById('icFileName').textContent=this.files[0]?this.files[0].name:'No file selected'"><i class="ti ti-file-spreadsheet" style="font-size:28px;color:var(--gl);display:block;margin-bottom:6px"></i><div style="font-weight:600;font-size:12px;color:var(--s)">Upload students CSV file</div><div class="tsm" id="icFileName">Download our template first · max 500 rows per import</div></div>
 <button class="btn btn-s w100" style="margin-top:8px;justify-content:center" onclick="downloadCsvTemplate()"><i class="ti ti-download" style="font-size:11px"></i>Download CSV Template</button>
 <div style="background:var(--ap);border:1px solid var(--a);border-radius:7px;padding:9px 12px;font-size:11px;color:var(--ad);margin-top:10px"><i class="ti ti-info-circle" style="margin-right:4px"></i>Required columns: First Name, Last Name, DOB, Gender, Class. Class must match an existing class name exactly. Existing students are matched by first+last name and skipped.</div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="icSubmitBtn" onclick="submitImportCSV()"><i class="ti ti-upload" style="font-size:11px"></i>Import Students</button>`);}

function downloadCsvTemplate(){
 const csv='First Name,Last Name,DOB,Gender,Class\nAmahle,Dlamini,2015-03-12,Female,Grade 4A\n';
 const blob=new Blob([csv],{type:'text/csv'});
 const url=URL.createObjectURL(blob);
 const a=document.createElement('a');
 a.href=url;a.download='students_template.csv';a.click();
 URL.revokeObjectURL(url);
}

function parseCsv(text){
 const lines=text.split(/\r?\n/).filter(l=>l.trim()!=='');
 if(!lines.length)return[];
 const headers=lines[0].split(',').map(h=>h.trim().toLowerCase());
 return lines.slice(1).map(line=>{
  const cells=line.split(',').map(c=>c.trim());
  const row={};
  headers.forEach((h,i)=>row[h]=cells[i]||'');
  return row;
 });
}

async function submitImportCSV(){
 const file=document.getElementById('icFile').files[0];
 if(!file){T('Choose a CSV file','error');return;}
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 if(!schoolId){T('No school context — please re-login','error');return;}
 const btn=document.getElementById('icSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Importing...';}
 try{
  const text=await file.text();
  const rows=parseCsv(text).slice(0,500);
  if(!rows.length)throw new Error('CSV has no data rows');
  const classByName={};
  D.classes.forEach(c=>{classByName[c.name.toLowerCase()]=c._id;});
  const existing=new Set(D.students.map(s=>s.name.toLowerCase()));
  const toInsert=[];
  let skipped=0;
  for(const r of rows){
   const first=r['first name']||'';
   const last=r['last name']||'';
   if(!first||!last)continue;
   const fullName=`${first} ${last}`.toLowerCase();
   if(existing.has(fullName)){skipped++;continue;}
   toInsert.push({
    school_id:schoolId,first_name:first,last_name:last,
    dob:r['dob']||null,gender:r['gender']||null,
    class_id:classByName[(r['class']||'').toLowerCase()]||null,
    status:'active'
   });
  }
  if(!toInsert.length){T('No new students to import (all rows skipped or invalid)','error');if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-upload" style="font-size:11px"></i>Import Students';}return;}
  const {error}=await sb.from('students').insert(toInsert);
  if(error)throw error;
  T(`${toInsert.length} student${toInsert.length===1?'':'s'} imported${skipped?`, ${skipped} skipped (already exist)`:''}`,'success');
  CM();
  await loadSchoolData(schoolId);
  if(CV==='students')V('students');
 }catch(err){
  T(err.message||'Failed to import CSV','error');
  if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-upload" style="font-size:11px"></i>Import Students';}
 }
}

