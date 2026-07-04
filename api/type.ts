export interface CrowdFundItem {
  id: string;
  name: string;
  details: string;
  duration: string;
  targetAmount: number;
  raisedAmount: number;
  code: string;
  createdAt: string;
  creatorId: string;
}

export interface CreateCrowdFundForm {
  name: string;
  details: string;
  duration: string;
  amount: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  data?: {
    user?: {
      id?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      isVerified?: boolean;
      createdAt?: string;
    };
    message?: string;
  };
  message?: string;
  code?: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isVerified?: boolean;
  lastLoginAt?: string;
  createdAt?: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  data?: {
    user?: AuthUser;
    accessToken?: string;
    refreshToken?: string;
    message?: string;
  };
  message?: string;
  code?: string;
  errors?: Array<{
    field?: string;
    message?: string;
  }>;
}
