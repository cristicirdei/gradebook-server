import { hashPassword } from "../util/hashPassword";
import tokenGenerator from "../util/tokenGenerator";
import { postInstitutionData, getUserData } from "../database/institution.db";

export const postUserSignup = async (req, res, next) => {
  const { name, email, confirmPassword } = req.body;
  const password = await hashPassword(req.body.password);
  const user = {
    name: name,
    email: email,
    password: password
  };

  postInstitutionData(user, function (err, result) {
    console.log(result);
    return res.status(200).send(result);
  });
};

export const postUserLogin = async (req, res, next) => {
  const body = req.body;

  const user = {
    institution: 1,
    type1: "admin",
    type: "teacher",
    name: "Antonia Kulas",
    name2: "Samantha Schinner",
    id: 1
  };

  const payload = {
    id: user.id,
    email: body.email,
    institution: user.institution,
    name: user.name,
    type: user.type
  };

  console.log(req.body);

  getUserData(req.body, function (err, result) {
    console.log(result);
    if (result.data) {
      const token = tokenGenerator(result.data);
      console.log("token ", token);
      return res.status(200).send({ token });
    } else {
      return res.status(404).send(result);
    }
  });
};

// $2a$10$8iayW5MjmgQO0anEZWeZluQp9fOXnvI//42dgMcExvvzwi6PIinwS
// $2a$10$eA79aVUnTvcn1pC1gMHd/ectrxWaLUC5UwD5S6p6WIK.D3psSnoqu
