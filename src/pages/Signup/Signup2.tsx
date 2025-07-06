import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Signup.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container fluid className='signup-container'>
      <Row className='signup-wrapper'>
        {/* Left Side - Image */}
        <Col lg={6} className='d-none d-lg-block signup-image'>
          <h2 className='brand big-screen'>
            Nollywood <span>CV</span>
          </h2>
        </Col>

        {/* Right Side - Form */}
        <Col lg={6} className='signup-form'>
          <h2 className='brand'>
            Nollywood <span>CV</span>
          </h2>

          {/* Google Signup Button */}
          <Button variant='light' className='google-btn'>
            <img src='./src/assets/Google__G__logo.svg.png' alt='Google' />
            Continue with Google
          </Button>

          <div className='divider'>
            <div className='line'></div>
            <span>OR</span>
            <div className='line'></div>
          </div>

          {/* Signup Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter your email'
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter your password'
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
              />
              <div className='checkbox-group'>
                <div className='password-requirements-box'>
                  <p className='password-requirements'>
                    ✅ 8 Characters minimum
                  </p>
                  <p className='password-requirements'>
                    ✅ 1 Special Character
                  </p>
                  <p className='password-requirements'>✅ 1 Number</p>
                  <p className='password-requirements'>✅ 1 Uppercase</p>
                </div>
              </div>
            </Form.Group>

            <Form.Group controlId='formConfirmPassword'>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={userDetails.confirmPassword}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </Form.Group>

            {/* Terms & Privacy Policy */}
            <Form.Group className='checkbox-group'>
              <Form.Check
                type='checkbox'
                label={
                  <Link
                    className='form-check-label'
                    to='/privacy-policy'
                    target='_blank'
                  >
                    Terms and conditions
                  </Link>
                }
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
              />
            </Form.Group>

            {/* Submit Button */}
            <Button variant='warning' className='submit-btn'>
              Get Started
            </Button>

            {/* Already have an account */}
            <p className='login-link'>
              Already have an account? <a href='/login'>Log in</a>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
