export default function Topbar({ title, roleLabel }) {
  return (
    <div className="topbar">
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="page-title">{title}</div>
      </div>
      <div style={{ background: 'var(--gp)', color: 'var(--g)', borderRadius: 7, padding: '4px 11px', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
        <i className="ti ti-shield-check" style={{ fontSize: 12 }}></i>
        <span>{roleLabel}</span>
      </div>
      <div className="srch">
        <i className="ti ti-search" style={{ fontSize: 13, color: 'var(--sx)' }}></i>
        <input type="text" placeholder="Search..." />
      </div>
      <div className="ibt">
        <i className="ti ti-bell" style={{ fontSize: 14 }}></i>
        <div className="npip"></div>
      </div>
      <div className="ibt" style={{ color: 'var(--wd)' }}>
        <i className="ti ti-brand-whatsapp" style={{ fontSize: 14 }}></i>
      </div>
      <button className="btn btn-g">
        <i className="ti ti-plus" style={{ fontSize: 12 }}></i>
        <span>Add Student</span>
      </button>
    </div>
  );
}
