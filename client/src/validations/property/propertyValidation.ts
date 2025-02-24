import Joi from "joi";

export const propertyValidationSchema = Joi.object({
  id: Joi.string().allow("").optional(), 
  isBlocked: Joi.boolean().required(),

  basicInfo: Joi.object({
    propertyName: Joi.string().min(3).max(100).required().messages({
      "string.min": "Property name must be at least 3 characters long",
      "string.max": "Property name cannot be longer than 100 characters",
      "string.empty": "Property name is required",
      "any.required": "Property name is required",
    }),
    propertyDescription: Joi.string().min(3).max(250).required().messages({
      "string.min": "Property description must be at least 3 characters long",
      "string.max": "Property description cannot be longer than 250 characters",
      "string.empty": "Property description is required",
      "any.required": "Property description  is required",
    }),
    buildYear: Joi.number()
      .integer()
      .min(1800)
      .max(new Date().getFullYear())
      .required()
      .messages({
        "number.base": "Build year is required and must be a valid number",
        "number.min": "Build year must be after 1800",
        "number.max": `Build year cannot be in the future (max is ${new Date().getFullYear()})`,
        "any.required": "Build year is required",
      }),
    liveAtProperty: Joi.boolean()
      .required()
      .messages({ "any.required": "Live at property status is required" }),
    contactEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Invalid email address",
        "string.empty": "Contact email cannot be empty",
        "any.required": "Contact email is required",
      }),
    contactMobile: Joi.string()
      .pattern(/^\d{10}$/)
      .required()
      .messages({
        "string.pattern.base": "Mobile number must be 10 digits",
        "string.empty": "Contact mobile is required",
        "any.required": "Contact mobile number is required",
      }),
    contactLandline: Joi.string()
      .pattern(/^\d{1,8}-\d{1,8}$/)
      .allow("")
      .optional()
      .messages({
        "string.pattern.base":
          'Value must be in the format "XXXXXXXX-XXXXXXXX" (each part up to 8 digits)',
      }),
  }).required(),

  location: Joi.object({
    houseName: Joi.string().min(3).max(100).required().messages({
      "string.min": "House name must be at least 3 characters long",
      "string.max": "House name cannot be longer than 100 characters",
      "string.empty": "House name is required",
      "any.required": "House name is required",
    }),
    locality: Joi.string().min(3).max(100).required().messages({
      "string.min": "Locality must be at least 3 characters long",
      "string.max": "Locality cannot be longer than 100 characters",
      "string.empty": "Locality is required",
      "any.required": "Locality is required",
    }),
    pincode: Joi.string()
      .pattern(/^\d{5,10}$/)
      .required()
      .messages({
        "string.pattern.base": "Pincode must be 5 to 10 digits",
        "string.empty": "Pincode is required",
        "any.required": "Pincode is required",
      }),
    country: Joi.string().min(2).max(50).required().messages({
      "string.min": "Country name must be at least 2 characters long",
      "string.max": "Country name cannot be longer than 50 characters",
      "string.empty": "Country is required",
      "any.required": "Country is required",
    }),
    state: Joi.string().min(2).max(50).required().messages({
      "string.min": "State name must be at least 2 characters long",
      "string.max": "State name cannot be longer than 50 characters",
      "string.empty": "State is required",
      "any.required": "State is required",
    }),
    district: Joi.string().min(2).max(50).required().messages({
      "string.min": "District name must be at least 2 characters long",
      "string.max": "District name cannot be longer than 50 characters",
      "string.empty": "District is required",
      "any.required": "District is required",
    }),
    city: Joi.string().min(2).max(50).required().messages({
      "string.min": "City name must be at least 2 characters long",
      "string.max": "City name cannot be longer than 50 characters",
      "string.empty": "City is required",
      "any.required": "City is required",
    }),
  }).required(),

  roomsAndSpaces: Joi.object({
    bedrooms: Joi.number().integer().min(0).required().messages({
      "number.min": "Bedrooms cannot be negative",
      "any.required": "Number of bedrooms is required",
    }),
    bathrooms: Joi.number().integer().min(0).required().messages({
      "number.min": "Bathrooms cannot be negative",
      "any.required": "Number of bathrooms is required",
    }),
    livingRoom: Joi.number().integer().min(0).required().messages({
      "number.min": "Living rooms cannot be negative",
      "any.required": "Number of living rooms is required",
    }),
    lobbyLounge: Joi.number().integer().min(0).required().messages({
      "number.min": "Lobby lounges cannot be negative",
      "any.required": "Number of lobby lounges is required",
    }),
    helpersRoom: Joi.number().integer().min(0).required().messages({
      "number.min": "Helpers room cannot be negative",
      "any.required": "Helpers room is required",
    }),
    swimmingPool: Joi.number().integer().min(0).required().messages({
      "number.min": "Swimming pool cannot be negative",
      "any.required": "Swimming pool is required",
    }),
    parking: Joi.number().integer().min(0).required().messages({
      "number.min": "Parking spaces cannot be negative",
      "any.required": "Parking spaces are required",
    }),
    driversRoom: Joi.number().integer().min(0).required().messages({
      "number.min": "Drivers room cannot be negative",
      "any.required": "Drivers room is required",
    }),
    terrace: Joi.number().integer().min(0).required().messages({
      "number.min": "Terrace cannot be negative",
      "any.required": "Terrace is required",
    }),
    garden: Joi.number().integer().min(0).required().messages({
      "number.min": "Garden cannot be negative",
      "any.required": "Garden is required",
    }),
    diningArea: Joi.number().integer().min(0).required().messages({
      "number.min": "Dining area cannot be negative",
      "any.required": "Dining area is required",
    }),
    kitchenAvailable: Joi.boolean().required()
      .messages({ "any.required": "Kitchen availability is required" }),
    guestCapacity: Joi.number().integer().min(1).required().messages({
      "number.min": "Guest capacity cannot be negative",
      "any.required": "Guest capacity is required",
    }),
  }).required(),

  mediaUrls: Joi.array()
    .items(
      Joi.string().uri().messages({
        "string.uri": "Each media URL must be a valid URL",
        "string.empty": "A media URL cannot be empty",
      })
    )
    .min(3)
    .required()
    .messages({
      "array.base": "Media URLs must be provided as a list",
      "array.min": "At least three media file is required",
      "any.required": "Media URLs are required",
    }),

  pricing: Joi.object({
    price: Joi.number().min(0).required().messages({
      "number.base": "Price must be a valid number",
      "number.min": "Price cannot be negative",
      "any.required": "Price is required",
    }),
    availability: Joi.string()
      .valid("Available", "Not Available", "Booked")
      .required()
      .messages({
        "any.only":
          "Availability must be one of: Available, Not Available, or Booked",
        "string.empty": "Availability status is required",
        "any.required": "Availability status is required",
      }),
  }).required(),
});