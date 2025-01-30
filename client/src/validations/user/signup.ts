import Joi from "joi";

export const signUpValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name should have atleast 3 characters',
        'string.max': 'Name should have atmost 50 characters',
        'any.required': 'Name is required'
    }),

  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
  }),
    
    country: Joi.string().required().messages({
        'string.empty': 'Country cannot be empty',
        'any.required': 'Country is required'
    }),
    
  password: Joi.string().min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}:;"'<>,.?/-]).+$/) 
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password should contain 8 characters',
      'string.pattern.base': 'Password must contain at least one letter, one number, and one special character',
      'any.required': 'Password is required'
    }),
    
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.base': 'Confirm password must be a string',
        'string.empty': 'Confirm password cannot be empty',
        'any.required': 'Confirm password is required',
        'string.valid': 'Confirm password must match the password'
    }),

});