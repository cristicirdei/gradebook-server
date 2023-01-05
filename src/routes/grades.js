import { Router } from "express";
import {
  getClassGrades,
  getStudentGrades,
  postNewGrade,
  postModifiedGrade
} from "../controllers/grades";
import verifyUser from "../middleware/auth";

const gradesRouter = new Router();

gradesRouter.use(verifyUser);
gradesRouter.get("/class/:class", getClassGrades);
gradesRouter.get("/student/:student", getStudentGrades);
gradesRouter.post("/change", postModifiedGrade);
gradesRouter.post("/new", postNewGrade);

export default gradesRouter;
