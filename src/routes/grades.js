import { Router } from "express";
import { getClassGrades, getStudentGrades, postNewGrade } from "../controllers/grades.controller";

const gradesRouter = new Router();

gradesRouter.get("/class/:id", getClassGrades);
gradesRouter.get("/student/:id", getStudentGrades);
gradesRouter.post("/", postNewGrade);

export default gradesRouter;
