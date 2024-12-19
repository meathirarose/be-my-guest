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
      `${import.meta.env.BASE_URL}/user-service/api/users/register`,
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
