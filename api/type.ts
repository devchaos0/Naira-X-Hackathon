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
  isMine?: boolean;
}

export interface CreateCrowdFundForm {
  name: string;
  details: string;
  duration: string;
  amount: string;
}

export interface CreateFundPayload {
  title: string;
  description: string;
  targetAmount: number;
  visibility: "public" | "private";
  deadline: string;
  category: string;
}

export interface AjoFundListItem {
  _id?: string;
  creatorId?: string | null;
  title?: string;
  description?: string;
  targetAmount?: number;
  amountRaised?: number;
  visibility?: string;
  category?: string;
  status?: string;
  deadline?: string;
  inviteCode?: string;
  joinedUsers?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface AjoFundListResponse {
  success: boolean;
  data?: AjoFundListItem[];
  pagination?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  message?: string;
  code?: string;
}

export interface JoinAjoPayload {
  inviteCode: string;
}

export interface WalletSetupPayload {
  accountName: string;
  bvn: string;
  gender: string;
  age: string;
  pin: string;
}

export interface WalletSetupResponse {
  success: boolean;
  message?: string;
  data?: {
    id?: string;
    bank?: string;
    accountNumber?: string;
    accountName?: string;
    currency?: string;
    balance?: number;
    availableBalance?: number;
  };
  code?: string;
  errors?: Array<{
    field?: string;
    message?: string;
  }>;
}

export interface TransactionHistoryItem {
  type?: "credit" | "debit" | string;
  amount?: number;
  createdAt?: string;
}

export interface TransactionHistoryResponse {
  success: boolean;
  message?: string;
  data?: {
    transactions?: TransactionHistoryItem[];
    pagination?: {
      page?: number;
      limit?: number;
      total?: number;
      totalPages?: number;
    };
  };
  code?: string;
  errors?: Array<{
    field?: string;
    message?: string;
  }>;
}

export interface LeaderboardUser {
  firstName?: string;
  lastName?: string;
  xPoints?: number;
  tier?: string;
}

export interface LeaderboardResponse {
  success: boolean;
  message?: string;
  data?: LeaderboardUser[];
  code?: string;
  errors?: Array<{
    field?: string;
    message?: string;
  }>;
}

export interface ChatMessagePayload {
  message: string;
}

export interface ChatMessageResponse {
  success: boolean;
  data?: {
    reply?: string;
  };
  message?: string;
  code?: string;
  errors?: Array<{
    field?: string;
    message?: string;
  }>;
}

export interface JoinedAjoFund {
  _id?: string;
  creatorId?: string;
  title?: string;
  description?: string;
  targetAmount?: number;
  amountRaised?: number;
  visibility?: string;
  category?: string;
  status?: string;
  deadline?: string;
  inviteCode?: string;
  joinedUsers?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CreateFundResponse {
  success: boolean;
  data?: {
    fund?: {
      id?: string;
      title?: string;
      description?: string;
      targetAmount?: number;
      visibility?: string;
      deadline?: string;
      category?: string;
    };
    message?: string;
  };
  message?: string;
  code?: string;
}

export interface JoinAjoResponse {
  success: boolean;
  message?: string;
  data?: JoinedAjoFund;
  code?: string;
  errors?: Array<{
    field?: string;
    message?: string;
  }>;
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
  tier?: string;
  xPoints?: number;
  account?: {
    accountNumber?: string;
    bankName?: string;
    accountName?: string;
    availableBalance?: number;
    currency?: string;
    status?: string;
  };
}

export interface AuthMeResponse {
  success: boolean;
  data?: {
    user?: AuthUser;
  };
  message?: string;
  code?: string;
  errors?: Array<{
    field?: string;
    message?: string;
  }>;
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
