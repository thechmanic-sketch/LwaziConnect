function mUpgrade(){OM('Upgrade Your Plan',`
 <div style="text-align:center;padding:10px 0 16px">
  <div style="width:44px;height:44px;background:var(--ap);border-radius:11px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px;font-size:20px;color:var(--ad)"><i class="ti ti-crown"></i></div>
  <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:17px;color:var(--s);margin-bottom:5px">Upgrade to Enterprise</div>
  <div class="tsm">Unlock unlimited students, multi-campus, and custom branding.</div>
 </div>
 <div style="background:var(--gx);border:1px solid var(--gl);border-radius:9px;padding:14px 18px;margin-bottom:14px"><div style="font-weight:800;font-size:20px;font-family:'Outfit',sans-serif;color:var(--g)">R1,499 <span style="font-size:12px;font-weight:400">/month</span></div><div class="tsm">or R25,000 once-off lifetime licence</div></div>
 <div class="fg"><div class="fl">Contact Name</div><input class="fi" value="N. Khumalo"></div>
 <div class="fg"><div class="fl">Email</div><input class="fi" value="admin@durbanprimary.edu.za" type="email"></div>
 <div class="fg"><div class="fl">Preferred Plan</div><select class="fs"><option>Enterprise — R1,499/month</option><option>Enterprise — R25,000 lifetime</option></select></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Request sent — our team will contact you within 24 hours','success');CM()"><i class="ti ti-send" style="font-size:11px"></i>Request Upgrade</button>`);}

function mAddSchool(){OM('Add New School',`
 <div class="fg"><div class="fl">School Name</div><input class="fi" id="asName" placeholder="e.g. Westville Primary School"></div>
 <div class="fr"><div class="fg"><div class="fl">Contact Person</div><input class="fi" placeholder="Principal or Admin name"></div><div class="fg"><div class="fl">Phone</div><input class="fi" placeholder="031 xxx xxxx"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Email</div><input class="fi" placeholder="admin@school.edu.za" type="email"></div><div class="fg"><div class="fl">Province</div><select class="fs"><option>KwaZulu-Natal</option><option>Gauteng</option><option>Western Cape</option><option>Eastern Cape</option></select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Plan</div><select class="fs" id="asPlan"><option>Starter</option><option>Professional</option><option>Enterprise</option></select></div><div class="fg"><div class="fl">Licence Type</div><select class="fs"><option>Monthly Subscription</option><option>Lifetime Licence</option></select></div></div>
 <div class="tsm" style="margin-top:4px">Contact/phone/email/province/licence-type aren't wired to the database yet — only School Name and Plan are saved for now.</div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="asSubmitBtn" onclick="submitAddSchool()"><i class="ti ti-building-school" style="font-size:11px"></i>Create School Account</button>`);}

async function submitAddSchool(){
 const name=document.getElementById('asName').value.trim();
 const plan=document.getElementById('asPlan').value;
 if(!name){T('Enter a school name','error');return;}
 const btn=document.getElementById('asSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Creating...';}
 try{
  const {data:schoolId,error}=await sb.rpc('register_school',{p_name:name});
  if(error)throw error;
  if(plan&&plan!=='Starter'){
   await sb.from('schools').update({plan}).eq('id',schoolId);
  }
  T('School account created','success');
  CM();
  await loadAllSchools();
  if(CU_ROLE==='superadmin')V('superadmin');
 }catch(err){
  T(err.message||'Failed to create school','error');
  if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-building-school" style="font-size:11px"></i>Create School Account';}
 }
}

function mEditSchool(schoolId){
 const s=D.schools.find(x=>x._id===schoolId);if(!s)return;
 OM('Edit School',`
 <div class="fg"><div class="fl">School Name</div><input class="fi" id="esName" value="${s.name}"></div>
 <div class="fr"><div class="fg"><div class="fl">Plan</div><select class="fs" id="esPlan"><option ${s.plan==='Starter'?'selected':''}>Starter</option><option ${s.plan==='Professional'?'selected':''}>Professional</option><option ${s.plan==='Enterprise'?'selected':''}>Enterprise</option></select></div><div class="fg"><div class="fl">Status</div><select class="fs" id="esStatus"><option value="trial" ${s.status==='trial'?'selected':''}>Trial</option><option value="active" ${s.status==='active'?'selected':''}>Active</option><option value="suspended" ${s.status==='suspended'?'selected':''}>Suspended</option></select></div></div>
 <div class="tsm" style="margin-top:4px">Suspending blocks every user at this school from logging in until reactivated.</div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" id="esSubmitBtn" onclick="submitEditSchool('${schoolId}')"><i class="ti ti-device-floppy" style="font-size:11px"></i>Save Changes</button>`);
}

async function submitEditSchool(schoolId){
 const name=document.getElementById('esName').value.trim();
 const plan=document.getElementById('esPlan').value;
 const status=document.getElementById('esStatus').value;
 if(!name){T('Enter a school name','error');return;}
 const btn=document.getElementById('esSubmitBtn');
 if(btn){btn.disabled=true;btn.textContent='Saving...';}
 try{
  const {error}=await sb.from('schools').update({name,plan,status}).eq('id',schoolId);
  if(error)throw error;
  T('School updated','success');
  CM();
  await loadAllSchools();
  if(CU_ROLE==='superadmin')V('superadmin');
 }catch(err){
  T(err.message||'Failed to update school','error');
  if(btn){btn.disabled=false;btn.innerHTML='<i class="ti ti-device-floppy" style="font-size:11px"></i>Save Changes';}
 }
}

async function setSchoolStatus(schoolId,status){
 try{
  const {error}=await sb.from('schools').update({status}).eq('id',schoolId);
  if(error)throw error;
  T(status==='suspended'?'School paused — their users can no longer log in':'School reactivated','success');
  await loadAllSchools();
  if(CU_ROLE==='superadmin')V('superadmin');
 }catch(err){
  T(err.message||'Failed to update school status','error');
 }
}

async function mViewSchool(schoolId){
 const s=D.schools.find(x=>x._id===schoolId);if(!s)return;
 OM(`${s.name} — Overview`,`<div class="tsm" style="text-align:center;padding:20px">Loading...</div>`,
 `<button class="btn btn-s" onclick="CM()">Close</button><button class="btn btn-g" onclick="CM();mEditSchool('${schoolId}')"><i class="ti ti-edit" style="font-size:11px"></i>Edit School</button>`,'520px');
 try{
  const [{count:studentCount},{count:teacherCount},{count:classCount},{data:schoolRow}]=await Promise.all([
   sb.from('students').select('*',{count:'exact',head:true}).eq('school_id',schoolId),
   sb.from('profiles').select('*',{count:'exact',head:true}).eq('school_id',schoolId).eq('role','teacher'),
   sb.from('classes').select('*',{count:'exact',head:true}).eq('school_id',schoolId),
   sb.from('schools').select('*').eq('id',schoolId).single(),
  ]);
  document.getElementById('MB2').innerHTML=`
  <div class="fr3 mb14">
   <div class="sc" style="cursor:default"><div class="sc-val">${studentCount||0}</div><div class="sc-lbl">Students</div></div>
   <div class="sc" style="cursor:default"><div class="sc-val">${teacherCount||0}</div><div class="sc-lbl">Teachers</div></div>
   <div class="sc" style="cursor:default"><div class="sc-val">${classCount||0}</div><div class="sc-lbl">Classes</div></div>
  </div>
  <div class="fg"><div class="fl">Plan</div><div style="font-size:13px;margin-top:2px">${schoolRow?.plan||'—'}</div></div>
  <div class="fg"><div class="fl">Status</div><div style="margin-top:2px"><span class="pill ${sc(schoolRow?.status)}">${sl(schoolRow?.status||'—')}</span></div></div>
  <div class="fg"><div class="fl">Registered</div><div style="font-size:13px;margin-top:2px">${schoolRow?.created_at?new Date(schoolRow.created_at).toLocaleDateString():'—'}</div></div>`;
 }catch(err){
  document.getElementById('MB2').innerHTML=`<div class="tsm" style="color:var(--r)">Failed to load school info: ${err.message}</div>`;
 }
}

