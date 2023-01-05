import { Router } from "express";
import {
  getAllTeachers,
  getSpecificTeacher,
  postTeacher
} from "../controllers/teachers";
import verifyUser from "../middleware/auth";

const teachersRouter = new Router();

teachersRouter.use(verifyUser);
teachersRouter.get("/:id", getSpecificTeacher);
teachersRouter.get("/all/:institution", getAllTeachers);
teachersRouter.post("/:institution", postTeacher);

export default teachersRouter;
