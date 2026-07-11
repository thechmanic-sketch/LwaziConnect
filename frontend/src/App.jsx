import { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  students: 'Students',
  admissions: 'Admissions',
  parents: 'Parents',
  classes: 'Classes',
  teachers: 'Teachers',
  subjects: 'Subjects & Marks',
  timetable: 'Timetable',
  attendance: 'Attendance',
  reportcards: 'Report Cards',
  fees: 'Fees & Finance',
  messages: 'Messages',
  announcements: 'Announcements',
  documents: 'Documents',
};

export default function App() {
  const [active, setActive] = useState('dashboard');

  const user = {
    name: 'N. Khumalo',
    initials: 'NK',
    role: 'Administrator',
    schoolName: 'Durban Primary School',
    onLogout: () => {},
  };

  return (
    <div className="app">
      <Sidebar active={active} onNavigate={setActive} user={user} />
      <div className="main">
        <Topbar title={PAGE_TITLES[active] || active} roleLabel="Admin" />
        <div className="content">
          <p>{PAGE_TITLES[active]} page — coming next.</p>
        </div>
      </div>
    </div>
  );
}
