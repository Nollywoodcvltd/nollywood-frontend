import { Container, Row, Col, Button } from 'react-bootstrap';
import CloseAccontIcon from '/assets/close-account-icon.svg';
// import CloseAccontIcon from '../../../../assets/close-account-icon.svg';
import './CloseAccountView.scss';

const CloseAccountView = () => {
  return (
    <Container className='close-account'>
      <Row className='row'>
        <Col md={8} lg={6} className='col'>
          <div className='warning-icon'>
            <img src={CloseAccontIcon} alt='close-account-icon' />
          </div>
          <h2>After Closing account</h2>
          <div>
            <ul className='warning-list'>
              <li>Permanently unable to login or use your account</li>
              <li>Profile and career details will be cleared</li>
              <li>All gained benefits will also be cleared</li>
            </ul>
          </div>
          <Button
            style={{ backgroundColor: '#DF0D0D', border: 'none' }}
            className='close-btn'
          >
            Close Account
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CloseAccountView;
