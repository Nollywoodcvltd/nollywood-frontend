import { useNavigate } from 'react-router-dom';
import './Menu.scss';
import { clearAutoLogout } from '../../utils/tokenManager';

const ListItem = (props: {
  open: (arg0: boolean) => void | boolean;
  message: string;
  href: string;
}) => {
  return (
    <li onClick={() => props.open(false)}>
      <a href={props.href}>{props.message}</a>
    </li>
  );
};

const Menu = (props: {
  menuOpen: boolean;
  setMenuOpen: (arg0: boolean) => void | boolean;
}) => {
  const navigate = useNavigate();
  const user = window.localStorage.getItem('loggedAppUser');

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      clearAutoLogout();
      navigate('/login');
      window.localStorage.clear();
    }
  };

  return (
    <div className={'menu ' + (props.menuOpen && 'active')}>
      <ul>
        <ListItem message='News' open={props.setMenuOpen} href='/#' />
        <ListItem
          message='Explore Talents'
          open={props.setMenuOpen}
          href='/explore-talent'
        />
        <ListItem
          message='About Us'
          open={props.setMenuOpen}
          href='/about-us'
        />
        <ListItem
          message='How it Works'
          open={props.setMenuOpen}
          href='/how-it-works'
        />
        <ListItem message='FAQ' open={props.setMenuOpen} href='/FAQ' />
        {/* <ListItem
          message='Services'
          open={props.setMenuOpen}
          href='#services'
        /> */}
        {/* <ListItem message='Contact' open={props.setMenuOpen} href='#contact' /> */}
      </ul>
      <div className='buttons-container'>
        {/* <button
          className='button-1'
          onClick={() => {
            navigate('/signup');
          }}
        >
          Sign Up
        </button> */}
        {!user ? (
          <>
            <button
              className='button-2'
              onClick={() => {
                navigate('/login');
              }}
            >
              Log In
            </button>
            <button
              className='button-1'
              onClick={() => {
                navigate('/signup');
              }}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            <button
              className='button-1'
              onClick={() => {
                navigate('/dashboard');
              }}
            >
              Dashboard
            </button>
            <button className='button-2' onClick={handleLogout}>
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
