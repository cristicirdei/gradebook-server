import { Router } from "express";
import {
  getClassAttendance,
  postNewAttendance
} from "../controllers/attendance.controller";

const attendanceRouter = new Router();

attendanceRouter.get("/class/:id", getClassAttendance);
//attendanceRouter.get("/student/:student", getStudentAttendance);
attendanceRouter.post("/", postNewAttendance);

export default attendanceRouter;
