import { Router } from "express";
import {
  getClassAttendance,
  getStudentAttendance,
  postModifiedAtt,
  postNewAtt
} from "../controllers/attendance";

import verifyUser from "../middleware/auth";

const attendanceRouter = new Router();

attendanceRouter.use(verifyUser);

attendanceRouter.get("/class/:class", getClassAttendance);
attendanceRouter.get("/student/:student", getStudentAttendance);
attendanceRouter.post("/change", postModifiedAtt);
attendanceRouter.post("/new", postNewAtt);

export default attendanceRouter;
