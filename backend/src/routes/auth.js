import express from "express";
import {
  loginUser,
  registerOrgandUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerOrgandUser);

//login
router.post("/login", loginUser);

export default router;
