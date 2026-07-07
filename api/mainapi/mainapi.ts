import api from "@/api/apiInterceptor";
import { StorageService } from "@/api/storageService";
import { useQuery } from "@tanstack/react-query";
import {
  AjoFundListResponse,
  AuthMeResponse,
  AuthUser,
  ChatMessagePayload,
  ChatMessageResponse,
  CreateFundPayload,
  CreateFundResponse,
  JoinAjoPayload,
  JoinAjoResponse,
  LeaderboardResponse,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
  TransactionHistoryResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
  WalletSetupPayload,
  WalletSetupResponse,
} from "../type";

export interface DisplayAccount {
  initials: string;
  greeting: string;
  name: string;
  email: string;
  balance: number;
  accountNumber: string;
  bankName: string;
  accountName: string;
  tier: string;
  points: number;
  hasWallet: boolean;
}

export const currentUserQueryKey = ["auth", "me"] as const;

const DEFAULT_ACCOUNT: DisplayAccount = {
  initials: "NX",
  greeting: "Welcome back",
  name: "Naira X User",
  email: "",
  balance: 0,
  accountNumber: "0000000000",
  bankName: "Naira X",
  accountName: "Naira X User",
  tier: "Starter",
  points: 0,
  hasWallet: false,
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || DEFAULT_ACCOUNT.initials;

export const buildDisplayAccount = (
  user: AuthUser | null | undefined,
): DisplayAccount => {
  if (!user) return DEFAULT_ACCOUNT;

  const fullName =
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
    user.account?.accountName ||
    DEFAULT_ACCOUNT.name;
  const accountName = user.account?.accountName || fullName;

  return {
    initials: getInitials(fullName),
    greeting: getGreeting(),
    name: fullName,
    email: user.email ?? "",
    balance: Number(user.account?.availableBalance ?? 0),
    accountNumber: user.account?.accountNumber ?? DEFAULT_ACCOUNT.accountNumber,
    bankName: user.account?.bankName ?? DEFAULT_ACCOUNT.bankName,
    accountName,
    tier: user.tier ?? DEFAULT_ACCOUNT.tier,
    points: Number(user.xPoints ?? 0),
    hasWallet: Boolean(user.account?.accountNumber),
  };
};

export const registerUser = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>("/auth/register", payload);
  return response.data;
};

export const saveAuthSession = async (response: VerifyEmailResponse) => {
  const user = response.data?.user;
  const accessToken = response.data?.accessToken;
  const refreshToken = response.data?.refreshToken;

  if (accessToken) {
    await StorageService.setItem("accessToken", accessToken);
  }

  if (refreshToken) {
    await StorageService.setItem("refreshToken", refreshToken);
  }

  if (user) {
    await StorageService.setItem("userdata", user);
  }
};

export const verifyEmail = async (
  payload: VerifyEmailPayload,
): Promise<VerifyEmailResponse> => {
  const response = await api.post<VerifyEmailResponse>(
    "/auth/verify-email",
    payload,
  );

  if (response.data?.success) {
    await saveAuthSession(response.data);
  }

  return response.data;
};

export const loginUser = async (
  payload: LoginPayload,
): Promise<VerifyEmailResponse> => {
  const response = await api.post<VerifyEmailResponse>("/auth/login", payload);

  if (response.data?.success) {
    await saveAuthSession(response.data);
  }

  return response.data;
};

export const getCurrentUser = async (): Promise<AuthMeResponse> => {
  const response = await api.get<AuthMeResponse>("/auth/me");
  return response.data;
};

export const useCurrentUser = () =>
  useQuery({
    queryKey: currentUserQueryKey,
    queryFn: async () => {
      const accessToken = await StorageService.getItem("accessToken");
      if (!accessToken) return null;

      try {
        const response = await getCurrentUser();
        const user = response.data?.user ?? null;

        if (user) {
          await StorageService.setItem("userdata", user);
        }

        return user;
      } catch (error) {
        const cachedUser = await StorageService.getItem("userdata");
        if (cachedUser) return cachedUser as AuthUser;
        throw error;
      }
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

export const useCurrentAccount = () => {
  const query = useCurrentUser();

  return {
    ...query,
    account: buildDisplayAccount(query.data),
  };
};

export const createFund = async (
  payload: CreateFundPayload,
): Promise<CreateFundResponse> => {
  const response = await api.post<CreateFundResponse>(
    "/ajo/create-fund",
    payload,
  );
  return response.data;
};

export const joinAjoFund = async (
  payload: JoinAjoPayload,
): Promise<JoinAjoResponse> => {
  const response = await api.post<JoinAjoResponse>("/ajo/join", payload);
  return response.data;
};

export const getPublicAjoFunds = async (): Promise<AjoFundListResponse> => {
  const response = await api.get<AjoFundListResponse>("/ajo");
  return response.data;
};

export const getMyAjoFunds = async (): Promise<AjoFundListResponse> => {
  const response = await api.get<AjoFundListResponse>("/ajo/mine");
  return response.data;
};

export const sendChatMessage = async (
  payload: ChatMessagePayload,
): Promise<ChatMessageResponse> => {
  const response = await api.post<ChatMessageResponse>("/ai/chat", payload);
  return response.data;
};

export const setupWallet = async (
  payload: WalletSetupPayload,
): Promise<WalletSetupResponse> => {
  const response = await api.post<WalletSetupResponse>(
    "/wallet/setup",
    payload,
  );
  return response.data;
};

export const getTransactionHistory =
  async (): Promise<TransactionHistoryResponse> => {
    const response = await api.get<TransactionHistoryResponse>("/history");
    return response.data;
  };

export const getLeaderboard = async (): Promise<LeaderboardResponse> => {
  const response = await api.get<LeaderboardResponse>("/auth/leaderboard");
  return response.data;
};
