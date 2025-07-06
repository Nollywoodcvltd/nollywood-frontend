import { Container, Row, Col, Card } from 'react-bootstrap';
import './SupportView.scss';
import WhatsAppIcon from '/assets/whatsapp-icon.svg';
import InstagramIcon from '/assets/instagram-icon.svg';
import FacebookIcon from '/assets/facebook-icon.svg';
import XIcon from '/assets/twitter-x-icon.svg';

// import WhatsAppIcon from '../../../../assets/whatsapp-icon.svg';
// import InstagramIcon from '../../../../assets/instagram-icon.svg';
// import FacebookIcon from '../../../../assets/facebook-icon.svg';
// import XIcon from '../../../../assets/twitter-x-icon.svg';

const SupportView = () => {
  return (
    <Container fluid className='customer-support'>
      <Row className='justify-content-center'>
        <Col md={6} lg={5} className='mb-3 col'>
          <Card
          onClick={() => window.open("https://wa.me/+2348050533253", "_blank")}
          className='support-card whatsapp'
          >
            <div className='support-icon-box'>
              <img
                src={WhatsAppIcon}
                style={{ width: '90%', height: '90%' }}
                alt='whatsapp-icon'
              />
            </div>
            <Card.Body className='support-text-box'>
              <Card.Title className='title'>WhatsApp</Card.Title>
              <Card.Text className='sub-text'>Live Chat on Whatsapp</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={5} className='mb-3 col'>
          <Card
          onClick={() => window.open("https://www.instagram.com/nollywoodcv?igsh=dGQyZXR6Z2NmZG9o", "_blank")}
          className='support-card instagram'
          >
            <div className='support-icon-box'>
              <img
                src={InstagramIcon}
                style={{ width: '90%', height: '90%' }}
                alt='instagram-icon'
              />
            </div>
            <Card.Body className='support-text-box'>
              <Card.Title className='title'>Instagram</Card.Title>
              <Card.Text className='sub-text'>Connect on Instagram</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={5} className='mb-3 col'>
          <Card
          onClick={() => window.open("https://X.com/Nollywoodcv.com", "_blank")}
          className='support-card x'
          >
            <div className='support-icon-box'>
              <img
                src={XIcon}
                style={{ width: '90%', height: '90%' }}
                alt='twitter-x-icon'
              />
            </div>
            <Card.Body className='support-text-box'>
              <Card.Title className='title'>X</Card.Title>
              <Card.Text className='sub-text'>Connect on X</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={5} className='mb-3 col'>
          <Card
          onClick={() => window.open("https://www.facebook.com/share/15xThfFkou/", "_blank")}
          className='support-card facebook'
          >
            <div className='support-icon-box'>
              <img
                src={FacebookIcon}
                style={{ width: '90%', height: '90%' }}
                alt='facebook-icon'
              />
            </div>
            <Card.Body className='support-text-box'>
              <Card.Title className='title'>Facebook</Card.Title>
              <Card.Text className='sub-text'>Connect on Facebook</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SupportView;
