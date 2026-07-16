// ══ ALL MODALS ══
function mAddStu(){OM('Add New Student',`
 <div class="fr"><div class="fg"><div class="fl">First Name</div><input class="fi" id="asuFirst" placeholder="e.g. Amahle"></div><div class="fg"><div class="fl">Last Name</div><input class="fi" id="asuLast" placeholder="e.g. Dlamini"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Date of Birth</div><input class="fi" id="asuDob" type="date"></div><div class="fg"><div class="fl">Gender</div><select class="fs" id="asuGender"><option>Female</option><option>Male</option></select></div></div>
 <div class="fg"><div class="fl">Class</div><select class="fs" id="asuClass">${D.classes.length?D.classes.map(c=>`<option value="${c._id}">${c.name}</option>`).join(''):'<option value="">No classes yet — add one first</option>'}</select></div>
 <div class="tsm" style="margin-top:4px">Parent linking happens once the parent registers their own account and the school links them to this student.</div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="asuSubmitBtn" onclick="submitAddStudent()"><i class="ti ti-user-plus" style="font-size:11px"></i>Register Student</button>`);}

async function submitAddStudent(){
 const firstName=document.getElementById('asuFirst').value.trim();
 const lastName=document.getElementById('asuLast').value.trim();
 const dob=document.getElementById('asuDob').value;
 const gender=document.getElementById('asuGender').value;
 const classId=document.getElementById('asuClass').value;
 if(!firstName||!lastName){T('Enter first and last name','error');return;}
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 if(!schoolId){T('No school context — please re-login','error');return;}
 const btn=document.getElementById('asuSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Saving...';}
 try{
  const {error}=await sb.from('students').insert({
   school_id:schoolId,first_name:firstName,last_name:lastName,
   dob:dob||null,gender,class_id:classId||null,status:'active'
  });
  if(error)throw error;
  T('Student registered','success');
  CM();
  await loadSchoolData(schoolId);
  if(CU_ROLE==='teacher'||CU_ROLE==='admin'||CU_ROLE==='principal')V(CV);
 }catch(err){
  T(err.message||'Failed to register student','error');
  if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-user-plus" style="font-size:11px"></i>Register Student';}
 }
}

function mAddTeacher(){OM('Add Teacher',`
 <div style="background:var(--ap);border:1px solid var(--a);border-radius:7px;padding:11px 13px;font-size:12px;color:var(--ad);margin-bottom:4px"><i class="ti ti-info-circle" style="margin-right:4px"></i>Teacher accounts are self-registered for security — a teacher account needs its own login, which can't be created on their behalf here.</div>
 <div class="fg" style="margin-top:12px"><div class="fl">Tell them to register at your login page:</div>
  <ol style="font-size:12px;color:var(--sm);padding-left:18px;line-height:1.8">
   <li>Click <strong>Register</strong> on the login screen</li>
   <li>Choose <strong>Teacher</strong> as their role</li>
   <li>Select <strong>${typeof schoolName==='function'?schoolName():'your school'}</strong> from the school dropdown</li>
  </ol>
 </div>`,
 `<button class="btn btn-g" onclick="CM()">Got it</button>`);}

function mAddParent(){OM('Link Parent to Student',`
 <div style="background:var(--ap);border:1px solid var(--a);border-radius:7px;padding:11px 13px;font-size:12px;color:var(--ad);margin-bottom:4px"><i class="ti ti-info-circle" style="margin-right:4px"></i>Parent accounts are self-registered for security — a parent needs their own login. Once they've registered, link their account to their child here.</div>
 ${D.parents.length?`
 <div class="fg" style="margin-top:8px"><div class="fl">Parent (already registered)</div><select class="fs" id="apParent">${D.parents.map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</select></div>
 <div class="fg"><div class="fl">Link to Student(s)</div><select class="fs" id="apStudents" multiple style="height:65px">${D.students.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select></div>`
 :`<div class="tsm" style="margin-top:10px">No parent accounts have registered for ${typeof schoolName==='function'?schoolName():'your school'} yet. Ask them to register via the login page's Register link, choosing Parent as their role.</div>`}`,
 D.parents.length
  ?`<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="apSubmitBtn" onclick="submitLinkParent()"><i class="ti ti-link" style="font-size:11px"></i>Link Parent</button>`
  :`<button class="btn btn-g" onclick="CM()">Got it</button>`);}

async function submitLinkParent(){
 const parentId=document.getElementById('apParent').value;
 const studentIds=[...document.getElementById('apStudents').selectedOptions].map(o=>o.value);
 if(!parentId){T('Select a parent','error');return;}
 if(!studentIds.length){T('Select at least one student','error');return;}
 const btn=document.getElementById('apSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Linking...';}
 try{
  const rows=studentIds.map(sid=>({parent_id:parentId,student_id:sid}));
  const {error}=await sb.from('parent_students').upsert(rows,{onConflict:'parent_id,student_id'});
  if(error)throw error;
  T('Parent linked to student(s)','success');
  CM();
  const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
  await loadSchoolData(schoolId);
  if(CV==='parents')V('parents');
 }catch(err){
  T(err.message||'Failed to link parent','error');
  if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-link" style="font-size:11px"></i>Link Parent';}
 }
}

function mAddAdmission(){OM('New Application',`
 <div class="step-ind"><div class="step-it"><div class="sc2 cur">1</div><div class="sl2 cur">Applicant</div></div><div class="sc3 pend"></div><div class="step-it"><div class="sc2 pend">2</div><div class="sl2 pend">Parent</div></div><div class="sc3 pend"></div><div class="step-it"><div class="sc2 pend">3</div><div class="sl2 pend">Documents</div></div></div>
 <div class="fr"><div class="fg"><div class="fl">First Name</div><input class="fi" id="aaFirst" placeholder="First name"></div><div class="fg"><div class="fl">Last Name</div><input class="fi" id="aaLast" placeholder="Last name"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Date of Birth</div><input class="fi" id="aaDob" type="date"></div><div class="fg"><div class="fl">Grade Applying For</div><select class="fs" id="aaGrade">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Parent Name</div><input class="fi" id="aaParent" placeholder="Parent full name"></div><div class="fg"><div class="fl">Phone</div><input class="fi" id="aaPhone" placeholder="071 xxx xxxx"></div></div>
 <div class="fg"><div class="fl">Parent Email</div><input class="fi" id="aaEmail" placeholder="email@example.com" type="email"></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="aaSubmitBtn" onclick="submitAddAdmission()">Submit Application</button>`);}

async function submitAddAdmission(){
 const first=document.getElementById('aaFirst').value.trim();
 const last=document.getElementById('aaLast').value.trim();
 const dob=document.getElementById('aaDob').value;
 const grade=document.getElementById('aaGrade').value;
 const parentName=document.getElementById('aaParent').value.trim();
 const phone=document.getElementById('aaPhone').value.trim();
 if(!first||!last){T('Enter applicant first and last name','error');return;}
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 if(!schoolId){T('No school context — please re-login','error');return;}
 const btn=document.getElementById('aaSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Submitting...';}
 try{
  const {error}=await sb.from('admissions').insert({
   school_id:schoolId,applicant_name:`${first} ${last}`,grade_applying:grade||null,
   dob:dob||null,parent_name:parentName||null,phone:phone||null,status:'pending'
  });
  if(error)throw error;
  T('Application submitted','success');
  CM();
  await loadSchoolData(schoolId);
  if(CV==='admissions')V('admissions');
 }catch(err){
  T(err.message||'Failed to submit application','error');
  if(btn){btn.disabled=false;btn.innerHTML='Submit Application';}
 }
}

function mAddInv(){OM('New Invoice',`
 <div class="fr"><div class="fg"><div class="fl">Student</div><select class="fs" id="aivStu">${D.students.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Term</div><select class="fs" id="aivTerm"><option>Term 3 — 2025</option><option>Term 4 — 2025</option><option>Term 1 — 2026</option></select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Fee Type</div><select class="fs" id="aivType"><option>Tuition Fees</option><option>Uniform</option><option>Sports Levy</option><option>Stationery</option></select></div><div class="fg"><div class="fl">Amount (R)</div><input class="fi" id="aivAmt" placeholder="2500" type="number"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Due Date</div><input class="fi" id="aivDue" type="date"></div><div class="fg"><div class="fl">Payment Method</div><select class="fs"><option>EFT</option><option>PayFast</option><option>Cash</option></select></div></div>
 <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;margin-top:6px"><input type="checkbox" checked style="accent-color:var(--g)">Send PayFast payment link to parent via WhatsApp</label>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="aivSubmitBtn" onclick="submitAddInvoice()"><i class="ti ti-receipt" style="font-size:11px"></i>Create Invoice</button>`);}

async function submitAddInvoice(){
 const studentId=document.getElementById('aivStu').value;
 const term=document.getElementById('aivTerm').value;
 const feeType=document.getElementById('aivType').value;
 const amount=parseFloat(document.getElementById('aivAmt').value);
 const dueDate=document.getElementById('aivDue').value;
 if(!studentId){T('Select a student','error');return;}
 if(!amount||amount<=0){T('Enter a valid amount','error');return;}
 const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
 if(!schoolId){T('No school context — please re-login','error');return;}
 const btn=document.getElementById('aivSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Creating...';}
 try{
  const {error}=await sb.from('invoices').insert({
   school_id:schoolId,student_id:studentId,term:`${feeType} — ${term}`,
   amount,paid:0,status:'pending',due_date:dueDate||null
  });
  if(error)throw error;
  T('Invoice created','success');
  CM();
  await loadSchoolData(schoolId);
  V(CV);
 }catch(err){
  T(err.message||'Failed to create invoice','error');
  if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-receipt" style="font-size:11px"></i>Create Invoice';}
 }
}

