
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap';
import '../Login/Login.scss';
import { verify, resendVerification } from '../../services/profile';

type FormData = {
  email: string;
};

function VerifyForm() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [userEmail, setUserEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // setValue,
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  // Verify the token when component mounts
  useEffect(() => {
    if (!token) {
      setVerificationStatus('failed');
      setIsLoading(false);
      toast.error('No verification token provided');
      return;
    }

    const verifyToken = async () => {
      try {
        const result = await verify(token);
        
        if (result.error) {
          throw new Error(result.error);
        }

        if (result.message === 'Email verified successfully') {
          setVerificationStatus('success');
          // If backend returns email, use it:
          if (result.email) setUserEmail(result.email);
          
          toast.success(result.message || "You are now verified! Redirecting!...");
          setTimeout(() => navigate('/login'), 3000);
        } else {
          throw new Error(result.message || 'Verification failed');
        }
      } catch (error: any) {
        console.error('Verification error:', error);
        setVerificationStatus('failed');
        // toast.error(error.message || 'Invalid or expired verification link');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token, navigate]);

  const handleResendVerification = async (data: FormData) => {
    try {
      const result = await resendVerification(data);
      
      if (result.error) {
        throw new Error(result.error);
      }

      toast.success('Verification email resent successfully!');
      reset();
    } catch (error: any) {
      console.error('Resend error:', error);
      toast.error(error.message || 'Failed to resend verification email');
    }
  };

  if (isLoading) {
    return (
      <Container fluid className="login-container">
        <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Col md={6} className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Verifying your email...</span>
            </Spinner>
            <p className="mt-3">Verifying your email...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="login-container">
      <Row className="login-wrapper">
        <Col lg={6} className="d-none d-lg-block login-image">
          <h2 className="brand big-screen">
            Nollywoodcv<span>.com</span>
          </h2>
        </Col>

        <Col lg={6} className="login-form">
          <h2 className="brand">
            Nollywoodcv<span>.com</span>
          </h2>

          {verificationStatus === 'success' ? (
            <div className="text-center">
              <h4>Email Verified Successfully!</h4>
              {userEmail && <p>Your email {userEmail} has been verified.</p>}
              <p>You will be redirected to login shortly.</p>
              <Button 
                variant="warning" 
                onClick={() => navigate('/login')}
                className="mt-3"
              >
                Go to Login Now
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-4">
                <h4>Email Verification Failed</h4>
                <p>The verification link is invalid or has expired.</p>
              </div>

              <Form onSubmit={handleSubmit(handleResendVerification)}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    isInvalid={!!errors.email}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="warning"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-100 mb-3"
                >
                  {isSubmitting ? (
                    <Spinner as="span" animation="border" size="sm" />
                  ) : (
                    'Resend Verification Email'
                  )}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p>
                  Already have an account?{' '}
                  <a href="/login" className="text-warning">
                    Login here
                  </a>
                </p>
              </div>
            </>
          )}
        </Col>
      </Row>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}

export default VerifyForm;


// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap';
// import '../Login/Login.scss';
// import { verify, resendVerification } from "../../services/profile"

// type FormData = {
//   email: string;
// };

// function VerifyForm() {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);
//   const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     setValue,
//     watch,
//     reset
//   } = useForm<FormData>({
//     mode: 'onChange',
//     defaultValues: {
//       email: ''
//     }
//   });

//   const email = watch('email');

//   // Verify the token on component mount
//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         if (!token) {
//           throw new Error('No verification token provided');
//         }

//         const response = await verify(token);
//         setVerificationStatus('success');
//         setValue('email', response.user.email);
//         toast.success('Email verified successfully! Redirecting to login...');
        
//         setTimeout(() => navigate('/login'), 3000);
//       } catch (error: any) {
//         console.error('Verification error:', error);
//         setVerificationStatus('failed');
//         toast.error(error?.response?.data?.error || 'Invalid or expired verification link');
        
//         // Set email from error response if available
//         if (error.response?.data?.email) {
//           setValue('email', error.response.data.email);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     verifyToken();
//   }, [token, navigate, setValue]);

//   const onSubmit = async (data: FormData) => {
//     try {
//       await resendVerification(data);
//       toast.success('Verification email resent successfully. Please check your inbox.');
//       reset(); 
//     } catch (error: any) {
//       console.error('Resend error:', error);
      
//       if (error.response?.status === 429) {
//         toast.error('Please wait before requesting another verification email');
//       } else {
//         toast.error(error.response?.data?.error || 'Failed to resend verification email');
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <Container fluid className="login-container">
//         <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
//           <Col md={6} className="text-center">
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Verifying your email...</span>
//             </Spinner>
//             <p className="mt-3">Verifying your email...</p>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid className="login-container">
//       <Row className="login-wrapper">
//         <Col lg={6} className="d-none d-lg-block login-image">
//           <h2 className="brand big-screen">
//             Nollywoodcv<span>.com</span>
//           </h2>
//         </Col>

//         <Col lg={6} className="login-form">
//           <h2 className="brand">
//             Nollywoodcv<span>.com</span>
//           </h2>

//           {verificationStatus === 'success' ? (
//             <div className="text-center">
//               <h4>Email Verified Successfully!</h4>
//               <p>Your email {email} has been successfully verified.</p>
//               <p>You will be redirected to the login page shortly.</p>
//               <Button variant="warning" onClick={() => navigate('/login')}>
//                 Go to Login Now
//               </Button>
//             </div>
//           ) : (
//             <Form onSubmit={handleSubmit(onSubmit)} noValidate>
//               <div className="text-center mb-4">
//                 <h4>Email Verification Failed</h4>
//                 <p>The verification link is invalid or has expired.</p>
//               </div>

//               <Form.Group controlId="formEmail" className="mb-3">
//                 <Form.Label>Email Address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter your email"
//                   isInvalid={!!errors.email}
//                   {...register('email', {
//                     required: 'Email is required',
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: 'Invalid email address'
//                     }
//                   })}
//                   autoFocus
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors.email?.message}
//                 </Form.Control.Feedback>
//               </Form.Group>
              
//               <Button 
//                 variant="warning" 
//                 type="submit"
//                 disabled={isSubmitting || !!errors.email}
//                 className="w-100 mb-3"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Spinner as="span" animation="border" size="sm" className="me-2" />
//                     Sending...
//                   </>
//                 ) : (
//                   'Resend Verification Email'
//                 )}
//               </Button>

//               <div className="text-center mt-3">
//                 <p className="mb-0">
//                   Already have an account?{' '}
//                   <a href="/login" className="text-warning">
//                     Login here
//                   </a>
//                 </p>
//               </div>
//             </Form>
//           )}
//         </Col>
//       </Row>
//       <ToastContainer 
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </Container>
//   );
// }

// export default VerifyForm;