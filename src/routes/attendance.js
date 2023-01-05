import { Router } from "express";
import {
  getClassAttendance,
  getStudentAttendance,
  postModifiedAtt,
  postNewAtt
} from "../controllers/attendance";

const attendanceRouter = new Router();

attendanceRouter.get("/class/:class", getClassAttendance);
attendanceRouter.get("/student/:student", getStudentAttendance);
attendanceRouter.post("/change", postModifiedAtt);
attendanceRouter.post("/new", postNewAtt);

export default attendanceRouter;
