import { useState } from 'react';
import { Home } from './pages/Home';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';

type AppView = 'home' | 'student' | 'teacher';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');

  const handleLoginSelect = (role: 'student' | 'teacher') => {
    setCurrentView(role);
  };

  const handleLogout = () => {
    setCurrentView('home');
  };

  return (
    <>
      {currentView === 'home' && <Home onLoginSelect={handleLoginSelect} />}
      {currentView === 'student' && <StudentDashboard onLogout={handleLogout} />}
      {currentView === 'teacher' && <TeacherDashboard onLogout={handleLogout} />}
    </>
  );
}

export default App;
