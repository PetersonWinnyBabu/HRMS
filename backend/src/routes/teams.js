import express from "express";

import isAuthorized from "../middlewares/authMiddleware.js";
import {
  createTeams,
  getTeams,
  updateTeams,
  deleteTeams,
  getTeamsDetails,
  assignEmployeesToTeams,
  deleteAssignTeam,
} from "../controllers/teamController.js";

const router = express.Router();

//authenticated Routes

router.use(isAuthorized);
router.get("/teams", getTeams);
router.post("/teams", createTeams);
router.get("/teams/:id", getTeamsDetails);
router.put("/teams/:id", updateTeams);
router.delete("/teams/:id", deleteTeams);
router.post("/teams/:id/assign", assignEmployeesToTeams);
router.delete("/teams/:id/unassign", deleteAssignTeam);

export default router;
