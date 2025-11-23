import jwt from "jsonwebtoken";
import { handleError } from "./errorHandler.js";

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization || "";
  const token = auth.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = verifyToken.userId;
  req.organisation_id = verifyToken.orgId;
  next();
};

export default isAuthorized;
