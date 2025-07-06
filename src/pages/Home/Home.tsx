import { useState } from "react";
// import { useState, useEffect } from "react";
import TestUserIcon from "/assets/avatar.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";
import "./Home.scss";
import TopBar from "../../Components/Topbar/Topbar";
import Menu from "../../Components/Menu/Menu";
import RenderService from "../../Components/RenderService";
import RenderReason from "../../Components/RenderReason";
import RenderTestimonialCarousel from "../../Components/RenderTestimonialCarousel";
import RenderTable from "../../Components/RenderTable";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import { useTalents } from "../../hooks/useDashboard";
import {
  calculateAge,
  Talent,
} from "../../Components/Dashboard/sections/ExploreTalentView/ExploreTalentView";

// const talents = [
//   {
//     name: 'Henry Chukz ',
//     age: 25,
//     role: 'Actor',
//     img: '/assets/John_Doe.png',
//   },
//   {
//     name: 'Chinaza Orji',
//     age: 23,
//     role: 'Actress',
//     img: '/assets/Mabel_Okoro.png',
//   },
//   {
//     name: 'Jaybee Goshioha',
//     age: 24,
//     role: 'Actor',
//     img: '/assets/Peter_Chika.png',
//   },
//   {
//     name: 'Clara Obiorah',
//     age: 22,
//     role: 'Actress',
//     img: '/assets/Rita_Ozioma.png',
//   },
// ];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // const [activeTalent, setActiveTalent] = useState<number | null>(null);
  const { data: talents } = useTalents();

  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth < 768);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const services = [
    {
      id: 1,
      title: "Easy-to-use CV builder tools",
    },
    {
      id: 2,
      title: "Customizable templates to showcase your skills and experience",
    },
    {
      id: 3,
      title:
        "Opportunities to connect with industry professionals, production companies, and casting directors",
    },
  ];

  const reasonsForChoosingUs = [
    "Increase your visibility and credibility in the industry",
    "Connect with potential collaborators, employers, and clients",
    "Showcase your skills, experience, and achievements",

    "Stay ahead of the competition with exclusive training and mentorship programs",
  ];

  return (
    <div className="home">
      <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Container className="nollywood-cv">
        <div className="about">
          <div className="top">
            <p className="about-title">
              <span className="highlight">Discover talents: </span>
              {`Explore Nollywood film\nmakers\nportfolio and create an\nindustry standard CV`}
              .
            </p>
            <div className="about-description-box">
              <p className="about-description">{`Connecting Nollywood recruiters with cast and\ncrew Search, evaluate and discover exceptional\ntalents.`}</p>
            </div>
          </div>
          <div className="bottom"></div>
        </div>
        <div className="talents">
          <div className="description">
            <p className="left">
              Find and Hire Top{" "}
              <span>
                Nollywood <span className="highlight">Talents .</span>
              </span>
            </p>
            <p className="right">
              A cv builder for Nollywood <span>film makers to connect,</span>
              showcase and shine.
            </p>
          </div>
          <div className="talents-box">
            {talents?.slice(37, 41).map((talent: Talent, index: number) => (
              <div className="card" key={index}>
                <div
                  className="card-top"
                  style={{
                    backgroundImage: `url(${
                      talent?.user?.profilePicture || TestUserIcon
                    })`,
                  }}
                ></div>
                <div className="card-bottom">
                  <div className="name-and-age-box">
                    <div>
                      <div style={{ fontSize: '10px' }}>
                        {talent?.profile?.firstName} {talent?.profile?.lastName}
                      </div>
                      <div style={{ fontSize: '10px' }}>
                        {talent?.profile?.role}
                      </div>
                    </div>
                    <div style={{ fontSize: '10px' }}>Age: {calculateAge(talent?.profile?.dob)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className='talents-box'>
            {talents.map((talent: Talent, index: number) => (
              <div
                className={'card ' + (activeTalent === index && 'active')}
                onClick={() =>
                  isMobile &&
                  setActiveTalent(activeTalent === null ? index : null)
                }
                onMouseEnter={() => !isMobile && setActiveTalent(index)}
                onMouseLeave={() => !isMobile && setActiveTalent(null)}
                key={index}
              >
                <div
                  className='card-top'
                  style={{ backgroundImage: `url(${talent.user?.profilePicture})` }}
                ></div>
                <div className='card-bottom'>
                  {(isMobile && activeTalent === index) ||
                  (!isMobile && activeTalent === index) ? (
                    <div className='name-and-age-box'>
                      <div>
                        <div>{talent?.profile?.firstName} {talent?.profile?.lastName}</div>
                        <div>{talent?.profile?.role}</div>
                      </div>
                      <div>Age: {calculateAge(talent?.profile?.dob)}</div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div> */}
          <div className="text-center mt-4">
            <Link to="/explore-talent">
              <Button variant="warning" className="explore-btn">
                Explore Talent
              </Button>
            </Link>
          </div>
        </div>
        <div className="what-we-offer-box">
          <div className="what-we-offer">
            <div className="header">
              <h3 className="title">What We Offer:</h3>
              <p className="description">
                NollywoodCV offers a range of features and benefits, including:
              </p>
            </div>
            <div className="services">
              {services.map((service) => (
                <RenderService key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
        <div className="why-choose-us-box">
          <div className="header">
            <h3 className="title">Why Choose NollywoodCV:</h3>
            <p className="description">
              A cv builder for Nollywood film makers to connect, showcase and
              shine.
            </p>
          </div>
          <div className="reasons">
            {reasonsForChoosingUs.map((reason, index) => (
              <RenderReason reason={reason} index={index} />
            ))}
          </div>
        </div>

        <div className="table-box">
          <h3>Pricing</h3>
          <RenderTable />
        </div>

        <div className="testimonials">
          <div className="header">
            <h3 className="title">What Filmmakers Say About Us</h3>
          </div>
          <div className="carousel-box">
            <RenderTestimonialCarousel />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;

// import { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Button } from 'react-bootstrap';
// import './Home.scss';
// import TopBar from '../../Components/Topbar/Topbar';
// import Menu from '../../Components/Menu/Menu';
// import RenderService from '../../Components/RenderService';
// import RenderReason from '../../Components/RenderReason';
// import RenderTestimonialCarousel from '../../Components/RenderTestimonialCarousel';
// import RenderTable from '../../Components/RenderTable';
// import Footer from '../../Components/Footer/Footer';

// const talents = [
//   {
//     name: 'Henry Chukz ',
//     age: 25,
//     role: 'Actor',
//     img: '/assets/John_Doe.png',
//   },
//   {
//     name: 'Chinaza Orji',
//     age: 23,
//     role: 'Actress',
//     img: '/assets/Mabel_Okoro.png',
//   },
//   {
//     name: 'Jaybee Goshioha',
//     age: 24,
//     role: 'Actor',
//     img: '/assets/Peter_Chika.png',
//   },
//   {
//     name: 'Clara Obiorah',
//     age: 22,
//     role: 'Actress',
//     img: '/assets/Rita_Ozioma.png',
//   },
// ];

// const Home = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [activeTalent, setActiveTalent] = useState<number | null>(null);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const services = [
//     {
//       id: 1,
//       title: 'Easy-to-use CV builder tools',
//     },
//     {
//       id: 2,
//       title: 'Customizable templates to showcase your skills and experience',
//     },
//     {
//       id: 3,
//       title:
//         'Opportunities to connect with industry professionals, production companies, and casting directors',
//     },
//   ];

//   const reasonsForChoosingUs = [
//     'Increase your visibility and credibility in the industry',
//     'Connect with potential collaborators, employers, and clients',
//     'Showcase your skills, experience, and achievements',

//     'Stay ahead of the competition with exclusive training and mentorship programs',
//   ];

//   return (
//     <div className='home'>
//       <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
//       <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
//       <Container className='nollywood-cv'>
//         <div className='about'>
//           <div className='top'>
//             <p className='about-title'>
//               <span className='highlight'>Discover talents: </span>
//               {`Explore Nollywood film\nmakers\nportfolio and create an\nindustry standard CV`}
//               .
//             </p>
//             <div className='about-description-box'>
//               <p className='about-description'>{`Connecting Nollywood recruiters with cast and\ncrew Search, evaluate and discover exceptional\ntalents.`}</p>
//             </div>
//           </div>
//           <div className='bottom'></div>
//         </div>
//         <div className='talents'>
//           <div className='description'>
//             <p className='left'>
//               Find and Hire Top{' '}
//               <span>
//                 Nollywood <span className='highlight'>Talents .</span>
//               </span>
//             </p>
//             <p className='right'>
//               A cv builder for Nollywood <span>film makers to connect,</span>
//               showcase and shine.
//             </p>
//           </div>
//           <div className='talents-box'>
//             {talents.map((talent, index) => (
//               <div
//                 className={'card ' + (activeTalent === index && 'active')}
//                 onClick={() =>
//                   isMobile &&
//                   setActiveTalent(activeTalent === null ? index : null)
//                 }
//                 onMouseEnter={() => !isMobile && setActiveTalent(index)}
//                 onMouseLeave={() => !isMobile && setActiveTalent(null)}
//                 key={index}
//               >
//                 <div
//                   className='card-top'
//                   style={{ backgroundImage: `url(${talent.img})` }}
//                 ></div>
//                 <div className='card-bottom'>
//                   {(isMobile && activeTalent === index) ||
//                   (!isMobile && activeTalent === index) ? (
//                     <div className='name-and-age-box'>
//                       <div>
//                         <div>{talent.name}</div>
//                         <div>{talent.role}</div>
//                       </div>
//                       <div>Age: {talent.age}</div>
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className='text-center mt-4'>
//             <Button variant='warning' className='explore-btn'>
//               Explore Talent
//             </Button>
//           </div>
//         </div>
//         <div className='what-we-offer-box'>
//           <div className='what-we-offer'>
//             <div className='header'>
//               <h3 className='title'>What We Offer:</h3>
//               <p className='description'>
//                 NollywoodCV offers a range of features and benefits, including:
//               </p>
//             </div>
//             <div className='services'>
//               {services.map((service) => (
//                 <RenderService key={service.id} service={service} />
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className='why-choose-us-box'>
//           <div className='header'>
//             <h3 className='title'>Why Choose NollywoodCV:</h3>
//             <p className='description'>
//               A cv builder for Nollywood film makers to connect, showcase and
//               shine.
//             </p>
//           </div>
//           <div className='reasons'>
//             {reasonsForChoosingUs.map((reason, index) => (
//               <RenderReason reason={reason} index={index} />
//             ))}
//           </div>
//         </div>

//         <div className='table-box'>
//           <h3>Pricing</h3>
//           <RenderTable />
//         </div>

//         <div className='testimonials'>
//           <div className='header'>
//             <h3 className='title'>What Filmmakers Say About Us</h3>
//           </div>
//           <div className='carousel-box'>
//             <RenderTestimonialCarousel />
//           </div>
//         </div>
//       </Container>
//       <Footer />
//     </div>
//   );
// };

// export default Home;
