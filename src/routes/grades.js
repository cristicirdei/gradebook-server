import { Router } from "express";

const gradesRouter = new Router();

gradesRouter.get("/", (_req, res) => {
  return res.sendStatus(200);
});

export default gradesRouter;
