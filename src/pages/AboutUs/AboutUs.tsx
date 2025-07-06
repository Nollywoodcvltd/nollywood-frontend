import { Container, Row, Col, Image } from 'react-bootstrap';
import './AboutUs.scss';
import TopBar from '../../Components/Topbar/Topbar';
import Menu from '../../Components/Menu/Menu';
import { useState } from 'react';
import Footer from '../../Components/Footer/Footer';

const AboutUs = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='about'>
      <Container className='about-us'>
        <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <Row className='text-center mb-4'>
          <Col>
            <h2>About Us.</h2>
            <p className='lead'>
              Welcome to Nollywood's most popular and authoritative CV builder
              platform. We are dedicated to empowering Nollywood filmmakers to
              connect, showcase, and shine in the competitive film industry.
            </p>
          </Col>
        </Row>
        <Row className='text-center mb-4'>
          <Col className='text-center'>
            <Image src='/assets/ANE_3275.JPG' fluid rounded />
          </Col>
        </Row>

        {/* <Row className='mission-section align-items-center mb-5'>
          <Col md={6}>
            <h3>Our Mission</h3>
          </Col>
          <Col md={6}>
            <p>
              At NollywoodCV, we believe that every filmmaker deserves to be
              seen, heard, and celebrated. Our mission is to provide a platform
              where Nollywood professionals can create stunning CVs, connect
              with industry peers, and access opportunities that can take their
              careers to the next level.
            </p>
          </Col>
        </Row> */}

        <Row className='vision-section text-center mb-5'>
          <Col>
          <h3>Our Mission</h3>
            <p>
              At NollywoodCV, we believe that every filmmaker deserves to be
              seen, heard, and celebrated. Our mission is to provide a platform
              where Nollywood professionals can create stunning CVs, connect
              with industry peers, and access opportunities that can take their
              careers to the next level.
            </p>
          </Col>
        </Row>
        <Row className='vision-section text-center mb-5'>
          <Col>
            <h3>Our Vision</h3>
            <p>
              Our vision is to become the go-to platform for Nollywood
              professionals, connecting them with opportunities, resources, and
              networks that can help them succeed in the industry. We aim to
              foster a community of collaboration, innovation, and creativity,
              where filmmakers can thrive and reach their full potential.
            </p>
          </Col>
        </Row>
        <Row className='vision-section text-center mb-5'>
          <Col>
          <h3>The Team.</h3>
          <p>
              NollywoodCV is more than just a platform - it's a community built
              by Nollywood filmmakers for Nollywood filmmakers. Our team
              consists of passionate individuals who understand the challenges
              and opportunities in the Nollywood industry.
            </p>
          </Col>
        </Row>

        {/* <Row className='team-section align-items-center mb-5'>
          <Col md={6} className='text-center'>
            <Image src='/assets/About-img.png' fluid rounded />
          </Col>
          <Col>
            <h3>The Team.</h3>
            <p>
              NollywoodCV is more than just a platform - it's a community built
              by Nollywood filmmakers for Nollywood filmmakers. Our team
              consists of passionate individuals who understand the challenges
              and opportunities in the Nollywood industry.
            </p>
          </Col>
        </Row> */}
      </Container>
      <Footer />
    </div>
  );
};

export default AboutUs;
