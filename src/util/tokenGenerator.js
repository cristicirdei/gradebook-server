import jwt from "jsonwebtoken";
import { TOKEN_EXPIRES_IN } from "../util/constants";

require("dotenv").config();

function tokenGenerator(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN
  });
}

export default tokenGenerator;
