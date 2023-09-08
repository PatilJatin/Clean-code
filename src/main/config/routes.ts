import { adminRouter } from "@presentation/routes/admin-routes";
import { mediaRoutes } from "@presentation/routes/outlet-mediasource-routes";
import { outletRouter } from "@presentation/routes/outlet-routes";
import { reservationStatusRouter } from "@presentation/routes/reservation-status-routes";
import { roomRouter } from "@presentation/routes/room-routes";
import { seatingAreaRouter } from "@presentation/routes/seating-area-routes";
import { bookedByNameRouter } from "@presentation/routes/booked-by-name-routes";
import { superAdminRouter } from "@presentation/routes/super-admin-routes";
import { tableRouter } from "@presentation/routes/table-routes";
import { guestRouter } from "@presentation/routes/guest-route";
import { clientRouter } from "@presentation/routes/client-route";
import { clientTagCategoryRouter } from "@presentation/routes/client-tag-category-route";
import { reservationTagCategoryRouter } from "@presentation/routes/reservation-tag-category-route";
import { clientTagRouter } from "@presentation/routes/client-tag-route";

import { type Express, Router } from "express";
import { serverNameRouter } from "@presentation/routes/server-name-routes";

export default (app: Express): void => {
  const router = Router();

  app.get("/health", (req, res) => {
    res.status(200).json({ message: "ok", });
  });

  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/outlet", outletRouter);
  app.use("/api/v1/outlet/media", mediaRoutes);
  app.use("/api/v1/people/bookedByName", bookedByNameRouter);
  app.use("/api/v1/people/serverName", serverNameRouter);
  app.use("/api/v1/room", roomRouter);
  app.use("/api/v1/seatingarea", seatingAreaRouter);
  app.use("/api/v1/table", tableRouter);
  app.use("/api/v1/reservation/status", reservationStatusRouter);
  app.use("/api/v1/superadmin", superAdminRouter);
  app.use("/api/v1/guests", guestRouter);
  app.use("/api/v1/clients", clientRouter);
  app.use("/api/v1/clienttagcategory", clientTagCategoryRouter);
  app.use("/api/v1/reservationtagcategory", reservationTagCategoryRouter);
  app.use("/api/v1/clienttag", clientTagRouter);
  app.use(router);
};

