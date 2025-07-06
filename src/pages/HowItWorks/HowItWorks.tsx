import { Col, Container, Image, Row } from 'react-bootstrap';
import './HowItWorks.scss';
import Footer from '../../Components/Footer/Footer';
import TopBar from '../../Components/Topbar/Topbar';
import Menu from '../../Components/Menu/Menu';
import { useEffect, useState } from 'react';

const HowItWorks = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='how-it-works'>
      <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Container className='container text-center py-5'>
        <h2 className='mb-4'>How it works?</h2>

        <Row className='step align-items-center'>
          <Col md={4} className='step-item'>
            <div className='step-number'>1</div>
            <h4>Create Your Profile</h4>
            <p>
              Sign up for free and build a dynamic profile showcasing your
              skills, experiences, and portfolio. Upload headshots, and past
              projects to ensure you stand out.
            </p>
          </Col>
          {!isMobile && (
            <Image
              className='img first-curve'
              src='./src/assets/Vector_1.png'
            />
            // <img
            //   className='first-curve'
            //   src='./src/assets/Vector_1.png'
            //   alt=''
            // />
          )}

          <Col md={4} className='step-item two'>
            <div className='step-number'>2</div>
            <h4>Discover Opportunities</h4>
            <p>
              Explore a curated selection of casting calls, auditions, and
              industry events tailored to your profile. Our intuitive search
              tools help you find the perfect match for your talent.
            </p>
          </Col>
          {!isMobile && (
            <Image
              className='img second-curve'
              src='./src/assets/Vector_2.png'
            />
            // <img
            //   className='second-curve'
            //   src='./src/assets/Vector_2.png'
            //   alt=''
            // />
          )}

          <Col md={4} className='step-item three'>
            <div className='step-number'>3</div>
            <h4>Connect & Get Discovered</h4>
            <p>
              Engage directly with industry professionals through our networking
              tools. With an updated profile and active participation, you
              increase your visibility and open doors to your next big
              opportunity.
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default HowItWorks;
