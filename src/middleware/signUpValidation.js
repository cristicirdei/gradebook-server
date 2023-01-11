import validator from "validator";

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
    const { email, confirmPassword, password } = req.body;

    /* validates user input */
    if (
      validator.isEmpty(password + "") ||
      !password ||
      validator.isEmpty(email) ||
      email === undefined ||
      password === undefined ||
      confirmPassword === undefined
    ) {
      console.log("validation 1");
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        NO_INPUT_PROVIDED.TYPE,
        NO_INPUT_PROVIDED.DETAILS
      );
    }

    if (password !== confirmPassword) {
      console.log("validation 2");
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        NOT_MATCHING.TYPE,
        NOT_MATCHING.DETAILS
      );
    }
    if (!validator.isEmail(email)) {
      console.log("validation 3");
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        WRONG_EMAIL_FORMAT.TYPE,
        WRONG_EMAIL_FORMAT.DETAILS
      );
    }

    //check if a user with the same email already exists
    const user = null;
    if (user) {
      console.log("validation 4");
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
