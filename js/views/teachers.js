function rTeachers(area){
 area.innerHTML=`
 <div class="g3 mb18"><div class="sc"><div class="sc-icon ig"><i class="ti ti-user-check"></i></div><div class="sc-val">5</div><div class="sc-lbl">Active Staff</div></div><div class="sc"><div class="sc-icon ia"><i class="ti ti-user-minus"></i></div><div class="sc-val">1</div><div class="sc-lbl">On Leave</div></div><div class="sc"><div class="sc-icon ir"><i class="ti ti-school"></i></div><div class="sc-val">1</div><div class="sc-lbl">Sub Needed</div></div></div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-user-check"></i>Teaching Staff</div><button class="btn btn-g" onclick="mAddTeacher()"><i class="ti ti-user-plus" style="font-size:11px"></i>Add Teacher</button></div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Teacher</th><th>ID</th><th>Subject(s)</th><th>Classes</th><th>Phone</th><th>Status</th><th>Actions</th></tr></thead><tbody>
  ${D.teachers.map(t=>`<tr>
   <td><div class="flex ic g8"><div class="av av-s" style="background:${t.bg};color:${t.fg}">${t.ini}</div><div><div style="font-weight:600">${t.name}</div><div class="tsm">${t.email}</div></div></div></td>
   <td class="mono">${t.id}</td><td>${t.subject}</td>
   <td>${t.classes.map(c=>`<span class="pill pb" style="margin-right:2px">${c}</span>`).join('')}</td>
   <td>${t.phone}</td>
   <td><span class="pill ${sc(t.status)}">${sl(t.status)}</span>${t.status==='on-leave'?'<span class="tsm" style="color:var(--r);margin-left:5px">Sub needed</span>':''}</td>
   <td><div class="flex g6"><i class="ti ti-eye act" onclick="T('Viewing ${t.name}','')"></i><i class="ti ti-edit act" onclick="T('Editing ${t.name}','')"></i><i class="ti ti-brand-whatsapp act" style="color:var(--wd)" onclick="T('WhatsApp to ${t.name}','wa')"></i></div></td>
  </tr>`).join('')}
  </tbody></table></div>
 </div>`;
}

