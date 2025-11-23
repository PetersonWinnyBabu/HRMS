import { Sequelize } from "sequelize";
import dotenv from "dotenv";

import OrganisationModel from "./models/organisation.js";
import UserModel from "./models/user.js";
import EmployeeModel from "./models/employee.js";
import TeamModel from "./models/team.js";
import EmployeeTeamModel from "./models/employeeTeam.js";
import LogModel from "./models/log.js";

dotenv.config({
  path: "./.env",
});
const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;

const db = new Sequelize(database, username, password, {
  host: host,
  dialect: "postgres",
});

const Organisation = OrganisationModel(db);
const User = UserModel(db);
const Employee = EmployeeModel(db);
const Team = TeamModel(db);
const EmployeeTeam = EmployeeTeamModel(db);
const Log = LogModel(db);

const createTables = () => {
  const models = { Organisation, Employee, User, Team, EmployeeTeam };

  Organisation.associate(models);
  User.associate(models);
  Employee.associate(models);
  Team.associate(models);
  EmployeeTeam.associate(models);

  db.sync()
    .then(() => {
      console.log("Tables Created");
    })
    .catch((err) => {
      console.log("DATABASE ERROR", err);
    });
};

const connectDb = async () => {
  try {
    await db.authenticate();
    await createTables();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { connectDb, db, User, Organisation, Employee, Team, Log, EmployeeTeam };
