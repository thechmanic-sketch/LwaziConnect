function rParents(area){
 area.innerHTML=`<div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-heart-handshake"></i>Parent Directory</div>
   <div class="flex g8">
    <button class="btn btn-w" onclick="T('WhatsApp broadcast sent to all parents','wa')"><i class="ti ti-brand-whatsapp" style="font-size:11px"></i>Broadcast All</button>
    <button class="btn btn-g" onclick="mAddParent()"><i class="ti ti-user-plus" style="font-size:11px"></i>Add Parent</button>
   </div>
  </div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th class="cc"><input type="checkbox" class="rc" onchange="togAll(this,'parT')"></th><th>Parent</th><th>Children</th><th>Phone</th><th>Portal</th><th>Status</th><th>Actions</th></tr></thead><tbody>
  ${D.parents.map(p=>`<tr>
   <td><input type="checkbox" class="rc" data-id="${p.name}" onchange="togRow(this,'${p.name}')"></td>
   <td><div class="flex ic g8"><div class="av av-s" style="background:${p.bg};color:${p.fg}">${p.ini}</div><span style="font-weight:600">${p.name}</span></div></td>
   <td>${p.children.map(c=>`<span class="pill pg">${c}</span>`).join(' ')}</td>
   <td>${p.phone}</td>
   <td>${p.portal?'<span class="pill pg"><i class="ti ti-check"></i> Active</span>':`<button class="btn btn-s" style="height:22px;font-size:10px;padding:0 7px" onclick="T('Portal invite sent via WhatsApp','wa')">Invite</button>`}</td>
   <td><span class="pill ${sc(p.status)}">${sl(p.status)}</span></td>
   <td><div class="flex g6"><i class="ti ti-brand-whatsapp act" style="color:var(--wd)" onclick="T('WhatsApp to ${p.name}','wa')"></i><i class="ti ti-edit act" onclick="T('Editing ${p.name}','')"></i></div></td>
  </tr>`).join('')}
  </tbody></table></div>
 </div>`;
}

