import { adminRouter } from "@presentation/routes/admin-routes";
import { outletRouter } from "@presentation/routes/outlet-routes";
import { superAdminRouter } from "@presentation/routes/super-admin-routes";

import { type Express, Router } from "express";

export default (app: Express): void => {
  const router = Router();
  app.get("/health", (req, res) => {
    res.status(200).json({ message: "ok",});
  });
 
  app.use(adminRouter);
  app.use(outletRouter);
  app.use(router);
  app.use("/api/v1", superAdminRouter);
};
