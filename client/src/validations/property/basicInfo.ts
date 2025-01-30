import Joi from "joi";

export const basicInfoValidationSchema = Joi.object({
  propertyName: Joi.string().min(3).max(50).required().messages({
    "string.base": "Property Name should be a type of text",
    "string.empty": "Property Name cannot be empty",
    "string.min": "Property Name should have at least 3 characters",
    "string.max": "Property Name should have at most 50 characters",
    "any.required": "Property Name is required",
  }),
  buildYear: Joi.string()
    .pattern(/^(19|20)\d{2}$/)
    .required()
    .messages({
      "string.base": "Build Year should be a type of text",
      "string.empty": "Build Year cannot be empty",
      "string.pattern.base": "Build Year must be a valid four-digit year",
      "any.required": "Build Year is required",
    }),
  liveAtProperty: Joi.boolean().required().messages({
    "boolean.base": "Live at Property should be a boolean value",
    "any.required": "Live at Property is required",
  }),
  contactEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required",
    }),
  contactMobile: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .required()
    .messages({
      "string.base": "Mobile number should be a type of text",
      "string.empty": "Mobile number cannot be empty",
      "string.pattern.base":
        "Mobile number must be a valid phone number with country code",
      "any.required": "Mobile number is required",
    }),
  contactLandline: Joi.string()
    .pattern(/^\d{5}-\d{6}$/)
    .allow("")
    .messages({
      "string.base": "Landline should be a type of text",
      "string.pattern.base": "Landline must be in the format: 01234-456789",
    }),
});
