import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '/assets/dashboard-icon.svg';
import UserCVIcon from '/assets/user-cv.svg';
import FindIcon from '/assets/find.svg';
import PaymentIcon from '/assets/payment.svg';
import CustomerSupportIcon from '/assets/customer-support.svg';
import SettingsIcon from '/assets/settings.svg';
import LogoutIcon from '/assets/logout.svg';
// import DashboardIcon from '../../../assets/dashboard-icon.svg';
// import UserCVIcon from '../../../assets/user-cv.svg';
// import FindIcon from '../../../assets/find.svg';
// import PaymentIcon from '../../../assets/payment.svg';
// import CustomerSupportIcon from '../../../assets/customer-support.svg';
// import SettingsIcon from '../../../assets/settings.svg';
// import LogoutIcon from '../../../assets/logout.svg';

const SideBar = ({
  isSidebarOpen,
  toggleSidebar,
  isMobile,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
}) => {
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');

  const sideBarLinks = [
    {
      name: 'Dashboard',
      link: '',
      icon: DashboardIcon,
    },
    {
      name: 'User Bio',
      link: 'user-bio',
      icon: UserCVIcon,
    },
    {
      name: 'User CV',
      link: 'user-cv',
      icon: UserCVIcon,
    },
    {
      name: 'Jobs',
      link: 'find-job',
      icon: FindIcon,
    },
    {
      name: 'Explore Talent',
      link: 'explore-talent',
      icon: FindIcon,
    },
    {
      name: 'Payment',
      link: 'payment',
      icon: PaymentIcon,
    },
    {
      name: 'Customer Support',
      link: 'support',
      icon: CustomerSupportIcon,
    },
    {
      name: 'Settings',
      link: 'settings',
      icon: SettingsIcon,
    },
  ];

  const handleLogout = () => {
    // Ask the user for confirmation before logging out
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (!confirmed) {
      return;
    }
    localStorage.clear();

    navigate('/login');
  };

  return (
    <div
      className={`sidebar ${isSidebarOpen || !isMobile ? 'open' : 'closed'}`}
    >
      <div className='menu'>
        {sideBarLinks.map((link) => (
          <div
            onClick={() => {
              setMenuActive(true);
              setActiveMenu(link.name);
              toggleSidebar();

              if (link.name === 'Dashboard') {
                navigate(`/dashboard`);
              } else {
                navigate(`/dashboard/${link.link}`);
              }
            }}
            key={link.name}
            className={`menu-link ${
              menuActive && activeMenu === link.name ? 'active' : ''
            }`}
          >
            <div>
              <div className='icon-box'>
                <img src={link.icon} alt={`${link.name}-icon`} />
              </div>
              {link.name}
            </div>
          </div>
        ))}
        <div onClick={() => handleLogout()} className='menu-link'>
          <div>
            {' '}
            <div className='icon-box'>
              <img src={LogoutIcon} alt='logout-icon' />
            </div>
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
