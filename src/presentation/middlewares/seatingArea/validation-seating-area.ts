import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import { Console } from "console";

// Define the input interface for Room
interface SeatingAreaInput {
  abbreviation: string;
  seatingAreaName: string;
  listOrder: number;
}

const seatingAreaValidator = function (
  input: SeatingAreaInput
): SeatingAreaInput {
  const seatingAreaSchema = Joi.object<SeatingAreaInput>({
    abbreviation: Joi.string().required().max(30).trim().uppercase().messages({
      "string.base": "Abbreviation must be a string",
      "string.empty": "Abbreviation is required",
      "string.max": "Abbreviation should be under 30 characters",
      "string.trim":
        "Abbreviation should not contain leading or trailing spaces",
      "any.required": "Abbreviation is required",
    }),
    seatingAreaName: Joi.string().required().max(30).trim().messages({
      "string.base": "Seating Area name must be a string",
      "string.empty": "Seating Area name is required",
      "string.max": "Seating Area name should be under 30 characters",
      "string.trim":
        "Seating Area name should not contain leading or trailing spaces",
      "any.required": "Seating Area name is required",
    }),
    listOrder: Joi.number().required().messages({
      "number.base": "List order must be a number",
      "number.empty": "List order is required",
      "any.required": "List order is required",
    }),
  });

  const { error, value } = seatingAreaSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const validationErrors: string[] = error.details.map(
      (err: ValidationErrorItem) => err.message
    );

    throw new ApiError(
      ApiError.badRequest().status,
      validationErrors.join(", "),
      "ValidationError"
    );
  }

  return value;
};

export const validateSeatingAreaInputMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req; 

    // Validate the room input using the roomValidator
    const validatedInput: SeatingAreaInput = seatingAreaValidator(body);

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.status).json(error.message);
    }
     console.log("eror in catch",error);
     
    // Respond with the custom error
    const err = ApiError.badRequest();
    return res.status(err.status).json(err.message);
  }
};

export default validateSeatingAreaInputMiddleware;
