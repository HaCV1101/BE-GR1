import { Express } from "express";
import authRoute from "./auth";
import meRoute from "./me";
import jobRoute from "./job";

export default function initRoutes(app: Express) {
  app.use("/api/auth", authRoute);
  app.use("/api/me", meRoute);
  app.use("/api/job", jobRoute);
  app.use("/", (req, res) => {
    res
      .status(403)
      .send(
        `No route for path <code style="background-color: #aaaaaac2; border-radius: 5px; padding: 1px 2px;">${req.path}</code> with method <strong>${req.method}</strong>`
      );
  });
}
