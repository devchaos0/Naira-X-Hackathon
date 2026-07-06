import api from "@/api/apiInterceptor";
import { StorageService } from "@/api/storageService";
import {
  AjoFundListResponse,
  ChatMessagePayload,
  ChatMessageResponse,
  CreateFundPayload,
  CreateFundResponse,
  JoinAjoPayload,
  JoinAjoResponse,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
  WalletSetupPayload,
  WalletSetupResponse,
} from "../type";

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
