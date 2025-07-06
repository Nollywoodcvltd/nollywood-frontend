import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import './ResetPasswordView.scss';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UpdatePasswordData } from '../../../../types';
import usersService from '../../../../services/users';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { clearAutoLogout } from '../../../../utils/tokenManager';

const ResetPasswordView = () => {
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [readOnly, setReadOnly] = useState(true);

  const logout = () => {
    clearAutoLogout();
    localStorage.clear();
    navigate('/login');
  };

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const updatedUser: UpdatePasswordData = {
        email: user.email,
        currentPassword: currentPassword,
        newPassword: newPassword,
      };

      try {
        const response = await usersService.updatePassword(
          user.id,
          updatedUser
        );

        toast.success(response.message, {
          position: 'top-center',
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (
          error.response &&
          (error.response.status === 401 ||
            error.response.data?.error === 'token expired')
        ) {
          logout();
          alert('Session expired. Please log in again.');
          return;
        }

        toast.error(`Error updating password: ${error.response.data.error}`, {
          position: 'top-center',
        });
      }
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <Container fluid className='reset-password'>
      <Row className='justify-content-center'>
        <Col md={6} className='form-container'>
          <h3>Reset Password</h3>
          <Form onSubmit={handleReset} autoComplete='off'>
            <Form.Group controlId='currentPassword'>
              <Form.Label>Current Password</Form.Label>
              <InputGroup className='input-group'>
                <Form.Control
                  type={showCurrentPassword ? 'text' : 'password'}
                  name='no-browser-save-current'
                  autoComplete='off'
                  readOnly={readOnly}
                  onFocus={() => setReadOnly(false)}
                  onBlur={() => setReadOnly(true)}
                  placeholder='Enter your current password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <InputGroup.Text
                  className='icon-box'
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={{ cursor: 'pointer' }}
                >
                  {showCurrentPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId='newPassword'>
              <Form.Label>New Password</Form.Label>
              <InputGroup className='input-group'>
                <Form.Control
                  type={showNewPassword ? 'text' : 'password'}
                  name='no-browser-save-current'
                  autoComplete='off'
                  readOnly={readOnly}
                  onFocus={() => setReadOnly(false)}
                  onBlur={() => setReadOnly(true)}
                  placeholder='Enter New password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <InputGroup.Text
                  className='icon-box'
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{ cursor: 'pointer' }}
                >
                  {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </InputGroup.Text>
              </InputGroup>
              <ul className='password-requirements'>
                <li
                  className={newPassword.match(/[A-Z]/) ? 'valid' : 'invalid'}
                >
                  At least one uppercase
                </li>
                <li className={newPassword.length >= 8 ? 'valid' : 'invalid'}>
                  Minimum of 8 characters
                </li>
                <li
                  className={newPassword.match(/[a-z]/) ? 'valid' : 'invalid'}
                >
                  At least one lowercase
                </li>
                <li
                  className={
                    newPassword.match(/[^a-zA-Z0-9]/) ? 'valid' : 'invalid'
                  }
                >
                  At least one symbol
                </li>
              </ul>
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup className='input-group'>
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='no-browser-save-current'
                  autoComplete='off'
                  readOnly={readOnly}
                  onFocus={() => setReadOnly(false)}
                  onBlur={() => setReadOnly(true)}
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputGroup.Text
                  className='icon-box'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: 'pointer' }}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button
              className='reset-btn'
              type='submit'
              disabled={
                !passwordRegex.test(newPassword) ||
                newPassword !== confirmPassword
              }
            >
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer aria-label={undefined} />
    </Container>
  );
};

export default ResetPasswordView;
