import axios from "axios";

export const authServices = {
  login: async (
    email: string,
    password: string
  ): Promise<{ success: boolean; token?: string; user?: User }> => {
    try {
      const response = await axios.post(
        "https://diaryof-backend.onrender.com/auth/login",
        {
          email,
          password,
        }
      );
      const { token, user } = response.data;
      return { success: true, token, user };
    } catch (err) {
      console.log(err);
      return { success: false  };

    }
  },
};
