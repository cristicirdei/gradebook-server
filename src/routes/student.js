import { Router } from "express";
import {
  getAllStudents,
  getSpecificStudent,
  postStudent,
  postStudents
} from "../controllers/students";
import verifyUser from "../middleware/auth";

const studentsRouter = new Router();

studentsRouter.use(verifyUser);
// get one student
studentsRouter.get("/:id", getSpecificStudent);
// get all students from an institution
studentsRouter.get("/all/:institution", getAllStudents);
// post a student in an institution
studentsRouter.post("/:institution", postStudent);
// post students in a class
studentsRouter.post("/class/:class", postStudents);

export default studentsRouter;
