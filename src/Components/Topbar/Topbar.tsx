import { useNavigate } from "react-router-dom";
import "./Topbar.scss";
// import SearchIcon from '@mui/icons-material/Search';

const TopBar = (props: {
  menuOpen: boolean;
  setMenuOpen: (arg0: boolean) => void | boolean;
}) => {
  const navigate = useNavigate();
  const user = window.localStorage.getItem("loggedAppUser");
  
  return (
    <div className={"topbar " + (props.menuOpen && "active")}>
      <div className="wrapper">
        <div className="left">
          <a
            onClick={() => {
              props.setMenuOpen(false);
              navigate("/");
            }}
            // href='#intro'
            className="explore-logo"
          >
            <div className="logo">
              <span className="title">Nollywoodcv.</span>
              <span className="title highlight">com</span>
            </div>
          </a>
        </div>
        {/*  */}
        <div className="middle">
          <div className="menu-items">
            <div className="item">
              <a href="/#">News</a>
              <span className="line"></span>
            </div>
            <div className="item">
              <a href="/explore-talent">Explore Talents</a>
              <span className="line"></span>
            </div>
            <div className="item">
              <a href="/about-us">About Us</a>
              <span className="line"></span>
            </div>
            <div className="item">
              <a href="/how-it-works">How it Works</a>
              <span className="line"></span>
            </div>

            <div className="item">
              <a href="/FAQ">FAQ</a>
              <span className="line"></span>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="right">
          <div
            className="hamburger"
            onClick={() => props.setMenuOpen(!props.menuOpen)}
          >
            <span className="line1"></span>
            <span className="line2"></span>
            <span className="line3"></span>
          </div>
          <div className="menu-items">
            {!user ? (
              <>
                <div className="item w-100">
                  <a href="/login" className="w-full d-flex">
                    Log In
                  </a>
                </div>
                <div className="item setup-btn w-100">
                  <a href="/signup">Sign Up</a>
                  <span className="line"></span>
                </div>
              </>
            ) : (
              <>
                <div className="item setup-btn w-100">
                  <a href="/dashboard">
                    Dashboard
                  </a>
                  <span className="line"></span>
                </div>
              </>
            )}

            {/* {!user && (
              <div className='item w-100'>
                <a href='/login' className='w-full d-flex'>Log In</a>
              </div>
            )} */}
            {/* <div className='item setup-btn w-100'>
              <a href='/signup'>Sign Up</a>
              <span className='line'></span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
