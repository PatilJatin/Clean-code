import { adminRouter } from "@presentation/routes/admin-routes";
import { superAdminRouter } from "@presentation/routes/super-admin-routes";
import { type Express, Router } from "express";
import ApiError  from "@presentation/error-handling/api-error";

export default (app: Express): void => {
  const router = Router();
  app.get("/health", (req, res) => {
    const error1 = ApiError.getOk();

    res.status(200).json({ message: "ok",});
  });
 
  app.use(adminRouter);
  app.use(router);
  app.use("/api/v1", superAdminRouter);
};
