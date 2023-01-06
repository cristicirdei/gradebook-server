import { Router } from "express";
import {
  getClassByID,
  getClassesByInstitutionID,
  getClassesByTeacherID,
  postClass
} from "../controllers/classes.controller";

const classesRouter = new Router();

// get one class
classesRouter.get("/:id", getClassByID);
// get all classes by institutionID
classesRouter.get("/institution/:id", getClassesByInstitutionID);
// get all classes by teacherID
classesRouter.get("/teacher/:id", getClassesByTeacherID);
// post a class in an institution
classesRouter.post("/", postClass);

export default classesRouter;
