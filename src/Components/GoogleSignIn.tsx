import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {

        // Get user info from Google
        const userInfoResponse = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        // Send user info to backend
        const backendResponse = await axios.post(
          'https://nollywood-api.onrender.com/api/login/auth/google',
          {
            email: userInfoResponse.data.email,
            profilePicture: userInfoResponse.data.picture,
          }
        );

        localStorage.setItem(
          'loggedAppUser',
          JSON.stringify(backendResponse.data)
        );
        navigate('/dashboard');
      } catch (error) {
        console.error('Google sign-in error:', error);
        alert('Login Failed');
      }
    },
    onError: () => alert('Login Failed'),
    scope: 'openid email profile',
  });

  return (
    <Button variant='light' className='google-btn' onClick={() => login()}>
      <Image
        src='/assets/Google__G__logo.svg.png'
        alt='Google'
        fluid
        rounded
        style={{ width: '20px', marginRight: '10px' }}
      />
      Continue with Google
    </Button>
  );
};

export default GoogleSignIn;
