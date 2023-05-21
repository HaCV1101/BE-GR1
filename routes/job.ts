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
router.get("/:jobId/suitableCandidates", jobController.getSuitableCandidates);
router.get(
  "/suitableJobs",
  authMiddleware.verifyToken,
  authMiddleware.verifyCandidate,
  jobController.getsuitableJobs
);
export default router;
