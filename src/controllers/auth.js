import { hashPassword } from "../util/hashPassword";
import tokenGenerator from "../util/tokenGenerator";

export const postUserSignup = async (req, res, next) => {
  const body = req.body;

  const password = await hashPassword(body.password);

  //add user

  return res.status(200).send({ body, hashed: password });
};

export const postUserLogin = async (req, res, next) => {
  const body = req.body;

  const user = {
    institution: 7,
    type1: "admin",
    type: "teacher",
    name1: "Antonia Kulas",
    name: "Samantha Schinner",
    id: 2
  };

  const payload = {
    id: user.id,
    email: body.email
  };

  const token = tokenGenerator(payload);

  console.log("token ", token);

  return res.status(200).send({ token });
};
