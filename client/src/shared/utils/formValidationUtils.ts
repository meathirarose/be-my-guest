
export const validateEmail = (email: string) => {
    if (!email) {
      return "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }
    return "";
  };
  
  export const validatePassword = (password: string) => {
    if (!password) {
      return "Password is required.";
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(password)) {
      return "Password must contain at least one letter, one number, and one special character.";
    }
    return "";
  };
  
  export const validateName = (name: string) => {
    if (!name.trim()) {
      return "Name is required.";
    }
    return "";
  };
  
  export const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) {
      return "Confirm password is required.";
    } else if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };
  
  export const validateCountry = (country: string) => {
    if (!country.trim()) {
      return "Country is required.";
    }
    return "";
  };
  