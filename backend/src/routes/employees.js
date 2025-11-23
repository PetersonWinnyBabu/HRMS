import express from "express";

import isAuthorized from "../middlewares/authMiddleware.js";
import {
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  getCompanyDetails,
} from "../controllers/employeeController.js";

const router = express.Router();

//authenticated Routes

router.use(isAuthorized);
router.get("/organisation", getCompanyDetails);
router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployee);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

export default router;
