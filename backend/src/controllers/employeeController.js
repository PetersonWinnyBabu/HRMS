import { QueryTypes } from "sequelize";
import {
  Employee,
  db,
  Log,
  Organisation,
  User,
  Team,
  EmployeeTeam,
} from "../db.js";
import { handleError, handleSuccess } from "../middlewares/errorHandler.js";

const getCompanyDetails = async (req, res) => {
  const orgId = req.organisation_id;
  const userId = req.user;

  console.log(orgId);
  const transaction = await db.transaction();
  try {
    const companyDetails = await Organisation.findOne(
      { where: { id: orgId } },
      { transaction }
    );
    const userDetails = await User.findOne(
      { where: { id: userId } },
      { transaction }
    );

    const getCountTeams = await db.query(
      `SELECT COUNT(*) as count FROM teams WHERE organisation_id = ${orgId}`,
      { type: QueryTypes.SELECT }
    );

    const getEmployeesCount = await db.query(
      `SELECT COUNT(*) as count FROM employees WHERE organisation_id = ${orgId}`,
      { type: QueryTypes.SELECT }
    );

    await Log.create(
      {
        organisation_id: orgId,
        user_id: userId,
        action: `User ${userId} fetched Details  about organisation ${orgId}`,
        meta: {
          user_id: userId,
          organisation_id: orgId,
        },
      },
      { transaction }
    );
    await transaction.commit();
    const details = {
      userName: userDetails.name,
      orgName: companyDetails.name,
      teamCount: getCountTeams[0].count,
      employeesCount: getEmployeesCount[0].count,
    };
    return handleSuccess(res, 200, "Success", details);
  } catch (err) {
    await transaction.rollback();
    handleError(res, 400, err.message, err);
  }
};

const createEmployee = async (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  const orgId = req.organisation_id;
  const userId = req.user;

  if (first_name === "" || last_name === "" || email === "" || phone === "") {
    return handleError(res, 400, "credentials cannot be Empty");
  }

  const isEmployee = await Employee.findOne({ where: { email: email } });
  if (isEmployee) {
    handleError(res, 400, "Email already Exists");
  }

  const transaction = await db.transaction();
  try {
    const empCreate = await Employee.create(
      {
        first_name,
        last_name,
        email,
        phone,
        organisation_id: orgId,
      },
      { transaction }
    );

    await Log.create(
      {
        organisation_id: orgId,
        user_id: userId,
        action: `User ${userId} created Employee ${empCreate.id} within organisation ${orgId}`,
        meta: {
          user_id: userId,
          organisation_id: orgId,
          employee_id: empCreate.id,
        },
      },
      { transaction }
    );

    await transaction.commit();
    return handleSuccess(res, 200, "Employee Created Successfully", empCreate);
  } catch (err) {
    await transaction.rollback();
    return handleError(res, 400, err.message, err);
  }
};

const getAllEmployees = async (req, res) => {
  const orgId = req.organisation_id;
  const userId = req.user;
  const transaction = await db.transaction();

  try {
    const getEmployees = await Employee.findAll(
      {
        where: { organisation_id: orgId },
        order: [["id", "ASC"]],
      },

      { transaction }
    );
    await Log.create(
      {
        organisation_id: orgId,
        user_id: userId,
        action: `User ${userId} requested All Employees within organisation ${orgId}`,
        meta: {
          user_id: userId,
          organisation_id: orgId,
        },
      },
      { transaction }
    );
    await transaction.commit();
    return handleSuccess(res, 200, "Success", getEmployees);
  } catch (err) {
    await transaction.rollback();
    return handleError(res, 400, err.message, err);
  }
};

const getEmployee = async (req, res) => {
  const orgId = req.organisation_id;
  const userId = req.user;
  const { id } = req.params;
  console.log(id);
  try {
    const getEmp = await Employee.findOne({
      where: { id: id, organisation_id: orgId },
    });

    const getTeams = await Team.findAll({
      attributes: ["id", "name", "description"],
      include: [
        {
          model: Employee,
          required: true,
          attributes: [],
          where: {
            id: id,
          },
          through: { attributes: [] },
        },
      ],
    });

    console.log(getTeams);

    await Log.create({
      organisation_id: orgId,
      user_id: userId,
      action: `User ${userId} requested Employee ${id} Details within organisation ${orgId}`,
      meta: {
        user_id: userId,
        organisation_id: orgId,
        employee_id: id,
      },
    });
    if (getEmp) {
      handleSuccess(res, 200, "Success", {
        employee_details: getEmp,
        employee_team_details: getTeams,
      });
    } else {
      return handleError(res, 404, "Not Found");
    }
  } catch (err) {
    return handleError(res, 400, err.message, err);
  }
};

const updateEmployee = async (req, res) => {
  const orgId = req.organisation_id;
  const userId = req.user;
  const { id } = req.params;
  const { first_name, last_name, email, phone } = req.body;
  if (first_name === "" || last_name === "" || email === "" || phone === "") {
    return handleError(res, 400, "credentials cannot be Empty");
  }

  const transaction = await db.transaction();

  try {
    await Employee.update(
      { first_name, last_name, email, phone },
      {
        where: { id: id, organisation_id: orgId },
      },
      { transaction }
    );

    await Log.create(
      {
        organisation_id: orgId,
        user_id: userId,
        action: `User ${userId} updated Employee ${id} Details within organisation ${orgId}`,
        meta: {
          user_id: userId,
          organisation_id: orgId,
          employee_id: id,
        },
      },
      { transaction }
    );
    await transaction.commit();
    return handleSuccess(res, 200, "Employee Updated");
  } catch (err) {
    await transaction.rollback();
    return handleError(res, 400, err.message, err);
  }
};

const deleteEmployee = async (req, res) => {
  const orgId = req.organisation_id;
  const userId = req.user;
  const { id } = req.params;

  const transaction = await db.transaction();

  try {
    const deleteEmp = await Employee.destroy(
      {
        where: { id: id, organisation_id: orgId },
      },
      { transaction }
    );

    console.log(deleteEmp);
    await Log.create(
      {
        organisation_id: orgId,
        user_id: userId,
        action: `User ${userId} deleted Employee Details within organisation ${orgId}`,
        meta: {
          user_id: userId,
          organisation_id: orgId,
          employee_id: id,
        },
      },
      { transaction }
    );
    await transaction.commit();
    return handleSuccess(res, 200, "Employee Deleted");
  } catch (err) {
    await transaction.rollback();
    return handleError(res, 400, err.message, err);
  }
};

export {
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  getCompanyDetails,
};
