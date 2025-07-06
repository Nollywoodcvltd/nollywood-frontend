import { Button } from 'react-bootstrap';
import { Menu as MenuIcon } from '@mui/icons-material';
// import TestUserIcon from '../../../assets/mabel-okoro.png';

const DashboardTopBar = ({
  isMobile,
  toggleSidebar,
}: {
  isMobile: boolean;
  toggleSidebar: () => void;
}) => {
  // const users = localStorage.getItem('user');
  return (
    <div className='topbar'>
      <div className='logo'>
        Nollywoodcv<span className='highlight'>.com</span>
      </div>

      {isMobile && (
        <Button className='menu-toggle' onClick={toggleSidebar} variant='light'>
          <MenuIcon />
        </Button>
      )}

      {!isMobile && (
        <p></p>
        // <div className='profile'>
        //   <div className='profile-photo'>
        //     <img src={TestUserIcon} alt='profile-photo' />
        //   </div>
        //   Mabel Okoro
        // </div>
      )}
    </div>
  );
};

export default DashboardTopBar;
