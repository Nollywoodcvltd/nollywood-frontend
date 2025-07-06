import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './Dashboard.scss';
import SideBar from './components/SideBar';
import DashboardTopBar from './components/DashboardTopBar';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className='dashboard-container'>
      {/* TopBar */}
      <DashboardTopBar isMobile={isMobile} toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      <SideBar
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className='main-content'>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
