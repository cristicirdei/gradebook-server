import validator from "validator";
import ProblemError from "../util/ProblemError";
import { MESSAGE_TYPES } from "../util/constants";
import { comparePassword } from "../util/hashPassword";
import {
  NO_INPUT_PROVIDED,
  ERROR_CODES,
  NO_USER_FOUND,
  INCORRECT_PASSWORD,
  WRONG_EMAIL_FORMAT
} from "../util/errors";

export default async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      email === undefined ||
      password === undefined ||
      validator.isEmpty("" + password) ||
      password === null ||
      validator.isEmpty(email)
    ) {
      console.log("validation 1");
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        NO_INPUT_PROVIDED.TYPE,
        NO_INPUT_PROVIDED.DETAILS
      );
    }

    if (!validator.isEmail(email)) {
      console.log("validation 2");
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        WRONG_EMAIL_FORMAT.TYPE,
        WRONG_EMAIL_FORMAT.DETAILS
      );
    }

    const user = {
      institution: 7,
      type1: "admin",
      type: "teacher",
      name1: "Antonia Kulas",
      name: "Samantha Schinner",
      id: 2,
      password: "$2a$10$pC23qtOvgaPkStae4MLB/eRvvCUYquSWqDQFTW5XavELWLe6VqLcO",
      email: "cirdeicristi24@gmail.com"
    };

    if (!user) {
      console.log("validation 3");
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.NOT_FOUND,
        NO_USER_FOUND.TYPE,
        NO_USER_FOUND.DETAILS
      );
    }
    const isMatch = await comparePassword(password, user.password);
    console.log;

    if (!isMatch) {
      console.log("validation 4");
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.UNAUTHORIZED,
        INCORRECT_PASSWORD.TYPE,
        INCORRECT_PASSWORD.DETAILS
      );
    }
  } catch (err) {
    next(err);
  }
  next();
};
