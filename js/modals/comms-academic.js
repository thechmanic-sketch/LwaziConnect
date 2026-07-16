function mNewMsg(){OM('New Message',`
 <div class="fg"><div class="fl">Send To</div><select class="fs"><option>All Parents</option>${D.classes.map(c=>`<option>${c.name} Parents</option>`).join('')}${D.parents.map(p=>`<option>${p.name}</option>`).join('')}${D.teachers.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}</select></div>
 <div class="fg"><div class="fl">Subject</div><input class="fi" placeholder="Message subject..."></div>
 <div class="fg"><div class="fl">Message</div><textarea class="fta" style="height:90px" placeholder="Type message..."></textarea></div>
 <div style="display:flex;gap:10px;flex-wrap:wrap">
  <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--wd)"><i class="ti ti-brand-whatsapp" style="color:var(--wd)"></i>WhatsApp</label>
  <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--g)">Email</label>
  <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" style="accent-color:var(--b)">SMS</label>
 </div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-w" onclick="T('Message sent via WhatsApp + Email','wa');CM()"><i class="ti ti-send" style="font-size:11px"></i>Send Message</button>`);}

function mNewAnn(){OM('New Announcement',`
 <div class="fg"><div class="fl">Title</div><input class="fi" placeholder="Announcement title..."></div>
 <div class="fr"><div class="fg"><div class="fl">Category</div><select class="fs"><option>Urgent</option><option>Academic</option><option>Events</option><option>Finance</option><option>General</option></select></div><div class="fg"><div class="fl">Audience</div><select class="fs"><option>All</option><option>All Parents</option><option>Teachers only</option><option>Students only</option></select></div></div>
 <div class="fg"><div class="fl">Message</div><textarea class="fta" style="height:90px" placeholder="Announcement body..."></textarea></div>
 <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:5px">
  <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--wd)"><i class="ti ti-brand-whatsapp" style="color:var(--wd)"></i>WhatsApp</label>
  <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--g)">Email</label>
  <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" style="accent-color:var(--g)">In-app</label>
  <label style="display:flex;align-items:center;gap:5px;font-size:12px;cursor:pointer"><input type="checkbox" style="accent-color:var(--b)">Include RSVP button</label>
 </div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-w" onclick="T('Announcement published and sent via WhatsApp to all recipients','wa');CM()"><i class="ti ti-speakerphone" style="font-size:11px"></i>Publish & Send</button>`);}

function mUploadDoc(){OM('Upload Document',`
 <div class="drop-zone" onclick="T('File picker opened','')"><i class="ti ti-cloud-upload" style="font-size:30px;color:var(--gl);display:block;margin-bottom:7px"></i><div style="font-weight:600;font-size:13px;color:var(--s);margin-bottom:3px">Click to upload or drag and drop</div><div class="tsm">PDF, DOCX, XLSX, JPG — max 10MB</div></div>
 <div class="fr" style="margin-top:10px"><div class="fg"><div class="fl">Category</div><select class="fs"><option>Forms</option><option>Finance</option><option>Policies</option><option>Academic</option><option>HR</option></select></div><div class="fg"><div class="fl">Access Level</div><select class="fs"><option>All</option><option>Parents</option><option>Staff</option><option>Admin only</option></select></div></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Document uploaded','success');CM()"><i class="ti ti-upload" style="font-size:11px"></i>Upload</button>`);}

function mAddClass(){OM('Add Class',`
 <div class="fr"><div class="fg"><div class="fl">Class Name</div><input class="fi" id="acName" placeholder="e.g. Grade 4A"></div><div class="fg"><div class="fl">Room</div><input class="fi" id="acRoom" placeholder="e.g. Room 5"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Class Teacher</div><select class="fs" id="acTeacher"><option value="">Unassigned</option>${D.teachers.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Max Capacity</div><input class="fi" id="acCap" type="number" placeholder="35"></div></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="acSubmitBtn" onclick="submitAddClass()">Create Class</button>`);}

async function submitAddClass(){
 const name=document.getElementById('acName').value.trim();
 const room=document.getElementById('acRoom').value.trim();
 const teacherId=document.getElementById('acTeacher').value;
 const capacity=parseInt(document.getElementById('acCap').value)||null;
 if(!name){T('Enter a class name','error');return;}
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 if(!schoolId){T('No school context — please re-login','error');return;}
 const btn=document.getElementById('acSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Creating...';}
 try{
  const {data:newClass,error}=await sb.from('classes').insert({
   school_id:schoolId,name,room:room||null,capacity,
   homeroom_teacher_id:teacherId||null
  }).select().single();
  if(error)throw error;
  if(teacherId&&newClass){
   const {error:tcErr}=await sb.from('teacher_classes').insert({
    teacher_id:teacherId,class_id:newClass.id
   });
   if(tcErr)throw tcErr;
  }
  T('Class created','success');
  CM();
  await loadSchoolData(schoolId);
  V(CV);
 }catch(err){
  T(err.message||'Failed to create class','error');
  if(btn){btn.disabled=false;btn.textContent='Create Class';}
 }
}

function mMarkAtt(){
 const isTeacher=CU_ROLE==='teacher';
 const availClasses=isTeacher?D.classes.filter(c=>myTeacherClasses().includes(c.name)):D.classes;
 const first=(availClasses[0]&&availClasses[0].name)||'';
 OM('Mark Attendance',`
 <div class="fr" style="margin-bottom:10px"><div class="fg" style="margin-bottom:0"><div class="fl">Class</div><select class="fs" id="maClsSel" onchange="maFilterStudents(this.value)">${availClasses.map(c=>`<option>${c.name}</option>`).join('')}</select></div><div class="fg" style="margin-bottom:0"><div class="fl">Date</div><input class="fi" id="maDate" type="date" value="${new Date().toISOString().split('T')[0]}"></div></div>
 <div style="max-height:250px;overflow-y:auto" id="maStuList">${maStudentRows(first)}</div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-w" id="maSubmitBtn" onclick="submitAttendance()"><i class="ti ti-check" style="font-size:11px"></i>Save Attendance</button>`);}
function maStudentRows(clsName){
 const stus=D.students.filter(s=>s.cls===clsName);
 if(!stus.length)return '<div class="tsm" style="padding:10px 0">No students in this class.</div>';
 return stus.map(s=>`<div class="flex ic g8" style="padding:6px 0;border-bottom:1px solid var(--sp)"><div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div><span style="flex:1;font-size:12px;font-weight:500">${s.name}</span>${[['P','Present'],['A','Absent'],['L','Late'],['E','Excused'],['S','Sick']].map(([o,lbl])=>`<label title="${lbl}" style="cursor:pointer"><input type="radio" name="ma_${s.id}" value="${o}" ${o==='P'?'checked':''} style="display:none"><div class="att-cell att-${o}">${o}</div></label>`).join('')}</div>`).join('');
}
function maFilterStudents(clsName){const el=document.getElementById('maStuList');if(el)el.innerHTML=maStudentRows(clsName);}

async function submitAttendance(){
 const clsName=document.getElementById('maClsSel').value;
 const date=document.getElementById('maDate').value;
 if(!date){T('Pick a date','error');return;}
 const cls=D.classes.find(c=>c.name===clsName);
 const stus=D.students.filter(s=>s.cls===clsName);
 if(!stus.length){T('No students in this class','error');return;}
 const statusMap={P:'present',A:'absent',L:'late',E:'excused',S:'sick'};
 const rows=stus.map(s=>{
  const checked=document.querySelector(`input[name="ma_${s.id}"]:checked`);
  const code=checked?checked.value:'P';
  return {school_id:CU_SCHOOL?.id||CU_PROFILE?.school_id,student_id:s.id,class_id:cls?cls._id:null,date,status:statusMap[code],marked_by:CU_PROFILE?.id||null};
 });
 const btn=document.getElementById('maSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Saving...';}
 try{
  const {error}=await sb.from('attendance_records').upsert(rows,{onConflict:'student_id,date'});
  if(error)throw error;
  T('Attendance saved','success');
  CM();
  if(CV==='attendance')V('attendance');
 }catch(err){
  T(err.message||'Failed to save attendance','error');
  if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-check" style="font-size:11px"></i>Save Attendance';}
 }
}

function mGenReports(){
 const isTeacher=CU_ROLE==='teacher';
 const availClasses=isTeacher?D.classes.filter(c=>myTeacherClasses().includes(c.name)):D.classes;
 const first=(availClasses[0]&&availClasses[0].name)||'Grade 7A';
 OM('Bulk Generate Report Cards',`
 <div class="fg"><div class="fl">Class</div><select class="fs" id="grClsSel" onchange="grUpdateCount(this.value)">${availClasses.map(c=>`<option>${c.name}</option>`).join('')}</select></div>
 <div class="fg"><div class="fl">Term</div><select class="fs"><option>Term 3 — 2025</option><option>Term 2</option><option>Term 1</option></select></div>
 <div style="display:flex;flex-direction:column;gap:7px;margin-bottom:10px">
  <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--g)">Generate PDF report cards</label>
  <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--wd)"><i class="ti ti-brand-whatsapp" style="color:var(--wd)"></i>Send via WhatsApp to all parents</label>
  <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--g)">Email to parents</label>
  <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" style="accent-color:var(--b)">Track parent acknowledgement</label>
 </div>
 <div style="background:var(--ap);border:1px solid var(--a);border-radius:7px;padding:9px 12px;font-size:11px;color:var(--ad)" id="grCountBox"><i class="ti ti-info-circle" style="margin-right:4px"></i>This will generate report cards for all <span id="grCount">${D.students.filter(s=>s.cls===first).length}</span> students in ${first} and send via WhatsApp + email.</div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-w" onclick="T(document.getElementById('grCount').textContent+' report cards generated. Sending via WhatsApp to all parents...','wa');CM()"><i class="ti ti-certificate" style="font-size:11px"></i>Generate & Send All</button>`);}
function grUpdateCount(clsName){
 const n=D.students.filter(s=>s.cls===clsName).length;
 const countEl=document.getElementById('grCount');if(countEl)countEl.textContent=n;
 const box=document.getElementById('grCountBox');
 if(box)box.innerHTML=`<i class="ti ti-info-circle" style="margin-right:4px"></i>This will generate report cards for all <span id="grCount">${n}</span> students in ${clsName} and send via WhatsApp + email.`;
}

function mAddEvent(){OM('Add Calendar Event',`
 <div class="fg"><div class="fl">Event Title</div><input class="fi" placeholder="e.g. Grade 7 Science Projects"></div>
 <div class="fr"><div class="fg"><div class="fl">Date</div><input class="fi" type="date"></div><div class="fg"><div class="fl">Type</div><select class="fs"><option>Academic</option><option>Exam</option><option>Event</option><option>Holiday</option></select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Applicable to</div><select class="fs"><option>All</option>${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Notify via WhatsApp</div><select class="fs"><option>Yes</option><option>No</option></select></div></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Event added. Parents notified.','success');CM()">Add Event</button>`);}

function mAddHealth(){OM('Add Health Record',`
 <div class="fg"><div class="fl">Student</div><select class="fs">${D.students.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
 <div class="fr"><div class="fg"><div class="fl">Medical Condition</div><input class="fi" placeholder="e.g. Asthma or None"></div><div class="fg"><div class="fl">Allergy</div><input class="fi" placeholder="e.g. Peanuts or None"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Blood Type</div><select class="fs"><option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option></select></div><div class="fg"><div class="fl">Medical Aid</div><input class="fi" placeholder="e.g. Discovery Kids"></div></div>
 <div class="fg"><div class="fl">Emergency Contact</div><input class="fi" placeholder="e.g. 071 xxx xxxx (Parent name)"></div>
 <div class="fg"><div class="fl">Family Doctor</div><input class="fi" placeholder="Dr. Name — 031 xxx xxxx"></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Health record saved','success');CM()">Save Record</button>`);}

function mLogInc(){OM('Log Discipline Incident',`
 <div class="fr"><div class="fg"><div class="fl">Student</div><select class="fs">${D.students.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Type</div><select class="fs"><option>Misconduct</option><option>Late</option><option>Absent</option><option>Bullying</option><option>Other</option></select></div></div>
 <div class="fg"><div class="fl">Description</div><textarea class="fta" placeholder="Describe the incident..."></textarea></div>
 <div class="fr"><div class="fg"><div class="fl">Date</div><input class="fi" type="date" value="${new Date().toISOString().split('T')[0]}"></div><div class="fg"><div class="fl">Reported by</div><select class="fs">${D.teachers.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}</select></div></div>
 <div class="fg"><div class="fl">Action Taken</div><input class="fi" placeholder="e.g. Verbal warning, Parent notified"></div>
 <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;margin-top:5px"><input type="checkbox" checked style="accent-color:var(--wd)"><i class="ti ti-brand-whatsapp" style="color:var(--wd)"></i>Notify parent via WhatsApp</label>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Incident logged. Parent notified via WhatsApp.','wa');CM()">Log Incident</button>`);}

