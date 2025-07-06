import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usersService from '../../services/users';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import './ForgotPassword.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RenderPasswordRequirements from '../../Components/RenderPasswordRequirements';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [searchParams] = useSearchParams();
  const [tokenValid, setTokenValid] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const token = searchParams.get('token');

  if (!token) {
    throw new Error('Token is null');
  }

  useEffect(() => {
    const validate = async () => {
      try {
        const response = await usersService.validateResetToken(token);
        setEmail(response.email);
        setTokenValid(true);
      } catch {
        toast.error('Invalid or expired reset link');
        setTimeout(() => {
          navigate('/forgot-password');
        }, 3000);
      }
    };
    validate();
  }, [token]);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error('All fields are required.', {
        position: 'top-center',
      });
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters.', {
        position: 'top-center',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.', {
        position: 'top-center',
      });
      return;
    }
    try {
      await usersService.resetPassword({ token, newPassword });
      toast.success('Password successfully reset. You can now log in.');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch {
      toast.error('Failed to reset password');
    }
  };

  if (!tokenValid) return null;

  const passwordRequirements = [
    '8 Characters minimum',
    '1 Special Character',
    '1 Number',
    '1 Uppercase',
  ];

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  return (
    <Container
      fluid
      className='forgot-password-container d-flex flex-column align-items-center justify-content-center vh-100'
    >
      <h3 className='pb-5'>Password Recovery</h3>

      <Form onSubmit={handleReset} autoComplete='off'>
        <Form.Group controlId='formEmail' className='pb-4'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            autoComplete='new-email'
            placeholder='Enter your email'
            name='email'
            value={email}
            disabled
          />
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              autoComplete='new-password'
              placeholder='Enter your password'
              name='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </InputGroup.Text>
          </InputGroup>
          <div className='checkbox-group'>
            <div className='password-requirements-box'>
              {passwordRequirements.map((requirement, index) => (
                <RenderPasswordRequirements
                  password={newPassword}
                  requirement={requirement}
                  key={index}
                />
              ))}
            </div>
          </div>
        </Form.Group>

        <Form.Group controlId='formPassword' className='pb-4'>
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete='new-password'
              placeholder='Confirm password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <InputGroup.Text
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Button
          variant='warning'
          className='submit-btn btn'
          type='submit'
          disabled={
            !passwordRegex.test(newPassword) || newPassword !== confirmPassword
          }
        >
          Save Password
        </Button>
      </Form>
      <ToastContainer aria-label={undefined} />
    </Container>
  );
};

export default ResetPassword;
