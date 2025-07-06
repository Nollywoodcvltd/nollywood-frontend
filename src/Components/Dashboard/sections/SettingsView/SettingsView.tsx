import { Container, Row, Card } from 'react-bootstrap';
import './Settings.scss';
import { useNavigate } from 'react-router-dom';
import ResetPasswordIcon from '../../../../../public/assets/reset-password-icon.svg';
import CloseAccontIcon from '../../../../../public/assets/close-account-icon.svg';
// import ResetPasswordIcon from '../../../../assets/reset-password-icon.svg';
// import CardSettingIcon from '../../../../assets/card-settings-icon.svg';
// import CloseAccontIcon from '../../../../assets/close-account-icon.svg';

const SettingsView = () => {
  const navigate = useNavigate();

  return (
    <Container className='settings-view'>
      <div className='settings-container'>
        <Row className='row one'>
          <Card
            onClick={() => navigate('reset-password')}
            className='setting-card'
          >
            <Card.Body className='p-2'>
              <div className='setting-title'>
                <h5 className='setting-title-text text-warning'>
                  Reset Password
                </h5>
                <img
                  src={ResetPasswordIcon}
                  style={{ width: '15%', height: '100%' }}
                  alt=''
                />
              </div>
              <p className='setting-description'>Change your password</p>
            </Card.Body>
          </Card>
         
          <Card
            onClick={() => navigate('close-account')}
            className='setting-card danger'
          >
            <Card.Body className='p-2'>
              <div className='setting-title'>
                <h5 className='setting-title-text text-danger'>
                  Close account
                </h5>
                <img
                  src={CloseAccontIcon}
                  style={{ width: '15%', height: '100%' }}
                  alt=''
                />
              </div>
              <p className='setting-description'>Close your account</p>
            </Card.Body>
          </Card>
        </Row>
      </div>
    </Container>
  );
};

export default SettingsView;
