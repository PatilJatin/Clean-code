import { adminRouter } from "@presentation/routes/admin-routes";
import { type Express, Router } from "express";
import ApiError  from "@presentation/error-handling/api-error";
import { outletRouter } from "@presentation/routes/outlet-routes";

export default (app: Express): void => {
  const router = Router();
  app.get("/health", (req, res) => {
    const error1 = ApiError.getOk();

    res.status(200).json({ message: "ok",});
  });
 
  app.use(adminRouter);
  app.use(outletRouter);
  app.use(router);
};
