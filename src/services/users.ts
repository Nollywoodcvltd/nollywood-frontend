import axios from 'axios';
import { NewUser, UpdatePasswordData, User } from '../types';
const baseUrl = 'https://nollywood-api.onrender.com/api/users';
// const baseUrl = 'http://localhost:3000/api/users';

const loggedAppUser = JSON.parse(localStorage.getItem('loggedAppUser') || '{}');
export const token = `Bearer ${loggedAppUser.token}`;

const getAuthConfig = () => ({
  headers: {
    Authorization: token,
  },
});

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getSingle = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const initializePayment = async (args: { email: string; amount: number }) => {
  const config = {
    headers: {
      ...getAuthConfig().headers,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(
    `${baseUrl}/initialize-payment/`,
    args,
    config
  );
  return response;
};

const verifyPayment = async (args: { email: string; reference: string }) => {
  const response = await axios.post(
    `${baseUrl}/verify-payment`,
    args,
    getAuthConfig()
  );

  return response;
};

const forgotPassword = async (email: string) => {
  const response = await axios.post(`${baseUrl}/forgot-password`, { email });
  return response.data;
};

const validateResetToken = async (token: string) => {
  const response = await axios.get(`${baseUrl}/validate-reset-token/${token}`);

  return response.data;
};

const resetPassword = async (args: { token: string; newPassword: string }) => {
  const response = await axios.post(`${baseUrl}/reset-password`, args);

  return response.data;
};

const create = async (newUser: NewUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

const deleteUser = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}/`);

  return response.data;
};

const updateUser = async (id: string, updatedUser: User) => {
  const response = await axios.put(
    `${baseUrl}/${id}/`,
    updatedUser,
    getAuthConfig()
  );

  return response.data;
};

const updatePassword = async (id: string, updatedUser: UpdatePasswordData) => {
  const response = await axios.put(
    `${baseUrl}/${id}/update-password`,
    updatedUser,
    getAuthConfig()
  );

  return response.data;
};

const updateProfilePicture = async (id: string, formData: FormData) => {
  const response = await axios.put(`${baseUrl}/upload/${id}/`, formData);

  return response.data;
};

export default {
  create,
  deleteUser,
  forgotPassword,
  getAll,
  getSingle,
  initializePayment,
  resetPassword,
  updateProfilePicture,
  updateUser,
  updatePassword,
  validateResetToken,
  verifyPayment,
};
