import validator from "validator";
import { userExists } from "../database/databaseOperations";
import {
  ERROR_CODES,
  USER_ALREADY_EXISTS,
  WRONG_EMAIL_FORMAT,
  NO_INPUT_PROVIDED,
  NOT_MATCHING,
  PASSWORD_WRONG_FORMAT
} from "../util/errors";
import ProblemError from "../util/ProblemError";
import { MESSAGE_TYPES } from "../util/constants";

export default async (req, res, next) => {
  try {
    const { email, confirmPassword } = req.body;
    let { password } = req.body;

    /* validates user input */
    if (
      validator.isEmpty(password + "") ||
      !password ||
      validator.isEmpty(email) ||
      email === undefined ||
      password === undefined ||
      confirmPassword === undefined
    ) {
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        NO_INPUT_PROVIDED.TYPE,
        NO_INPUT_PROVIDED.DETAILS
      );
    }

    if (password !== confirmPassword) {
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        NOT_MATCHING.TYPE,
        NOT_MATCHING.DETAILS
      );
    }
    if (!validator.isEmail(email)) {
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        WRONG_EMAIL_FORMAT.TYPE,
        WRONG_EMAIL_FORMAT.DETAILS
      );
    }

    //check if a user with the same email already exists
    const user = await userExists(email);
    if (user) {
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        USER_ALREADY_EXISTS.TYPE,
        USER_ALREADY_EXISTS.DETAILS
      );
    }
  } catch (err) {
    next(err);
  }

  next();
};
