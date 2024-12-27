import axios from "axios";

export const SignUpUser = async (
  name: string,
  email: string,
  country: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user-service/api/users/register`,
      {
        name,
        email,
        country,
        password,
        confirmPassword
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const VerifyEmail = async (token: string | null) => {
  try {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user-service/api/users/verify-email?token=${token}`);

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
