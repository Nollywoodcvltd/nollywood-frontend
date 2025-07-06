import axios from 'axios';
import usersService from '../../../../../services/users';

export const initializePayment = async (
  email: string,
  amount: number,
  logout: () => void
) => {
  try {
    const response = await usersService.initializePayment({
      email,
      amount,
    });

    if (response.data.status) {
      window.location.href = response.data.data.authorization_url; // Redirect to Paystack
    } else {
      alert('Payment initialization failed');
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error);

      const status = error.response.status;

      if (status === 401) {
        logout();
        alert('Session expired. Please log in again.');
        return;
      }

      alert(
        'Error initializing payment: ' +
          error.response.data.error +
          error.response.data.details
      );
    } else if (error instanceof Error) {
      console.log(error);
      alert('Error initializing payment: ' + error.message);
    } else {
      console.log(error);
      alert('Error initializing payment');
    }
  }
};
