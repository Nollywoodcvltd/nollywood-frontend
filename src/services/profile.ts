import axios from 'axios';
import {
  AwardFormData,
  EducationFormData,
  BioFormData,
  FilmographyFormData,
  ProfessionalSummaryFormData,
  ProfileFormData,
  SkillFormData,
  SocialsFormData,
} from '../types';

// export const baseUrl = "http://localhost:3000"
export const baseUrl = 'https://nollywood-api-5jn6.onrender.com';

const loggedAppUser = JSON.parse(localStorage.getItem('loggedAppUser') || '{}');
export const token = loggedAppUser.token;

export const createProfile = async (data: ProfileFormData): Promise<any> => {
  const response = await axios.post(`${baseUrl}/create-profile/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createBio = async (data: BioFormData): Promise<any> => {
  const response = await axios.post(`${baseUrl}/create-profile/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getProfile = async (): Promise<any> => {
  const response = await axios.get(`${baseUrl}/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// getProfile()

export const createSocials = async (data: SocialsFormData): Promise<any> => {
  const response = await axios.post(`${baseUrl}/socials/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log('socials', response.data);
  return response.data;
};

export const getSocials = async (): Promise<any> => {
  const response = await axios.get(`${baseUrl}/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createProfession = async (
  data: ProfessionalSummaryFormData
): Promise<any> => {
  const response = await axios.post(`${baseUrl}/professions/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getProfession = async (): Promise<any> => {
  const response = await axios.get(`${baseUrl}/professional-summary/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createEducation = async (
  data: EducationFormData
): Promise<any> => {
  const response = await axios.post(`${baseUrl}/education/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log('education', response.data);
  return response.data;
};

export const getEducation = async (): Promise<any> => {
  const response = await axios.get(`${baseUrl}/education/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteEducation = async (id: string): Promise<any> => {
  const response = await axios.delete(`${baseUrl}/education/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// export const createFilmography = async (data: FilmographyFormData & { _id?: string }): Promise<any> => {
export const createFilmography = async (
  data: FilmographyFormData
): Promise<any> => {
  const response = await axios.post(`${baseUrl}/filmography/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getFilmography = async (): Promise<any> => {
  const response = await axios.get(`${baseUrl}/filmography/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteFilmography = async (id: string): Promise<any> => {
  const response = await axios.delete(`${baseUrl}/filmography/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteAwards = async (id: string): Promise<any> => {
  const response = await axios.delete(`${baseUrl}/award/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createSkill = async (data: SkillFormData): Promise<any> => {
  const response = await axios.post(`${baseUrl}/skill/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log('skill', response.data);
  return response.data;
};

export const getSkill = async (): Promise<any> => {
  const response = await axios.get(`${baseUrl}/skill/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createAward = async (data: AwardFormData): Promise<any> => {
  // export const createAward = async (data: AwardFormData & { _id?: string }): Promise<any> => {
  const response = await axios.post(`${baseUrl}/award/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log('awards', response.data);
  return response.data;
};

export const getAwards = async (): Promise<any> => {
  const response = await axios.get(`${baseUrl}/award/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const userDashboard = async (): Promise<any> => {
  const response = await axios.get(`${baseUrl}/dashboard/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getDashboard = async (id: string | undefined) => {
  try {
    const response = await axios.get(`${baseUrl}/dashboard/${id}`);
    //   console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch dashboard data'
    );
  }
};
export const allDashboard = async () => {
  try {
    const response = await axios.get(`${baseUrl}/users-profiles/`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch dashboard data'
    );
  }
};

export const createUserImage = async (formData: FormData): Promise<any> => {
  const response = await axios.post(`${baseUrl}/upload/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('uploads', response.data);
  return response.data;
};

// In usersService.ts
export const verify = async (token: string) => {
  const response = await axios.get(`${baseUrl}/api/users/verify/${token}`);
  return response.data;
};

export const resendVerification = async (data: { email: string }) => {
  const response = await axios.post(`${baseUrl}/api/users/resend`, data);
  return response.data;
};
