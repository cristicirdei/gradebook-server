import ProblemError from "../util/ProblemError";
import {
  NO_TODO_FOUND,
  NO_MESSAGE_PROVIDED,
  INCORRECT_ID
} from "../util/errors";
import { MESSAGE_TYPES } from "../util/constants";

export const getAllStudents = async (req, res, next) => {
  return res
    .status(200)
    .send("all students from institution " + req.params.institution);
};

export const getSpecificStudent = async (req, res, next) => {
  return res.status(200).send("student at id " + req.params.id);
};

export const postStudent = async (req, res, next) => {
  return res
    .status(200)
    .send("post student at institution " + req.params.institution);
};

export const postStudents = async (req, res, next) => {
  return res
    .status(200)
    .send("post multiple student at class " + req.params.class);
};
