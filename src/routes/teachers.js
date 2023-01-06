import { Router } from "express";
import {
  getTeacherByID,
  postTeacher,
  getTeachersByInstitutionID
} from "../controllers/teacher.controller";

const teachersRouter = new Router();

teachersRouter.get("/:id", getTeacherByID);
teachersRouter.get("/institution/:id", getTeachersByInstitutionID);
teachersRouter.post("/", postTeacher);

export default teachersRouter;
