import { useState } from 'react';
// import axios from 'axios';
import usersService from '../../services/users';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Container, Form } from 'react-bootstrap';
import './ForgotPassword.scss';

const ForgotPasswordInstructions = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
    try {
      // await axios.post('/api/users/forgot-password', { email });
      await usersService.forgotPassword(email);

      toast.success(
        "If your email is in our system, you'll get reset password instructions",
        {
          position: 'top-center',
        }
      );
    } catch {
      toast.error('Something went wrong', {
        position: 'top-center',
      });
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <Container
      fluid
      className='forgot-password-container d-flex flex-column align-items-center justify-content-center vh-100'
    >
      <h3 className='pb-5'>Password Recovery</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formEmail' className='pb-4'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          variant='warning'
          className='submit-btn btn'
          type='submit'
          disabled={!emailRegex.test(email)}
        >
          Send
        </Button>
      </Form>
      <ToastContainer aria-label={undefined} />
    </Container>
  );
};

export default ForgotPasswordInstructions;
