import { Router } from "express";
import {
  getAllTeachers,
  getSpecificTeacher,
  postTeacher
} from "../controllers/teachers";

const teachersRouter = new Router();

teachersRouter.get("/:id", getSpecificTeacher);
teachersRouter.get("/", getAllTeachers);
teachersRouter.post("/", postTeacher);

export default teachersRouter;
