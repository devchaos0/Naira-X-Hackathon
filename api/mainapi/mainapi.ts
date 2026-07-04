import api from "@/api/apiInterceptor";
import { StorageService } from "@/api/storageService";
import {
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
  VerifyEmailPayload,
  VerifyEmailResponse,
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
