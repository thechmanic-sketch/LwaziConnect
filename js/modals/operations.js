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

