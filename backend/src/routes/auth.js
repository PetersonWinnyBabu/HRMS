import express from "express";
import {
  loginUser,
  logoutUser,
  registerOrgandUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerOrgandUser);

//login
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
