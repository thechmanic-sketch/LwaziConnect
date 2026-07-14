// ══ ALL MODALS ══
function mAddStu(){OM('Add New Student',`
 <div class="fr"><div class="fg"><div class="fl">First Name</div><input class="fi" placeholder="e.g. Amahle"></div><div class="fg"><div class="fl">Last Name</div><input class="fi" placeholder="e.g. Dlamini"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Date of Birth</div><input class="fi" type="date"></div><div class="fg"><div class="fl">Gender</div><select class="fs"><option>Female</option><option>Male</option></select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Class</div><select class="fs">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Home Language</div><select class="fs"><option>IsiZulu</option><option>English</option><option>IsiXhosa</option></select></div></div>
 <div class="divider"></div>
 <div style="font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.4px;color:var(--sl);margin-bottom:9px">Parent / Guardian</div>
 <div class="fr"><div class="fg"><div class="fl">Full Name</div><input class="fi" placeholder="Parent full name"></div><div class="fg"><div class="fl">Phone</div><input class="fi" placeholder="071 xxx xxxx"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Email</div><input class="fi" placeholder="parent@email.com" type="email"></div><div class="fg"><div class="fl">Relationship</div><select class="fs"><option>Mother</option><option>Father</option><option>Guardian</option></select></div></div>
 <div class="fg"><div class="fl">Home Address</div><input class="fi" placeholder="Full address"></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Student registered successfully','success');CM()"><i class="ti ti-user-plus" style="font-size:11px"></i>Register Student</button>`);}

function mAddTeacher(){OM('Add Teacher',`
 <div class="fr"><div class="fg"><div class="fl">First Name</div><input class="fi" placeholder="First name"></div><div class="fg"><div class="fl">Last Name</div><input class="fi" placeholder="Last name"></div></div>
 <div class="fg"><div class="fl">Subjects</div><select class="fs" multiple style="height:65px">${SUBS.map(s=>`<option>${s}</option>`).join('')}</select></div>
 <div class="fr"><div class="fg"><div class="fl">Assigned Class</div><select class="fs">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Phone</div><input class="fi" placeholder="071 xxx xxxx"></div></div>
 <div class="fg"><div class="fl">Email</div><input class="fi" placeholder="teacher@school.edu.za" type="email"></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Teacher added','success');CM()">Add Teacher</button>`);}

function mAddParent(){OM('Add Parent',`
 <div class="fr"><div class="fg"><div class="fl">Full Name</div><input class="fi" placeholder="Parent full name"></div><div class="fg"><div class="fl">Relationship</div><select class="fs"><option>Mother</option><option>Father</option><option>Guardian</option></select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Phone</div><input class="fi" placeholder="071 xxx xxxx"></div><div class="fg"><div class="fl">Email</div><input class="fi" placeholder="email@example.com" type="email"></div></div>
 <div class="fg"><div class="fl">Link to Student(s)</div><select class="fs" multiple style="height:65px">${D.students.map(s=>`<option>${s.name}</option>`).join('')}</select></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-w" onclick="T('Parent added. WhatsApp portal invite sent.','wa');CM()">Add Parent</button>`);}

function mAddAdmission(){OM('New Application',`
 <div class="step-ind"><div class="step-it"><div class="sc2 cur">1</div><div class="sl2 cur">Applicant</div></div><div class="sc3 pend"></div><div class="step-it"><div class="sc2 pend">2</div><div class="sl2 pend">Parent</div></div><div class="sc3 pend"></div><div class="step-it"><div class="sc2 pend">3</div><div class="sl2 pend">Documents</div></div></div>
 <div class="fr"><div class="fg"><div class="fl">First Name</div><input class="fi" placeholder="First name"></div><div class="fg"><div class="fl">Last Name</div><input class="fi" placeholder="Last name"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Date of Birth</div><input class="fi" type="date"></div><div class="fg"><div class="fl">Grade Applying For</div><select class="fs">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Parent Name</div><input class="fi" placeholder="Parent full name"></div><div class="fg"><div class="fl">Phone</div><input class="fi" placeholder="071 xxx xxxx"></div></div>
 <div class="fg"><div class="fl">Parent Email</div><input class="fi" placeholder="email@example.com" type="email"></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Application submitted — APP-004 created','success');CM()">Submit Application</button>`);}

function mAddInv(){OM('New Invoice',`
 <div class="fr"><div class="fg"><div class="fl">Student</div><select class="fs">${D.students.map(s=>`<option>${s.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Term</div><select class="fs"><option>Term 3 — 2025</option><option>Term 4 — 2025</option><option>Term 1 — 2026</option></select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Fee Type</div><select class="fs"><option>Tuition Fees</option><option>Uniform</option><option>Sports Levy</option><option>Stationery</option></select></div><div class="fg"><div class="fl">Amount (R)</div><input class="fi" placeholder="2500" type="number"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Due Date</div><input class="fi" type="date"></div><div class="fg"><div class="fl">Payment Method</div><select class="fs"><option>EFT</option><option>PayFast</option><option>Cash</option></select></div></div>
 <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;margin-top:6px"><input type="checkbox" checked style="accent-color:var(--g)">Send PayFast payment link to parent via WhatsApp</label>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Invoice created. PayFast link sent to parent.','success');CM()"><i class="ti ti-receipt" style="font-size:11px"></i>Create Invoice</button>`);}

function mNewMsg(){OM('New Message',`
 <div class="fg"><div class="fl">Send To</div><select class="fs"><option>All Parents</option>${D.classes.map(c=>`<option>${c.name} Parents</option>`).join('')}${D.parents.map(p=>`<option>${p.name}</option>`).join('')}${D.teachers.map(t=>`<option>${t.name}</option>`).join('')}</select></div>
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
 <div class="fr"><div class="fg"><div class="fl">Category</div><select class="fs"><option>Urgent</option><option>Academic</option><option>Events</option><option>Finance</option><option>General</option></select></div><div class="fg"><div class="fl">Audience</div><select class="fs"><option>All</option><option>Parents only</option><option>Teachers only</option></select></div></div>
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
 <div class="fr"><div class="fg"><div class="fl">Class Name</div><input class="fi" placeholder="e.g. Grade 4A"></div><div class="fg"><div class="fl">Room</div><input class="fi" placeholder="e.g. Room 5"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Class Teacher</div><select class="fs">${D.teachers.map(t=>`<option>${t.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Max Capacity</div><input class="fi" type="number" placeholder="35"></div></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Class created','success');CM()">Create Class</button>`);}

function mMarkAtt(){OM('Mark Attendance',`
 <div class="fr" style="margin-bottom:10px"><div class="fg" style="margin-bottom:0"><div class="fl">Class</div><select class="fs">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div><div class="fg" style="margin-bottom:0"><div class="fl">Date</div><input class="fi" type="date" value="${new Date().toISOString().split('T')[0]}"></div></div>
 <div style="max-height:250px;overflow-y:auto">${D.students.filter(s=>s.cls==='Grade 7A').map(s=>`<div class="flex ic g8" style="padding:6px 0;border-bottom:1px solid var(--sp)"><div class="av av-s" style="background:${s.bg};color:${s.fg}">${s.ini}</div><span style="flex:1;font-size:12px;font-weight:500">${s.name}</span>${[['P','Present'],['A','Absent'],['L','Late'],['E','Excused'],['S','Sick']].map(([o,lbl])=>`<label title="${lbl}" style="cursor:pointer"><input type="radio" name="ma_${s.id}" value="${o}" ${o==='P'?'checked':''} style="display:none"><div class="att-cell att-${o}">${o}</div></label>`).join('')}</div>`).join('')}</div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-w" onclick="T('Attendance saved. 2 parents notified via WhatsApp','wa');CM()"><i class="ti ti-check" style="font-size:11px"></i>Save Attendance</button>`);}

function mGenReports(){OM('Bulk Generate Report Cards',`
 <div class="fg"><div class="fl">Class</div><select class="fs">${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div>
 <div class="fg"><div class="fl">Term</div><select class="fs"><option>Term 3 — 2025</option><option>Term 2</option><option>Term 1</option></select></div>
 <div style="display:flex;flex-direction:column;gap:7px;margin-bottom:10px">
  <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--g)">Generate PDF report cards</label>
  <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--wd)"><i class="ti ti-brand-whatsapp" style="color:var(--wd)"></i>Send via WhatsApp to all parents</label>
  <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--g)">Email to parents</label>
  <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" style="accent-color:var(--b)">Track parent acknowledgement</label>
 </div>
 <div style="background:var(--ap);border:1px solid var(--a);border-radius:7px;padding:9px 12px;font-size:11px;color:var(--ad)"><i class="ti ti-info-circle" style="margin-right:4px"></i>This will generate report cards for all 32 students in the selected class and send via WhatsApp + email.</div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-w" onclick="T('32 report cards generated. Sending via WhatsApp to all parents...','wa');CM()"><i class="ti ti-certificate" style="font-size:11px"></i>Generate & Send All</button>`);}

function mAddEvent(){OM('Add Calendar Event',`
 <div class="fg"><div class="fl">Event Title</div><input class="fi" placeholder="e.g. Grade 7 Science Projects"></div>
 <div class="fr"><div class="fg"><div class="fl">Date</div><input class="fi" type="date"></div><div class="fg"><div class="fl">Type</div><select class="fs"><option>Academic</option><option>Exam</option><option>Event</option><option>Holiday</option></select></div></div>
 <div class="fr"><div class="fg"><div class="fl">Applicable to</div><select class="fs"><option>All</option>${D.classes.map(c=>`<option>${c.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Notify via WhatsApp</div><select class="fs"><option>Yes</option><option>No</option></select></div></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Event added. Parents notified.','success');CM()">Add Event</button>`);}

function mAddHealth(){OM('Add Health Record',`
 <div class="fg"><div class="fl">Student</div><select class="fs">${D.students.map(s=>`<option>${s.name}</option>`).join('')}</select></div>
 <div class="fr"><div class="fg"><div class="fl">Medical Condition</div><input class="fi" placeholder="e.g. Asthma or None"></div><div class="fg"><div class="fl">Allergy</div><input class="fi" placeholder="e.g. Peanuts or None"></div></div>
 <div class="fr"><div class="fg"><div class="fl">Blood Type</div><select class="fs"><option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option></select></div><div class="fg"><div class="fl">Medical Aid</div><input class="fi" placeholder="e.g. Discovery Kids"></div></div>
 <div class="fg"><div class="fl">Emergency Contact</div><input class="fi" placeholder="e.g. 071 xxx xxxx (Parent name)"></div>
 <div class="fg"><div class="fl">Family Doctor</div><input class="fi" placeholder="Dr. Name — 031 xxx xxxx"></div>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Health record saved','success');CM()">Save Record</button>`);}

function mLogInc(){OM('Log Discipline Incident',`
 <div class="fr"><div class="fg"><div class="fl">Student</div><select class="fs">${D.students.map(s=>`<option>${s.name}</option>`).join('')}</select></div><div class="fg"><div class="fl">Type</div><select class="fs"><option>Misconduct</option><option>Late</option><option>Absent</option><option>Bullying</option><option>Other</option></select></div></div>
 <div class="fg"><div class="fl">Description</div><textarea class="fta" placeholder="Describe the incident..."></textarea></div>
 <div class="fr"><div class="fg"><div class="fl">Date</div><input class="fi" type="date" value="${new Date().toISOString().split('T')[0]}"></div><div class="fg"><div class="fl">Reported by</div><select class="fs">${D.teachers.map(t=>`<option>${t.name}</option>`).join('')}</select></div></div>
 <div class="fg"><div class="fl">Action Taken</div><input class="fi" placeholder="e.g. Verbal warning, Parent notified"></div>
 <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;margin-top:5px"><input type="checkbox" checked style="accent-color:var(--wd)"><i class="ti ti-brand-whatsapp" style="color:var(--wd)"></i>Notify parent via WhatsApp</label>`,
 `<button class="btn btn-s" onclick="CM()">Cancel</button><button class="btn btn-g" onclick="T('Incident logged. Parent notified via WhatsApp.','wa');CM()">Log Incident</button>`);}

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

