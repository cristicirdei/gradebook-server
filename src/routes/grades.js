import { Router } from "express";
import { getClassGrades, getStudentGrades } from "../controllers/grades";

const gradesRouter = new Router();

gradesRouter.get("/class/:class", getClassGrades);
gradesRouter.get("/student/:student", getStudentGrades);

export default gradesRouter;
