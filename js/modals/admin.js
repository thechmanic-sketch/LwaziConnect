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
 <div class="fg"><div class="fl">School Name</div><input class="fi" placeholder="e.g. Westville Primary School"></div>
 <div class="fr"><div class="fg"><div class="fl">Contact Person</div><input class="fi" placeholder="Principal or Admin name"></div><div class="fg"><div class="fl">Phone</div><input class="fi" placeholder="031 xxx xxxx"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Email</div><input class="fi" placeholder="admin@school.edu.za" type="email"></div><div class="fg"><div class="fl">Province</div><select class="fs"><option>KwaZulu-Natal</option><option>Gauteng</option><option>Western Cape</option><option>Eastern Cape</option></select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Plan</div><select class="fs"><option>Starter — R499/mo</option><option>Professional — R899/mo</option><option>Enterprise — R1,499/mo</option></select></div><div class="fg"><div class="fl">Licence Type</div><select class="fs"><option>Monthly Subscription</option><option>Lifetime Licence</option></select></div></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('School account created — welcome email sent','success');CM()"><i class="ti ti-building-school" style="font-size:11px"></i>Create School Account</button>`);}

function mEditTT(){OM('Edit Timetable',`
 <div class="fr"><div class="fg"><div class="fl">Class</div><select class="fs">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Day</div><select class="fs">${TT_DAYS.map(d=>`<option>${d}</option>`).join('')}</select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Period</div><select class="fs">${TT_PERIODS.filter(p=>p.l!=='Break').map(p=>`<option>${p.l}</option>`).join('')}</select></div><div class="fg"><div class="fl">Subject</div><select class="fs">${SUBS.map(s=>`<option>${s}</option>`).join('')}</select></div></div>
 <div class="fg"><div class="fl">Teacher</div><select class="fs">${D.teachers.map(t=>`<option>${t.name}</option>`).join('')}</select></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Timetable updated','success');CM()"><i class="ti ti-calendar-check" style="font-size:11px"></i>Save Changes</button>`);}

function mUploadMarks(){OM('Upload Marks',`
 <div class="fr"><div class="fg"><div class="fl">Class</div><select class="fs">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Subject</div><select class="fs">${SUBS.map(s=>`<option>${s}</option>`).join('')}</select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Term</div><select class="fs"><option>Term 3 — 2025</option><option>Term 2</option><option>Term 1</option></select></div><div class="fg"><div class="fl">Assessment Type</div><select class="fs"><option>Exam</option><option>Test</option><option>Assignment</option><option>Project</option></select></div></div>
 <div class="drop-zone" onclick="T('Spreadsheet picker opened','')"><i class="ti ti-file-spreadsheet" style="font-size:28px;color:var(--gl);display:block;margin-bottom:6px"></i><div style="font-weight:600;font-size:12px;color:var(--s)">Upload marks spreadsheet</div><div class="tsm">Download our template · upload completed file</div></div>
 <button class="btn btn-s w100" style="margin-top:8px;justify-content:center" onclick="T('Template downloaded','success')"><i class="ti ti-download" style="font-size:11px"></i>Download Mark Sheet Template</button>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Marks uploaded and saved','success');CM()"><i class="ti ti-upload" style="font-size:11px"></i>Upload Marks</button>`);}

function mImportCSV(){OM('Import Students via CSV',`
 <div class="drop-zone" onclick="T('CSV file picker opened','')"><i class="ti ti-file-spreadsheet" style="font-size:28px;color:var(--gl);display:block;margin-bottom:6px"></i><div style="font-weight:600;font-size:12px;color:var(--s)">Upload students CSV file</div><div class="tsm">Download our template first · max 500 rows per import</div></div>
 <button class="btn btn-s w100" style="margin-top:8px;justify-content:center" onclick="T('Template downloaded','success')"><i class="ti ti-download" style="font-size:11px"></i>Download CSV Template</button>
 <div style="background:var(--ap);border:1px solid var(--a);border-radius:7px;padding:9px 12px;font-size:11px;color:var(--ad);margin-top:10px"><i class="ti ti-info-circle" style="margin-right:4px"></i>Required columns: First Name, Last Name, DOB, Gender, Class, Parent Name, Parent Phone. Existing students will not be duplicated.</div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('48 students imported successfully','success');CM()"><i class="ti ti-upload" style="font-size:11px"></i>Import Students</button>`);}

function mSetHomework(){OM('Set Homework',`
 <div class="fr"><div class="fg"><div class="fl">Class</div><select class="fs">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Subject</div><select class="fs">${SUBS.map(s=>`<option>${s}</option>`).join('')}</select></div></div>
 <div class="fg"><div class="fl">Assignment Title</div><input class="fi" placeholder="e.g. Algebra Worksheet — Chapter 4"></div>
 <div class="fg"><div class="fl">Instructions</div><textarea class="fta" placeholder="Describe the homework..."></textarea></div>
 <div class="fr"><div class="fg"><div class="fl">Due Date</div><input class="fi" type="date"></div><div class="fg"><div class="fl">Attachment</div><button class="btn btn-s w100" style="justify-content:center" onclick="T('File attached','success')"><i class="ti ti-paperclip" style="font-size:11px"></i>Attach File</button></div></div>
 <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--wd)"><i class="ti ti-brand-whatsapp" style="color:var(--wd)"></i>Notify parents via WhatsApp</label>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Homework set and parents notified','wa');CM()"><i class="ti ti-notebook" style="font-size:11px"></i>Set Homework</button>`);}

function mNewBroadcast(){OM('New Broadcast',`
 <div class="fr"><div class="fg"><div class="fl">Channel</div><select class="fs"><option>WhatsApp</option><option>Email</option><option>SMS</option><option>All Channels</option></select></div><div class="fg"><div class="fl">Audience</div><select class="fs"><option>All Parents</option><option>All Staff</option>${D.classes.map(c=>`<option>${c.name} Parents</option>`).join('')}</select></div></div>
 <div class="fg"><div class="fl">Message</div><textarea class="fta" placeholder="Type your message..."></textarea></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-w" onclick="T('Broadcast sent','wa');CM()"><i class="ti ti-send" style="font-size:11px"></i>Send Now</button>`);}

function mAddStaff(){OM('Add Staff Member',`
 <div class="fr"><div class="fg"><div class="fl">Full Name</div><input class="fi" placeholder="Staff name"></div><div class="fg"><div class="fl">Role</div><input class="fi" placeholder="e.g. Teacher — Mathematics"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Department</div><select class="fs"><option>Academic</option><option>Admin</option><option>Operations</option><option>Management</option></select></div><div class="fg"><div class="fl">Contract Type</div><select class="fs"><option>Permanent</option><option>Fixed-term</option><option>Part-time</option></select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Start Date</div><input class="fi" type="date"></div><div class="fg"><div class="fl">Qualifications</div><input class="fi" placeholder="e.g. B.Ed Hons"></div></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Staff member added to HR system','success');CM()">Add Staff Member</button>`);}

function mAddVehicle(){OM('Add Vehicle',`
 <div class="fr"><div class="fg"><div class="fl">Vehicle ID</div><input class="fi" placeholder="e.g. BUS-04"></div><div class="fg"><div class="fl">Registration</div><input class="fi" placeholder="e.g. ND 99 XY GP"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Driver</div><input class="fi" placeholder="Driver name"></div><div class="fg"><div class="fl">Capacity</div><input class="fi" type="number" placeholder="32"></div></div>
 <div class="fg"><div class="fl">Route Description</div><input class="fi" placeholder="e.g. Route D — Glenwood / Morningside"></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Vehicle added to fleet','success');CM()">Add Vehicle</button>`);}

function mSchedMeeting(){OM('Schedule SGB Meeting',`
 <div class="fg"><div class="fl">Meeting Title</div><input class="fi" placeholder="e.g. Term 4 Budget Planning"></div>
 <div class="fr"><div class="fg"><div class="fl">Date</div><input class="fi" type="date"></div><div class="fg"><div class="fl">Time</div><input class="fi" type="time" value="17:30"></div></div>
 <div class="fg"><div class="fl">Agenda Items</div><textarea class="fta" placeholder="List agenda items..."></textarea></div>
 <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--g)">Notify all SGB members via email + SMS</label>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Meeting scheduled. SGB members notified.','success');CM()"><i class="ti ti-calendar-plus" style="font-size:11px"></i>Schedule Meeting</button>`);}

function mAddCampus(){OM('Add Campus',`
 <div class="fg"><div class="fl">Campus Name</div><input class="fi" placeholder="e.g. Durban Primary — Westville Annex"></div>
 <div class="fr"><div class="fg"><div class="fl">Principal</div><input class="fi" placeholder="Principal name"></div><div class="fg"><div class="fl">Expected Learners</div><input class="fi" type="number" placeholder="200"></div></div>
 <div class="fg"><div class="fl">Campus Type</div><select class="fs"><option>Primary</option><option>High School</option><option>Combined</option></select></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Campus added to group','success');CM()"><i class="ti ti-building-skyscraper" style="font-size:11px"></i>Add Campus</button>`);}

function openQuickAdd(){OM('Quick Add',`
 <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
  ${[['ti-user-plus','Add Student','mAddStu()'],['ti-user-check','Add Teacher','mAddTeacher()'],['ti-receipt','New Invoice','mAddInv()'],['ti-calendar-check','Mark Attendance','mMarkAtt()'],['ti-speakerphone','Announcement','mNewAnn()'],['ti-clipboard-plus','New Application','mAddAdmission()'],['ti-upload','Upload Document','mUploadDoc()'],['ti-message-circle','New Message','mNewMsg()']].map(([ic,lbl,fn])=>`
  <div onclick="${fn}" style="background:var(--sp);border:1px solid var(--sb);border-radius:8px;padding:12px;display:flex;align-items:center;gap:9px;cursor:pointer;transition:all .15s" onmouseover="this.style.background='var(--gp)';this.style.borderColor='var(--g)'" onmouseout="this.style.background='var(--sp)';this.style.borderColor='var(--sb)'">
   <i class="ti ${ic}" style="font-size:18px;color:var(--g)"></i>
   <span style="font-size:12px;font-weight:600;color:var(--s)">${lbl}</span>
  </div>`).join('')}
 </div>`,
 `<button class="btn btn-s" onclick="CM()">Close</button>`,'460px');}


// ══ ROLE SYSTEM ══
let CU_ROLE = null;
let selRole = null;

const ROLE_PROFILES = {
 superadmin: {name:'Themba Moyo',ini:'TM',bg:'#FEF3C7',fg:'#B45309',label:'Super Admin',nav:['dashboard','students','admissions','parents','classes','teachers','subjects','timetable','attendance','reportcards','fees','messages','announcements','documents','calendar','health','discipline','analytics','superadmin','enterprise','licensing','settings','aiassist','idcards','homework','commscentre','hr','transport','sgb','compliance']},
 principal:  {name:'Dr. S. Nkosi',ini:'SN',bg:'#D8F3DC',fg:'#1B4332',label:'Principal',nav:['dashboard','students','admissions','parents','classes','teachers','subjects','timetable','attendance','reportcards','fees','messages','announcements','documents','calendar','health','discipline','analytics','settings','aiassist','idcards','homework','commscentre','hr','sgb','compliance']},
 admin:      {name:'N. Khumalo',ini:'NK',bg:'#EFF6FF',fg:'#1D6FA4',label:'Administrator',nav:['dashboard','students','admissions','parents','classes','teachers','subjects','timetable','attendance','reportcards','fees','messages','announcements','documents','calendar','health','discipline','settings','aiassist','idcards','homework','commscentre']},
 parent:     {name:'Lindiwe Dlamini',ini:'LD',bg:'#FFF8E7',fg:'#B45309',label:'Parent',nav:['dashboard','messages','announcements','fees','documents','calendar']},
 student:    {name:'Amahle Dlamini',ini:'AD',bg:'#EDE9FE',fg:'#5B21B6',label:'Student',nav:['dashboard','subjects','timetable','attendance','homework','announcements','documents','calendar']},
};

