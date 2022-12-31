import { Router } from "express";
import {
  getClassAttendance,
  getStudentAttendance
} from "../controllers/attendance";

const attendanceRouter = new Router();

attendanceRouter.get("/class/:class", getClassAttendance);
attendanceRouter.get("/student/:student", getStudentAttendance);

export default attendanceRouter;
