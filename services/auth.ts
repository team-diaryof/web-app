import axios from "axios";

const BASE_URL = "https://diaryof-backend.onrender.com";

export const authServices = {
  login: async (
    email: string,
    password: string
  ): Promise<{ success: boolean; token?: string; user?: User }> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
      return { success: true, token, user };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  },

  register: async (
    email: string,
    password: string,
    name?: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/register`, {
        email,
        password,
        name,
      });
      return { success: true, message: response.data.message };
    } catch (err: unknown) {
      console.log(err);
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || "Registration failed"
        : "Registration failed";
      return {
        success: false,
        message,
      };
    }
  },

  verifyOTP: async (
    email: string,
    otp: string
  ): Promise<{ success: boolean; token?: string; user?: User; message?: string }> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/verify-otp`, {
        email,
        otp,
      });
      const { token, user } = response.data;
      return { success: true, token, user };
    } catch (err: unknown) {
      console.log(err);
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || "OTP verification failed"
        : "OTP verification failed";
      return {
        success: false,
        message,
      };
    }
  },

  resendOTP: async (
    email: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/resend-otp`, {
        email,
      });
      return { success: true, message: response.data.message };
    } catch (err: unknown) {
      console.log(err);
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || "Failed to resend OTP"
        : "Failed to resend OTP";
      return {
        success: false,
        message,
      };
    }
  },
};
