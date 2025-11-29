// services/auth.ts
import { User } from "@/types";
import axios from "axios";

const api = axios.create({
  baseURL: "https://diaryof-backend.onrender.com/api/v1",
  timeout: 10000,
});

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

const getErrorMessage = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    return (
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Something went wrong"
    );
  }
  return "Something went wrong";
};

export const authServices = {
  login: async (
    email: string,
    password: string
  ): Promise<ApiResponse<{ token: string; user: User }>> => {
    try {
      const response = await api.post(`/auth/login`, {
        email,
        password,
      });
      return {
        success: true,
        data: {
          token: response.data.token,
          user: response.data.user,
        },
      };
    } catch (err) {
      return { success: false, message: getErrorMessage(err) };
    }
  },

  register: async (
    email: string,
    password: string,
    name?: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.post(`/auth/register`, {
        email,
        password,
        name,
      });
      return { success: true, message: response.data.message };
    } catch (err: unknown) {
      return {
        success: false,
        message: getErrorMessage(err),
      };
    }
  },

  verifyOTP: async (
    email: string,
    otp: string
  ): Promise<
    ApiResponse<{
      token: string;
      user: User;
    }>
  > => {
    try {
      const response = await api.post(`/auth/verify-otp`, {
        email,
        otp,
      });
      const { token, user } = response.data;
      return { success: true, data: { token, user } };
    } catch (err: unknown) {
      return {
        success: false,
        message: getErrorMessage(err),
      };
    }
  },

  resendOTP: async (
    email: string
  ): Promise<ApiResponse<{ success: boolean; message?: string }>> => {
    try {
      const response = await api.post(`/auth/resend-otp`, {
        email,
      });
      return { success: true, message: response.data.message };
    } catch (err: unknown) {
      return {
        success: false,
        message: getErrorMessage(err),
      };
    }
  },
  forgotPassword: async (email: string) => {
    try {
      // Replace with your actual fetch wrapper
      const response = await api.post(`/auth/forgot-password`, { email });
      return response.data;
    } catch (error) {
      return { success: false, message: "Network error" };
    }
  },

  verifyResetOtp: async (email: string, otp: string) => {
    try {
      const response = await api.post(`/auth/verify-password-reset-otp`, {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      return { success: false, message: "Invalid OTP" };
    }
  },

  resetPassword: async (email: string, newPassword: string) => {
    try {
      const response = await api.post(`/auth/reset-password`, {
        email,
        newPassword,
      });
      return response.data;
    } catch (error) {
      return { success: false, message: "Failed to reset password" };
    }
  },
};
