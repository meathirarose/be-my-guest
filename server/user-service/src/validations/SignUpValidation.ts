import Joi from "joi";
import { Role } from "../interfaces/IUserModel";

export const signUpValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.base': 'Name should be a type of text',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name should have at least 3 characters',
        'string.max': 'Name should have at most 50 characters',
        'any.required': 'Name is required'
    }),

    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required'
    }),
    
    country: Joi.string().required().messages({
        'string.empty': 'Country cannot be empty',
        'any.required': 'Country is required'
    }),

    password: Joi.string().min(8)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/-]).+$/)
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password should contain at least 8 characters',
            'string.pattern.base': 'Password must contain at least one letter, one number, and one special character',
            'any.required': 'Password is required'
        }),
    
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.base': 'Confirm password must be a string',
        'string.empty': 'Confirm password cannot be empty',
        'any.required': 'Confirm password is required',
        'any.only': 'Confirm password must match the password'
    }),

    role: Joi.string()
        .valid(...Object.values(Role)) 
        .default(Role.CUSTOMER) 
});
