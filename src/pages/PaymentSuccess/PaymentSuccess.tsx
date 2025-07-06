import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Container, Modal } from 'react-bootstrap';
import usersService from '../../services/users';
import './PaymentSuccess.scss';
import axios from 'axios';
import { clearAutoLogout } from '../../utils/tokenManager';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');
  const [email, setEmail] = useState('');
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
    clearAutoLogout();
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const retrievedUser = JSON.parse(loggedUserJSON);

      setEmail(retrievedUser.email);
    }
  }, []);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference || !email) return; // Ensure email is available

      try {
        const response = await usersService.verifyPayment({ reference, email });

        if (response.data.message) {
          setPaymentSuccessful(true);
          handleShow();
        } else {
          alert('Payment verification failed.');
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          logout();
          alert('Session expired. Please log in again.');
          return;
        }

        alert('Error verifying payment: ' + (error as Error).message);
      }
    };

    if (email) {
      verifyPayment(); // Only call when email is available
    }
  }, [email, reference]);

  return (
    <Container className='container'>
      {paymentSuccessful ? (
        <div className='welcome-msg-box'>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop='static'
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title className='checkmark'>Payment Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>Welcome to Premium!</h3>
              <p>Your payment was successful.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: '#ffb332', border: 'none' }}
                onClick={() => {
                  handleClose();
                  navigate('/dashboard');
                }}
              >
                Continue
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <h2>Verifying Payment...</h2>
      )}
    </Container>
  );
};

export default PaymentSuccess;
