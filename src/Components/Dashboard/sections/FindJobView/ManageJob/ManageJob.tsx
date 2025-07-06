import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import "./ManageJob.scss"

function ManageJob() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
    useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    }, []);
  return (
    <Container fluid className='dashboard-view'>
      <Row className='row'>
        <Col md={6} className='dashboard-card builder'>
        <a href="/dashboard/user-bio">
          <div className='message-box text-dark'>
            <h3>Post jobs</h3>
            <p>Post jobs adn recruit talents</p>{' '}
          </div>
          {!isMobile && (
            <div className='img-box'>
              <img
                src='/assets/post_job.png'
                alt=''
                className='object-fit-cover'
              />
            </div>
          )}
          </a>
        </Col>
        <Col md={6} className='dashboard-card builder'>
        <a href="/support">
          <div className='message-box text-dark'>
            <h3>Manage Jobs</h3>
            <p>Manage Posted Jobs</p>
          </div>
          {!isMobile && (
            <div className='img-box'>
              <img
                src='/assets/manage_job.png'
                alt=''
                className='two w-100 object-fit-cover'
              />
            </div>
          )}
          </a>
        </Col>
      </Row>
    </Container>
  )
}

export default ManageJob
