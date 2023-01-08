import { Router } from "express";
import {
    getUser,
  postInstitution
} from "../database/institution.controller";
import verifyUser from "../middleware/auth";

const institutionRouter = new Router();

institutionRouter.use(verifyUser);
institutionRouter.get("/", getUser);
institutionRouter.post("/", postInstitution);

export default institutionRouter;