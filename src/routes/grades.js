import { Router } from "express";
import {
  getClassGrades,
  getStudentGrades,
  postNewGrade,
  postModifiedGrade
} from "../controllers/grades";

const gradesRouter = new Router();

gradesRouter.get("/class/:class", getClassGrades);
gradesRouter.get("/student/:student", getStudentGrades);
gradesRouter.post("/change", postModifiedGrade);
gradesRouter.post("/new", postNewGrade);

export default gradesRouter;
