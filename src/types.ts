export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface PasswordRequirementsProps {
  password: string;
  requirement: string;
}

export interface UpdatePasswordData {
  email: string;
  currentPassword: string;
  newPassword: string;
}

export interface Service {
  id: number;
  title: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  number?: string;
  profilePicture?: string;
  premium?: boolean;
  premiumExpiresAt?: string;
}

export type ProfileFormData = {
  firstName?: string;
  lastName?: string;
  role?: string;
  phone?: string;
  email?: string;
  dob?: string;
  sex?: string;
  stateOfOrigin?: string;
  location?: string;
  country?: string;
  languages: string[];
  otherLanguage?: string;
  height?: string;
  complexion?: string;
};

export interface BioFormData {
  firstName?: string;
  lastName?: string;
  role?: string;
  sex?: string;
  dob?: string;
  location?: string;
}

export type SocialsFormData = {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
};

export type RoleOption = {
  label: string;
  value: string;
  isHeader?: boolean;
  isGroup?: boolean;
  group?: string;
}

// export type RoleOption = {
//   label: string;
//   value: string;
//   isHeader?: boolean;
// };

export type ProfessionalSummaryFormData = {
  summary?: string;
};

// export type EducationFormData = {
//   education?: string;
// };

export interface EducationFormData {
  _id?: string;
  institution?: string;
  department?: string;
  degree?: string;
  yearGraduated?: string;
}

export type FilmographyFormData = {
  _id?: string;
  title?: string;
  year?: string;
  genre?: string;
  productionCompany?: string;
  role?: string;
  castName?: string;
  location?: string;
  link?: string;
};

export type SkillFormData = {
  skills?: string;
};

export type AwardFormData = {
  _id?: string;
  title: string;
  type: string;
  year: string;
  link?: string;
};

export type NewUser = Omit<User, 'id'>;
