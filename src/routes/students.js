import { Router } from "express";
import {
  getStudents,
  getStudentByID,
  postStudent,
} from "../controllers/student.controller";


const studentsRouter = new Router();

// get one student
studentsRouter.get("/:id", getStudentByID);
// get all students by institutionID
studentsRouter.get("/institution/:id", getStudents);
// post a student 
studentsRouter.post("/", postStudent);


export default studentsRouter;
