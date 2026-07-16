function rMessages(area){
 const myMessages=D.messages;
 if(!CMsg&&myMessages.length)CMsg=myMessages[0].id;
 area.innerHTML=`<div style="display:grid;grid-template-columns:276px 1fr;gap:12px;height:calc(100vh-112px);height:calc(100vh - 112px)">
  <div class="card" style="padding:0;overflow:hidden;display:flex;flex-direction:column">
   <div style="padding:11px 13px;border-bottom:1px solid var(--sb);display:flex;gap:6px;align-items:center"><div style="flex:1;background:var(--sp);border-radius:6px;padding:0 9px;height:28px;display:flex;align-items:center;gap:5px"><i class="ti ti-search" style="font-size:12px;color:var(--sx)"></i><input type="text" placeholder="Search messages..." style="border:none;background:transparent;font-size:12px;color:var(--s);outline:none;width:100%"></div><div class="ibt" onclick="mNewMsg()" title="New Message"><i class="ti ti-square-plus" style="font-size:15px"></i></div></div>
   <div style="flex:1;overflow-y:auto" id="msgList">
   ${myMessages.length?myMessages.map(m=>`<div class="msg-li${m.id===CMsg?' active':''}${m.unread?' unread':''}" onclick="openMsg('${m.id}')" id="mli-${m.id}">
    <div style="width:5px;height:5px;border-radius:50%;background:${m.unread?'var(--a)':'transparent'};flex-shrink:0;margin-top:5px"></div>
    <div class="av av-s" style="background:${m.bg};color:${m.fg}">${m.ini}</div>
    <div style="flex:1;min-width:0"><div style="font-weight:600;font-size:12px">${m.from}</div><div class="tsm" style="margin-bottom:1px">${m.role}</div><div style="font-size:11px;color:var(--sx);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px">${m.thread.length?m.thread[m.thread.length-1].text:'No messages yet'}</div></div>
    <div class="tsm">${m.time}</div>
   </div>`).join(''):'<div class="tsm" style="padding:16px">No conversations yet.</div>'}
   </div>
  </div>
  <div class="card" style="padding:0;overflow:hidden;display:flex;flex-direction:column" id="chatPanel">${rChatPanel(CMsg)}</div>
 </div>`;
}
function rChatPanel(id){
 const m=D.messages.find(x=>x.id===id);if(!m)return'<div class="tsm" style="padding:16px">Select a conversation, or start a new one.</div>';
 return`<div style="padding:11px 14px;border-bottom:1px solid var(--sb);display:flex;align-items:center;gap:9px">
   <div class="av av-m" style="background:${m.bg};color:${m.fg}">${m.ini}</div>
   <div><div style="font-weight:600;font-size:13px">${m.from}</div><div class="tsm">${m.role}</div></div>
  </div>
  <div style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:1px" id="chatMsgs">
   ${m.thread.length?m.thread.map(msg=>`
   <div class="chat-meta${msg.dir==='out'?' right':''}">${msg.dir==='out'?'You':m.from} · ${msg.time}</div>
   <div style="display:flex;justify-content:${msg.dir==='out'?'flex-end':'flex-start'}">
    <div class="chat-bubble ${msg.dir==='in'?'chat-in':'chat-out'}">${msg.text}</div>
   </div>`).join(''):'<div class="tsm" style="padding:10px 0">No messages yet — say hello.</div>'}
  </div>
  <div style="padding:9px 12px;border-top:1px solid var(--sb)">
   <div style="display:flex;gap:7px;align-items:flex-end">
    <textarea id="msgIn" placeholder="Type a reply..." style="flex:1;border:1px solid var(--sb);border-radius:8px;padding:8px 10px;font-size:12px;color:var(--s);resize:none;height:50px;outline:none;font-family:Inter" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg('${id}');}"></textarea>
    <button class="btn btn-g" style="height:34px;font-size:10px;padding:0 10px" id="msgSendBtn" onclick="sendMsg('${id}')"><i class="ti ti-send" style="font-size:11px"></i></button>
   </div>
  </div>`;
}
function openMsg(id){
 CMsg=id;
 document.querySelectorAll('.msg-li').forEach(el=>el.classList.remove('active'));
 const li=document.getElementById(`mli-${id}`);
 if(li){li.classList.add('active');li.classList.remove('unread');const dot=li.querySelector('div');if(dot)dot.style.background='transparent';}
 document.getElementById('chatPanel').innerHTML=rChatPanel(id);
}
async function sendMsg(id){
 const inp=document.getElementById('msgIn');const txt=inp?.value.trim();if(!txt)return;
 if(!CU_PROFILE){T('Please re-login','error');return;}
 const btn=document.getElementById('msgSendBtn');
 if(btn)btn.disabled=true;
 try{
  const {error}=await sb.from('messages').insert({thread_id:id,sender_id:CU_PROFILE.id,body:txt,channel:'app'});
  if(error)throw error;
  inp.value='';
  await loadMessages(CU_PROFILE.id);
  CMsg=id;
  V('messages');
 }catch(err){
  T(err.message||'Failed to send message','error');
 }finally{
  if(btn)btn.disabled=false;
 }
}

function annVisible(a){
 if(CU_ROLE==='admin'||CU_ROLE==='principal'||CU_ROLE==='superadmin')return true;
 if(a.audience==='All')return true;
 if(CU_ROLE==='teacher')return a.audience==='Teachers only';
 if(CU_ROLE==='parent')return a.audience==='All Parents'||a.audience==='Fee Defaulters';
 if(CU_ROLE==='student')return a.audience==='Students only';
 return false;
}
function rAnnouncements(area){
 const canManage=CU_ROLE==='admin'||CU_ROLE==='principal'||CU_ROLE==='superadmin';
 const anns=D.announcements.filter(annVisible);
 area.innerHTML=`
 <div class="g3 mb18">
  <div class="sc"><div class="sc-icon ir"><i class="ti ti-alert-circle"></i></div><div class="sc-val">${anns.filter(a=>a.tag==='Urgent').length}</div><div class="sc-lbl">Urgent active</div></div>
  <div class="sc"><div class="sc-icon iw"><i class="ti ti-brand-whatsapp"></i></div><div class="sc-val">${anns.reduce((a,x)=>a+(x.sent||0),0)}</div><div class="sc-lbl">WhatsApp msgs sent</div></div>
  <div class="sc"><div class="sc-icon ig"><i class="ti ti-eye"></i></div><div class="sc-val">${(()=>{const t=anns.reduce((a,x)=>a+(x.sent||0),0);return t?Math.round(anns.reduce((a,x)=>a+(x.read||0),0)/t*100):0;})()}%</div><div class="sc-lbl">Avg read rate</div></div>
 </div>
 <div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-speakerphone"></i>Announcements</div>${canManage?'<button class="btn btn-g" onclick="mNewAnn()"><i class="ti ti-plus" style="font-size:11px"></i>New</button>':''}</div>
  ${anns.map(a=>`<div class="ann-item">
   <div class="ann-bar" style="background:${a.color}"></div>
   <div style="flex:1">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:9px">
     <div class="ann-title">${a.title}</div>
     ${canManage?`<div class="flex g6" style="flex-shrink:0"><i class="ti ti-edit act" onclick="T('Editing','')"></i><i class="ti ti-trash act" style="color:var(--r)" onclick="T('Deleted','error')"></i></div>`:''}
    </div>
    <div class="ann-body">${a.body}</div>
    <div class="ann-meta" style="margin-top:7px">
     <span class="ann-tag">${a.tag}</span>
     ${a.wa?'<span class="pill pw"><i class="ti ti-brand-whatsapp"></i> WhatsApp</span>':''}
     ${a.rsvp>0?`<span class="pill pb"><i class="ti ti-calendar-check"></i> ${a.rsvp} RSVPs</span>`:''}
     <span class="tsm">${a.date}</span>
     ${canManage?`<div class="dstat"><i class="ti ti-send" style="font-size:10px"></i>${a.sent} sent</div>
     <div class="dstat"><i class="ti ti-check" style="font-size:10px;color:var(--b)"></i>${a.delivered} delivered</div>
     <div class="dstat"><i class="ti ti-eye" style="font-size:10px;color:var(--g)"></i>${a.read} read</div>
     <button style="margin-left:auto;background:none;border:none;cursor:pointer;font-size:11px;color:var(--g)" onclick="T('Resent to ${a.sent} recipients','wa')"><i class="ti ti-send" style="font-size:10px;margin-right:2px"></i>Resend</button>`:''}
    </div>
   </div>
  </div>`).join('')||'<div class="tsm" style="padding:12px 0">No announcements right now.</div>'}
 </div>`;
}

function rDocuments(area){
 const ic={pdf:'ti-file-type-pdf',xlsx:'ti-file-spreadsheet'};const icol={pdf:'var(--r)',xlsx:'var(--b)'};
 const acCol={All:'pg',Parents:'pb',Staff:'pa',Admin:'pr'};
 const canManage=CU_ROLE==='admin'||CU_ROLE==='principal'||CU_ROLE==='superadmin';
 const visibleAccess=canManage?['All','Parents','Staff','Admin']:CU_ROLE==='teacher'?['All','Staff']:['All','Parents'];
 const docs=D.documents.filter(d=>visibleAccess.includes(d.access));
 area.innerHTML=`<div class="card">
  <div class="card-head"><div class="card-title"><i class="ti ti-files"></i>Document Library</div>
   <div class="flex g8"><select class="fs" style="width:140px;height:28px;font-size:11px"><option>All Categories</option><option>Forms</option><option>Finance</option><option>Policies</option><option>Academic</option><option>HR</option></select>${canManage?'<button class="btn btn-g" onclick="mUploadDoc()"><i class="ti ti-upload" style="font-size:11px"></i>Upload</button>':''}</div>
  </div>
  <div style="background:var(--ap);border:1px solid var(--a);border-radius:7px;padding:9px 12px;font-size:11px;color:var(--ad);margin-bottom:12px"><i class="ti ti-lock" style="margin-right:4px"></i><strong>Role-based access active.</strong> Documents restricted by: Admin → Staff → Parents → Students.</div>
  <div class="tw-wrap"><table class="dt"><thead><tr><th>Document</th><th>Category</th><th>Access</th><th>Size</th><th>Uploaded by</th><th>Date</th><th>Actions</th></tr></thead><tbody>
  ${docs.map(d=>`<tr>
   <td><div class="flex ic g8"><i class="ti ${ic[d.type]||'ti-file'}" style="font-size:19px;color:${icol[d.type]||'var(--sl)'}"></i><span style="font-weight:500">${d.name}</span></div></td>
   <td><span class="pill pn">${d.cat}</span></td>
   <td><span class="pill ${acCol[d.access]||'pn'}"><i class="ti ti-lock" style="font-size:9px"></i>${d.access}</span></td>
   <td class="tsm">${d.size}</td><td>${d.by}</td><td>${d.date}</td>
   <td><div class="flex g6"><i class="ti ti-eye act" onclick="openDocument('${d.id}')"></i><i class="ti ti-download act" onclick="downloadDocument('${d.id}')"></i><i class="ti ti-share act" onclick="T('Shared via WhatsApp','wa')"></i>${canManage?`<i class="ti ti-trash act" style="color:var(--r)" onclick="deleteDocument('${d.id}')"></i>`:''}</div></td>
  </tr>`).join('')}
  </tbody></table></div>
 </div>`;
}

async function openDocument(id){
 const doc=D.documents.find(d=>d.id===id);
 if(!doc||!doc.storagePath){T('Document not found','error');return;}
 const {data,error}=await sb.storage.from('documents').createSignedUrl(doc.storagePath,300);
 if(error||!data){T(error?.message||'Failed to open document','error');return;}
 window.open(data.signedUrl,'_blank');
}

async function downloadDocument(id){
 const doc=D.documents.find(d=>d.id===id);
 if(!doc||!doc.storagePath){T('Document not found','error');return;}
 const {data,error}=await sb.storage.from('documents').createSignedUrl(doc.storagePath,300,{download:doc.name});
 if(error||!data){T(error?.message||'Failed to download document','error');return;}
 window.open(data.signedUrl,'_blank');
}

async function deleteDocument(id){
 const doc=D.documents.find(d=>d.id===id);
 if(!doc)return;
 if(!confirm(`Delete "${doc.name}"? This can't be undone.`))return;
 try{
  if(doc.storagePath){
   const {error:sErr}=await sb.storage.from('documents').remove([doc.storagePath]);
   if(sErr)throw sErr;
  }
  const {error}=await sb.from('documents').delete().eq('id',id);
  if(error)throw error;
  T('Document deleted','success');
  const schoolId=CU_SCHOOL?.id||CU_PROFILE?.school_id;
  await loadSchoolData(schoolId);
  V('documents');
 }catch(err){
  T(err.message||'Failed to delete document','error');
 }
}

