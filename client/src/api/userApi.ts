import axios from "axios";

export const SignUpUser = async (
  name: string,
  email: string,
  country: string,
  password: string,
  confirmPassword: string
) => {
  try {
    console.log("starttttttttttttttttttttt--------------")
    console.log(import.meta.env.VITE_BASE_URL, "base------")
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
    console.log("user api------------------------", name, email, password, country, confirmPassword)
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const VerifyEmail = async (token: string | null) => {
  try {
    console.log("start verify email------------------------------------------------");
    console.log(import.meta.env.VITE_BASE_URL, "base------")
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user-service/api/users/verify-email?token=${token}`);
    console.log(response, "response verify----------------------------------------------------")
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
