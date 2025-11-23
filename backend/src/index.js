import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db.js";
import authRoute from "./routes/auth.js";
import employeeRoute from "./routes/employees.js";
import teamsRoute from "./routes/teams.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

//Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api", employeeRoute);
app.use("/api", teamsRoute);

//Db Connection
connectDb();

//Server Running
app.listen(port, () => {
  console.log(`server runs at port ${port}`);
});
