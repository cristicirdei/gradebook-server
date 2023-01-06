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

const UserModule = require("../models/user");
const User = UserModule.User;

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
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.BAD_REQUEST,
        NO_INPUT_PROVIDED.TYPE,
        NO_INPUT_PROVIDED.DETAILS
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

    const user = await User.findOne({ email });
    if (!user)
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.NOT_FOUND,
        NO_USER_FOUND.TYPE,
        NO_USER_FOUND.DETAILS
      );
    const isMatch = await comparePassword(password, user.password);
    console.log;
    if (!isMatch)
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        ERROR_CODES.UNAUTHORIZED,
        INCORRECT_PASSWORD.TYPE,
        INCORRECT_PASSWORD.DETAILS
      );
  } catch (err) {
    next(err);
  }
  next();
};
