const ERROR_TYPES = {
  SWAGGER_ERROR: "swagger-error",
  NOT_FOUND: "not-found",
  INCORRECT_DATA: "incorrect-data"
};

export const ERROR_CODES = {
  INTERNAL_SERVER_ERROR: 500,
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401
};

export const SWAGGER_ERROR = {
  TYPE: ERROR_TYPES.SWAGGER_ERROR,
  DETAILS: "Swagger validation failed"
};

export const NO_USER_FOUND = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No user was found"
};

export const NO_INPUT_PROVIDED = {
  TYPE: ERROR_TYPES.NOT_FOUND,
  DETAILS: "No input was provided"
};

export const INCORRECT_ID = {
  TYPE: ERROR_TYPES.INCORRECT_DATA,
  DETAILS: "The id provided is incorrect"
};

export const INCORRECT_PASSWORD = {
  TYPE: ERROR_TYPES.INCORRECT_DATA,
  DETAILS: "The password provided is incorrect"
};

export const NOT_MATCHING = {
  TYPE: ERROR_TYPES.INCORRECT_DATA,
  DETAILS: "The passwords do not match"
};

export const WRONG_EMAIL_FORMAT = {
  TYPE: ERROR_TYPES.INCORRECT_DATA,
  DETAILS: "The email format is incorrect"
};

export const USER_ALREADY_EXISTS = {
  TYPE: ERROR_TYPES.INCORRECT_DATA,
  DETAILS: "The user already exists"
};
