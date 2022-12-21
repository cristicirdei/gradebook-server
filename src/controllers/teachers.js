import ProblemError from "../util/ProblemError";
import {
  NO_TODO_FOUND,
  NO_MESSAGE_PROVIDED,
  INCORRECT_ID
} from "../util/errors";
import { MESSAGE_TYPES } from "../util/constants";

export const getAllTeachers = async (_req, res, next) => {
  try {
    const teachers = await Todo.find({});
    if (!teachers.length)
      throw new ProblemError(
        MESSAGE_TYPES.ERROR,
        404,
        NO_TODO_FOUND.TYPE,
        NO_TODO_FOUND.DETAILS
      );
    return res.status(200).send(teachers);
  } catch (error) {
    next(error);
  }
};

export const getSpecificTeacher = async (_req, res, next) => {};

export const postTeacher = async (_req, res, next) => {};
