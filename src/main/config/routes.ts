
import { shiftRouter } from "@presentation/routes/availibility/shift/shift-routes";
import { accessRuleRouter } from "@presentation/routes/availibility/access-rule/access-rule-routes";

import { type Express, Router } from "express";

export default (app: Express): void => {
  const router = Router();
  
  app.get("/health", (req, res) => {
    res.status(200).json({ message: "ok",});
  });
 
  app.use("/api/v1/shift", shiftRouter);
  app.use("/api/v1/accessrule", accessRuleRouter);
};
