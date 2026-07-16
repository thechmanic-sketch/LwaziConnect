function mSetHomework(){
 const availClasses=CU_ROLE==='teacher'?D.classes.filter(c=>myTeacherClasses().includes(c.name)):D.classes;
 OM('Set Homework',`
 <div class="fr"><div class="fg"><div class="fl">Class</div><select class="fs" id="shwCls">${availClasses.map(c=>`<option value="${c._id}">${c.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Subject</div><select class="fs" id="shwSub">${SUBS.map(s=>`<option>${s}</option>`).join('')}</select></div></div>
 <div class="fg"><div class="fl">Assignment Title</div><input class="fi" id="shwTitle" placeholder="e.g. Algebra Worksheet — Chapter 4"></div>
 <div class="fr"><div class="fg"><div class="fl">Due Date</div><input class="fi" id="shwDue" type="date"></div><div class="fg"><div class="fl">Attachment</div><button class="btn btn-s w100" style="justify-content:center" onclick="T('File attached','success')"><i class="ti ti-paperclip" style="font-size:11px"></i>Attach File</button></div></div>
 <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--wd)"><i class="ti ti-brand-whatsapp" style="color:var(--wd)"></i>Notify parents via WhatsApp</label>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="shwSubmitBtn" onclick="submitSetHomework()"><i class="ti ti-notebook" style="font-size:11px"></i>Set Homework</button>`);}

async function submitSetHomework(){
 const classId=document.getElementById('shwCls').value;
 const subject=document.getElementById('shwSub').value;
 const title=document.getElementById('shwTitle').value.trim();
 const dueDate=document.getElementById('shwDue').value;
 if(!classId){T('Select a class','error');return;}
 if(!title){T('Enter an assignment title','error');return;}
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 if(!schoolId||!CU_PROFILE){T('No school context — please re-login','error');return;}
 const btn=document.getElementById('shwSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Saving...';}
 try{
  const {error}=await sb.from('homework').insert({
   school_id:schoolId,class_id:classId,teacher_id:CU_PROFILE.id,
   subject,title,due_date:dueDate||null,status:'active'
  });
  if(error)throw error;
  T('Homework set','success');
  CM();
  if(typeof V==='function')V(CV);
 }catch(err){
  T(err.message||'Failed to set homework','error');
  if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-notebook" style="font-size:11px"></i>Set Homework';}
 }
}

function mNewBroadcast(){OM('New Broadcast',`
 <div class="fr"><div class="fg"><div class="fl">Channel</div><select class="fs"><option>WhatsApp</option><option>Email</option><option>SMS</option><option>All Channels</option></select></div><div class="fg"><div class="fl">Audience</div><select class="fs"><option>All Parents</option><option>All Staff</option>${D.classes.map(c=>`<option>${c.name} Parents</option>`).join('')}</select></div></div>
 <div class="fg"><div class="fl">Message</div><textarea class="fta" placeholder="Type your message..."></textarea></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-w" onclick="T('Broadcast sent','wa');CM()"><i class="ti ti-send" style="font-size:11px"></i>Send Now</button>`);}

function mAddStaff(){OM('Add Staff Member',`
 <div class="fr"><div class="fg"><div class="fl">Full Name</div><input class="fi" id="asfName" placeholder="Staff name"></div><div class="fg"><div class="fl">Role</div><input class="fi" id="asfRole" placeholder="e.g. Teacher — Mathematics"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Department</div><select class="fs" id="asfDept"><option>Academic</option><option>Admin</option><option>Operations</option><option>Management</option></select></div><div class="fg"><div class="fl">Contract Type</div><select class="fs" id="asfContract"><option>Permanent</option><option>Fixed-term</option><option>Part-time</option></select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Start Date</div><input class="fi" id="asfStart" type="date"></div><div class="fg"><div class="fl">Qualifications</div><input class="fi" id="asfQual" placeholder="e.g. B.Ed Hons"></div></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="asfSubmitBtn" onclick="submitAddStaff()">Add Staff Member</button>`);}

async function submitAddStaff(){
 const name=document.getElementById('asfName').value.trim();
 if(!name){T('Enter a staff name','error');return;}
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 if(!schoolId){T('No school context — please re-login','error');return;}
 const btn=document.getElementById('asfSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Saving...';}
 try{
  const {error}=await sb.from('staff').insert({
   school_id:schoolId,full_name:name,role_title:document.getElementById('asfRole').value.trim()||null,
   department:document.getElementById('asfDept').value,contract_type:document.getElementById('asfContract').value,
   start_date:document.getElementById('asfStart').value||null,qualifications:document.getElementById('asfQual').value.trim()||null,
   status:'active'
  });
  if(error)throw error;
  T('Staff member added','success');
  CM();
  await loadSchoolData(schoolId);
  if(CV==='hr')V('hr');
 }catch(err){
  T(err.message||'Failed to add staff member','error');
  if(btn){btn.disabled=false;btn.innerHTML='Add Staff Member';}
 }
}

function mAddVehicle(){OM('Add Vehicle',`
 <div class="fr"><div class="fg"><div class="fl">Registration</div><input class="fi" id="avReg" placeholder="e.g. ND 99 XY GP"></div><div class="fg"><div class="fl">Capacity</div><input class="fi" id="avCap" type="number" placeholder="32"></div></div>
 <div class="fg"><div class="fl">Driver</div><input class="fi" id="avDriver" placeholder="Driver name"></div>
 <div class="fg"><div class="fl">Route Description</div><input class="fi" id="avRoute" placeholder="e.g. Route D — Glenwood / Morningside"></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="avSubmitBtn" onclick="submitAddVehicle()">Add Vehicle</button>`);}

async function submitAddVehicle(){
 const reg=document.getElementById('avReg').value.trim();
 if(!reg){T('Enter a registration number','error');return;}
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 if(!schoolId){T('No school context — please re-login','error');return;}
 const btn=document.getElementById('avSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Saving...';}
 try{
  const {error}=await sb.from('vehicles').insert({
   school_id:schoolId,registration:reg,driver_name:document.getElementById('avDriver').value.trim()||null,
   capacity:parseInt(document.getElementById('avCap').value)||null,route:document.getElementById('avRoute').value.trim()||null,
   status:'active'
  });
  if(error)throw error;
  T('Vehicle added to fleet','success');
  CM();
  await loadSchoolData(schoolId);
  if(CV==='transport')V('transport');
 }catch(err){
  T(err.message||'Failed to add vehicle','error');
  if(btn){btn.disabled=false;btn.innerHTML='Add Vehicle';}
 }
}

function mAddSgbMember(){OM('Add SGB Member',`
 <div class="fr"><div class="fg"><div class="fl">Full Name</div><input class="fi" id="asgName" placeholder="Member name"></div><div class="fg"><div class="fl">Role</div><input class="fi" id="asgRole" placeholder="e.g. Chairperson"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Category</div><select class="fs" id="asgCat"><option>Parent</option><option>Educator</option><option>Non-teaching Staff</option><option>Principal</option><option>Co-opted</option></select></div><div class="fg"><div class="fl">Term</div><input class="fi" id="asgTerm" placeholder="e.g. 2025–2028"></div></div>
 <div class="fg"><div class="fl">Phone</div><input class="fi" id="asgPhone" placeholder="071 xxx xxxx"></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="asgSubmitBtn" onclick="submitAddSgbMember()">Add Member</button>`);}

async function submitAddSgbMember(){
 const name=document.getElementById('asgName').value.trim();
 if(!name){T('Enter a member name','error');return;}
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 if(!schoolId){T('No school context — please re-login','error');return;}
 const btn=document.getElementById('asgSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Saving...';}
 try{
  const {error}=await sb.from('sgb_members').insert({
   school_id:schoolId,name,role_title:document.getElementById('asgRole').value.trim()||null,
   category:document.getElementById('asgCat').value,term:document.getElementById('asgTerm').value.trim()||null,
   phone:document.getElementById('asgPhone').value.trim()||null
  });
  if(error)throw error;
  T('SGB member added','success');
  CM();
  await loadSchoolData(schoolId);
  if(CV==='sgb')V('sgb');
 }catch(err){
  T(err.message||'Failed to add member','error');
  if(btn){btn.disabled=false;btn.innerHTML='Add Member';}
 }
}

function mSchedMeeting(){OM('Schedule SGB Meeting',`
 <div class="fg"><div class="fl">Meeting Title</div><input class="fi" id="asmTitle" placeholder="e.g. Term 4 Budget Planning"></div>
 <div class="fr"><div class="fg"><div class="fl">Date</div><input class="fi" id="asmDate" type="date"></div><div class="fg"><div class="fl">Time</div><input class="fi" id="asmTime" type="time" value="17:30"></div></div>
 <div class="fg"><div class="fl">Agenda Items</div><textarea class="fta" id="asmAgenda" placeholder="List agenda items..."></textarea></div>
 <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--g)">Notify all SGB members via email + SMS</label>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="asmSubmitBtn" onclick="submitSchedMeeting()"><i class="ti ti-calendar-plus" style="font-size:11px"></i>Schedule Meeting</button>`);}

async function submitSchedMeeting(){
 const title=document.getElementById('asmTitle').value.trim();
 const date=document.getElementById('asmDate').value;
 if(!title){T('Enter a meeting title','error');return;}
 if(!date){T('Pick a date','error');return;}
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 if(!schoolId){T('No school context — please re-login','error');return;}
 const btn=document.getElementById('asmSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Scheduling...';}
 try{
  const {error}=await sb.from('sgb_meetings').insert({
   school_id:schoolId,meeting_date:date,title,status:'scheduled'
  });
  if(error)throw error;
  T('Meeting scheduled','success');
  CM();
  await loadSchoolData(schoolId);
  if(CV==='sgb')V('sgb');
 }catch(err){
  T(err.message||'Failed to schedule meeting','error');
  if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-calendar-plus" style="font-size:11px"></i>Schedule Meeting';}
 }
}

function mAddCampus(){OM('Add Campus',`
 <div class="fg"><div class="fl">Campus Name</div><input class="fi" id="acpName" placeholder="e.g. Durban Primary — Westville Annex"></div>
 <div class="fr"><div class="fg"><div class="fl">Principal</div><input class="fi" id="acpPrincipal" placeholder="Principal name"></div><div class="fg"><div class="fl">Expected Learners</div><input class="fi" id="acpStudents" type="number" placeholder="200"></div></div>
 <div class="fg"><div class="fl">Campus Type</div><select class="fs" id="acpType"><option>Primary</option><option>High School</option><option>Combined</option></select></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="acpSubmitBtn" onclick="submitAddCampus()"><i class="ti ti-building-skyscraper" style="font-size:11px"></i>Add Campus</button>`);}

async function submitAddCampus(){
 const name=document.getElementById('acpName').value.trim();
 if(!name){T('Enter a campus name','error');return;}
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 if(!schoolId){T('No school context — please re-login','error');return;}
 const btn=document.getElementById('acpSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Saving...';}
 try{
  const {error}=await sb.from('campuses').insert({
   school_id:schoolId,name,principal_name:document.getElementById('acpPrincipal').value.trim()||null,
   type:document.getElementById('acpType').value,expected_students:parseInt(document.getElementById('acpStudents').value)||0
  });
  if(error)throw error;
  T('Campus added to group','success');
  CM();
  await loadSchoolData(schoolId);
  if(CV==='enterprise')V('enterprise');
 }catch(err){
  T(err.message||'Failed to add campus','error');
  if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-building-skyscraper" style="font-size:11px"></i>Add Campus';}
 }
}

