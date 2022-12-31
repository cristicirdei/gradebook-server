import { Router } from "express";
import {
  getAllTeachers,
  getSpecificTeacher,
  postTeacher
} from "../controllers/teachers";

const teachersRouter = new Router();

teachersRouter.get("/:id", getSpecificTeacher);
teachersRouter.get("/all/:institution", getAllTeachers);
teachersRouter.post("/:institution", postTeacher);

export default teachersRouter;
