import express from "express";
import {
  loginUser,
  logoutUser,
  registerOrgandUser,
} from "../controllers/authController.js";
import isAuthorized from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerOrgandUser);

//login
router.post("/login", loginUser);

router.use(isAuthorized);
router.post("/logout", logoutUser);

export default router;
