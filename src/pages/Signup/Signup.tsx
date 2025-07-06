import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Spinner,
} from 'react-bootstrap';
import './Signup.scss';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.scss';
import { FormData, NewUser } from '../../types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RenderPasswordRequirements from '../../Components/RenderPasswordRequirements';
import usersService from '../../services/users';
// import GoogleSignIn from '../../Components/GoogleSignIn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    privacyPolicyAccepted: false,
  });

  const passwordRequirements = [
    '8 Characters minimum',
    '1 Special Character',
    '1 Number',
    '1 Uppercase',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('All fields are required.', {
        position: 'top-center',
      });
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters.', {
        position: 'top-center',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.', {
        position: 'top-center',
      });
      return;
    }

    if (!formData.termsAccepted) {
      toast.error('You must accept the terms and conditions.', {
        position: 'top-center',
      });
      return;
    }

    const newClient: NewUser = {
      email: formData.email,
      password: formData.password,
    };

    setIsSubmitting(true); // Start loading
    try {
      await usersService.create(newClient);

      toast.success(
        'Signup successful! Please check your email for verification link. Redirecting...',
        {
          position: 'top-center',
        }
      );

      setTimeout(() => {
        navigate('/login');
      }, 2000);

      setFormData({
        ...formData,
        email: '',
        password: '',
        confirmPassword: '',
        privacyPolicyAccepted: false,
        termsAccepted: false,
      });
    } catch (e: any) {
      toast.error(
        e.response?.data?.error || 'An error occurred during signup',
        {
          position: 'top-center',
        }
      );
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <Container fluid className='signup-container'>
      <Row className='signup-wrapper'>
        <Col lg={6} className='d-none d-lg-block signup-image'>
          <h2 className='brand big-screen'>
            <a
              href='https://www.nollywoodcv.com'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Nollywoodcv.<span>com</span>
            </a>
          </h2>
        </Col>

        <Col lg={6} className='signup-form'>
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
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  name='password'
                  value={formData.password}
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
              <div className='checkbox-group'>
                <div className='password-requirements-box'>
                  {passwordRequirements.map((requirement, index) => (
                    <RenderPasswordRequirements
                      password={formData.password}
                      requirement={requirement}
                      key={index}
                    />
                  ))}
                </div>
              </div>
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirm password'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
                <InputGroup.Text
                  onClick={() =>
                    !isSubmitting &&
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className='checkbox-group'>
              <Form.Check
                type='checkbox'
                label={
                  <Link
                    className='form-check-label'
                    to='/terms-and-conditions'
                    target='_blank'
                  >
                    Terms and conditions
                  </Link>
                }
                name='termsAccepted'
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
              <Form.Check
                type='checkbox'
                label={
                  <Link
                    className='form-check-label'
                    to='/privacy-policy'
                    target='_blank'
                  >
                    Privacy Policy
                  </Link>
                }
                name='privacyPolicyAccepted'
                checked={formData.privacyPolicyAccepted}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </Form.Group>

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
                  Creating account...
                </>
              ) : (
                'Get Started'
              )}
            </Button>

            <p className='login-link'>
              Already have an account? <a href='/login'>Log in</a>
            </p>
          </Form>
        </Col>
      </Row>
      <ToastContainer aria-label={undefined} />
    </Container>
  );
};

export default Signup;
