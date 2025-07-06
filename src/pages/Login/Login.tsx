import { useState } from 'react';
import {
  Container,
  InputGroup,
  Row,
  Col,
  Form,
  Button,
  Spinner, // Add Spinner to the imports
} from 'react-bootstrap';
import './Login.scss';
import { LoginFormData } from '../../types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import loginService from '../../services/login';
import { useNavigate } from 'react-router-dom';
// import GoogleSignIn from '../../Components/GoogleSignIn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearAutoLogout, setupAutoLogout } from '../../utils/tokenManager';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogout = () => {
    clearAutoLogout();
    localStorage.clear();
    navigate('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('All fields are required.', {
        position: 'top-center',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await loginService.login(formData);

      if (user?.isVerified) {
        window.localStorage.setItem('loggedAppUser', JSON.stringify(user));
        // Setup auto-logout
        setupAutoLogout(user.token, () => {
          alert('Your session has expired.');
          handleLogout();
        });
        toast.success('Login successful! Redirecting...', {
          position: 'top-center',
        });
        setTimeout(() => {
          navigate('/dashboard');
          setTimeout(() => window.location.reload(), 100); // Small delay to ensure navigation completes
        }, 2000);
        // window.location.reload()
        // setTimeout(() => {
        //   navigate('/dashboard');
        // }, 2000);
      } else {
        toast.error('User not verified! Redirecting...', {
          position: 'top-center',
        });
        setTimeout(() => {
          navigate('/verify');
        }, 2000);
      }
      setFormData({ ...formData, email: '', password: '' });
    } catch (error) {
      toast.error('Wrong email or password', {
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className='login-container'>
      <Row className='login-wrapper'>
        <Col lg={6} className='d-none d-lg-block login-image'>
          <h2 className='brand big-screen'>
            <a
              href='https://www.nollywoodcv.com'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Nollywoodcv <span>.com</span>
            </a>
          </h2>
        </Col>

        <Col lg={6} className='login-form'>
          <h2 className='brand'>
            <a
              href='https://www.nollywoodcv.com'
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Nollywoodcv<span>.com</span>
            </a>
          </h2>

          {/* <GoogleSignIn /> */}

          <div className='divider'>
            <div className='line'></div>
            <span>😊</span>
            <div className='line'></div>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter your email'
                name='email'
                value={formData.email.trim()}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label className='paswword'>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  name='password'
                  value={formData.password}
                  autoComplete='current-password'
                  autoCapitalize='off'
                  autoCorrect='off'
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <InputGroup.Text
                  onClick={() =>
                    !isSubmitting && setShowPassword(!showPassword)
                  }
                  style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <p
              onClick={() => navigate('/forgot-password')}
              className='forgot-password-link'
            >
              <a href='#'>Forgot Password</a>
            </p>

            <Button
              variant='warning'
              className='submit-btn'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                    className='me-2'
                  />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>

            <p className='signup-link'>
              Don't have an account? <a href='/signup'>Signup</a>
            </p>
          </Form>
        </Col>
      </Row>
      <ToastContainer aria-label={undefined} />
    </Container>
  );
};

export default Login;
