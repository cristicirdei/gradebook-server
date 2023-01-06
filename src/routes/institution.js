import { Router } from "express";
import {
    getUser,
  postInstitution
} from "../controllers/institution.controller";

const institutionRouter = new Router();

institutionRouter.get("/", getUser);
institutionRouter.post("/", postInstitution);

export default institutionRouter;