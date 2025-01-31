import Joi from "joi";

export const locationDetailsValidationSchema = Joi.object({
    houseName: Joi.string().min(3).max(50).required().messages({
        "string.base": "House Name should be a type of text",
        "string.empty": "House Name cannot be empty",
        "string.min": "House Name should be at least 3 characters long",
        "string.max": "House Name should have at most 50 characters",
        "any.required": "House Name is required",
    }),
    
    locality: Joi.string().min(3).max(50).required().messages({
        "string.base": "Locality should be a type of text",
        "string.empty": "Locality cannot be empty",
        "string.min": "Locality should be at least 3 characters long",
        "string.max": "Locality should have at most 50 characters",
        "any.required": "Locality is required",
    }),
    
    pincode: Joi.string().pattern(/^\d{5,10}$/).required().messages({
        "string.base": "Pincode should be a type of text",
        "string.empty": "Pincode cannot be empty",
        "string.pattern.base": "Pincode should be a valid number between 5 and 10 digits",
        "any.required": "Pincode is required",
    }),
    
    country: Joi.string().min(3).max(50).required().messages({
        "string.base": "Country should be a type of text",
        "string.empty": "Country cannot be empty",
        "string.min": "Country should be at least 3 characters long",
        "string.max": "Country should have at most 50 characters",
        "any.required": "Country is required",
    }),

    state: Joi.string().min(3).max(50).required().messages({
        "string.base": "State should be a type of text",
        "string.empty": "State cannot be empty",
        "string.min": "State should be at least 3 characters long",
        "string.max": "State should have at most 50 characters",
        "any.required": "State is required",
    }),

    city: Joi.string().min(3).max(50).required().messages({
        "string.base": "City should be a type of text",
        "string.empty": "City cannot be empty",
        "string.min": "City should be at least 3 characters long",
        "string.max": "City should have at most 50 characters",
        "any.required": "City is required",
    }),
});
