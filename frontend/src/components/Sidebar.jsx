const NAV = [
  { section: 'Overview', items: [
    { key: 'dashboard', icon: 'ti-layout-dashboard', label: 'Dashboard' },
  ]},
  { section: 'Students', items: [
    { key: 'students', icon: 'ti-users', label: 'Students' },
    { key: 'admissions', icon: 'ti-user-plus', label: 'Admissions', badge: '3' },
    { key: 'parents', icon: 'ti-heart-handshake', label: 'Parents' },
  ]},
  { section: 'Academic', items: [
    { key: 'classes', icon: 'ti-school', label: 'Classes' },
    { key: 'teachers', icon: 'ti-user-check', label: 'Teachers' },
    { key: 'subjects', icon: 'ti-book', label: 'Subjects & Marks' },
    { key: 'timetable', icon: 'ti-calendar-time', label: 'Timetable' },
    { key: 'attendance', icon: 'ti-calendar-check', label: 'Attendance' },
    { key: 'reportcards', icon: 'ti-certificate', label: 'Report Cards' },
  ]},
  { section: 'Finance', items: [
    { key: 'fees', icon: 'ti-receipt-2', label: 'Fees & Finance' },
  ]},
  { section: 'Communication', items: [
    { key: 'messages', icon: 'ti-message-circle', label: 'Messages', badge: '4', badgeClass: 'red' },
    { key: 'announcements', icon: 'ti-speakerphone', label: 'Announcements' },
    { key: 'documents', icon: 'ti-files', label: 'Documents' },
  ]},
];

export default function Sidebar({ active, onNavigate, user }) {
  return (
    <div className="sidebar">
      <div className="logo-area">
        <div className="logo-wrap">
          <div className="logo-icon">L</div>
          <div>
            <div className="logo-text">LwaziConnect</div>
            <div className="logo-sub">School Management</div>
          </div>
        </div>
        <div className="school-chip">
          <div className="live-dot"></div>
          <div>
            <div className="s-name">{user?.schoolName || 'Your School'}</div>
            <div className="s-plan">Professional · Active</div>
          </div>
          <i className="ti ti-chevron-down" style={{ fontSize: 10, color: 'rgba(255,255,255,.28)', marginLeft: 'auto' }}></i>
        </div>
      </div>
      <nav className="nav">
        {NAV.map((sec) => (
          <div key={sec.section}>
            <div className="nav-sec">{sec.section}</div>
            {sec.items.map((item) => (
              <div
                key={item.key}
                className={`nav-item${active === item.key ? ' active' : ''}`}
                onClick={() => onNavigate(item.key)}
              >
                <i className={`ti ${item.icon}`}></i>
                {item.label}
                {item.badge && <span className={`nbadge${item.badgeClass ? ' ' + item.badgeClass : ''}`}>{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <div className="sidebar-foot">
        <div className="user-row" onClick={user?.onLogout} style={{ cursor: 'pointer' }} title="Sign out">
          <div className="u-av">{user?.initials || '?'}</div>
          <div>
            <div className="u-name">{user?.name || 'User'}</div>
            <div className="u-role">{user?.role || ''}</div>
          </div>
          <i className="ti ti-logout" style={{ fontSize: 14, color: 'rgba(255,255,255,.28)', marginLeft: 'auto' }}></i>
        </div>
      </div>
    </div>
  );
}
