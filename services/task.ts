// services/tasks.ts
import { useAuthStore } from "@/store";
import axios from "axios";

// 1. Define Types based on your Backend Controllers
export interface Task {
  id: string;
  userId: string;
  dayId?: string;
  dayDate?: string | Date;
  title?: string;
  description?: string;
  timestamp?: string | Date;
  audioUrl?: string;
  transcription?: string;
  category?: string;
  sentiment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  dayId?: string;
  dayDate?: string | Date;
  title?: string;
  description?: string;
  timestamp?: string | Date;
  audioUrl?: string;
  transcription?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  timestamp?: string | Date;
  category?: string;
  audioUrl?: string;
  transcription?: string;
  sentiment?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

const api = axios.create({
  baseURL: "https://diaryof-backend.onrender.com/api/v1",
  timeout: 10000,
});

// ✅ CORRECT INTERCEPTOR FOR ZUSTAND
api.interceptors.request.use((config) => {
  // Access the token directly from your store's state
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// 3. Error Helper (Same as auth.ts)
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

// 4. Task Services
export const taskServices = {
  // GET /tasks
  getAll: async (
    params: { dayId?: string; page?: number; perPage?: number } = {}
  ): Promise<ApiResponse<Task[]>> => {
    try {
      const response = await api.get("/tasks", { params });
      return {
        success: true,
        // The backend returns { tasks: [] }, so we access data.tasks
        data: response.data.tasks,
      };
    } catch (err) {
      return { success: false, message: getErrorMessage(err) };
    }
  },

  // POST /tasks
  create: async (
    payload: CreateTaskInput
  ): Promise<ApiResponse<Task>> => {
    try {
      const response = await api.post("/tasks", payload);
      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      return { success: false, message: getErrorMessage(err) };
    }
  },

  // PUT /tasks/:id
  update: async (
    id: string,
    payload: UpdateTaskInput
  ): Promise<ApiResponse<Task>> => {
    try {
      const response = await api.put(`/tasks/${id}`, payload);
      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      return { success: false, message: getErrorMessage(err) };
    }
  },

  // DELETE /tasks/:id
  delete: async (id: string): Promise<ApiResponse<null>> => {
    try {
      await api.delete(`/tasks/${id}`);
      return {
        success: true,
        message: "Task deleted successfully",
      };
    } catch (err) {
      return { success: false, message: getErrorMessage(err) };
    }
  },
};