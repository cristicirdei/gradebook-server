import jwt from "jsonwebtoken";
import { ERROR_CODES } from "../util/errors";

//middleware to check if the user is logged in
export default (req, res, next) => {
  let status;
  let type = "error";
  let short = "error";
  let detail;
  const placement = "global";

  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        detail = "Session Expired, Please sign-in again.";
        status = ERROR_CODES.FORBIDDEN;
        return res.status(status).json({
          status,
          type,
          short,
          detail,
          placement
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    detail = "No token provided";
    status = ERROR_CODES.UNAUTHORIZED;
    return res.status(status).json({
      status,
      type,
      short,
      detail,
      placement
    });
  }
};
