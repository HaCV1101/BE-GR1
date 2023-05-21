import { Router } from "express";
const router = Router();
import { jobController } from "../controllers";
import { authMiddleware } from "../middlewares";
router.post(
  "/",
  authMiddleware.verifyToken,
  authMiddleware.verifyCompany,
  jobController.create
);
export default router;
