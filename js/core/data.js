// ══ DATA ══
// D.* arrays are populated from Supabase on login (see js/core/auth.js
// loadSchoolData/loadAllSchools). Empty here by default — no demo data.
const D={
 students:[],
 teachers:[],
 classes:[],
 parents:[],
 invoices:[],
 messages:[],
 announcements:[],
 documents:[],
 admissions:[],
 schools:[],
 discipline:[],
 health:[],
 calEvents:[],
 homework:[],
 sgbMembers:[],
 sgbMeetings:[],
 vehicles:[],
 staff:[],
 auditLog:[],
 campuses:[]
};


const SUBS=['Mathematics','English','IsiZulu','Natural Sciences','Social Sciences','Technology','Creative Arts','Life Skills'];
const TT_DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday'];
const TT_PERIODS=[{l:'Period 1',t:'07:30'},{l:'Period 2',t:'08:30'},{l:'Period 3',t:'09:30'},{l:'Break',t:'10:00'},{l:'Period 4',t:'11:00'},{l:'Period 5',t:'12:00'},{l:'Period 6',t:'13:00'}];
const TT_S={'Period 1':['Mathematics','English','IsiZulu','Mathematics','English'],'Period 2':['English','Mathematics','Mathematics','IsiZulu','Natural Sciences'],'Period 3':['Natural Sciences','Social Sciences','English','Technology','Mathematics'],'Period 4':['IsiZulu','Technology','Social Sciences','English','Creative Arts'],'Period 5':['Social Sciences','Natural Sciences','Life Skills','Creative Arts','IsiZulu'],'Period 6':['Life Skills','Creative Arts','Technology','Natural Sciences','Social Sciences']};
const SUB_C=['#D8F3DC|#1B4332','#EFF6FF|#1D6FA4','#FFF3CD|#B45309','#FEE2E2|#DC2626','#EDE9FE|#5B21B6','#D8F3DC|#1B4332','#E0F2FE|#0369A1','#FCE7F3|#9D174D'];
