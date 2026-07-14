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

