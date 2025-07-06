// import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function FirstView() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
    useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    }, []);
  return (
    <Container fluid className='dashboard-view'>
      <Row className='row'>
        <Col md={6} className='dashboard-card light-orange'>
        <a href="/dashboard/user-bio">
          <div className='message-box'>
            <h3>Create Bio</h3>
            <p>Edit your profile details</p>{' '}
          </div>
          {!isMobile && (
            <div className='img-box'>
              <img
                src='/assets/edit-cv-vector.png'
                alt=''
                className='one'
              />
            </div>
          )}
          </a>
        </Col>
        <Col md={6} className='dashboard-card light-orange'>
        <a href="/support">
          <div className='message-box'>
            <h3>Customer Support</h3>
            <p>How can we assist you?</p>
          </div>
          {!isMobile && (
            <div className='img-box'>
              <img
                src='/assets/customer-services-vector.png'
                alt=''
                className='two'
              />
            </div>
          )}
          </a>
        </Col>
      </Row>
    </Container>
  )
}

export default FirstView
