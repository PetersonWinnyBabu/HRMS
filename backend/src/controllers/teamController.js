import { db, Employee, EmployeeTeam, Log, Team } from "../db.js";
import { handleError, handleSuccess } from "../middlewares/errorHandler.js";

const getTeams = async (req, res) => {
  const orgId = req.organisation_id;
  const userId = req.user;

  const transaction = await db.transaction();
  try {
    const getAllTeams = await Team.findAll(
      { where: { organisation_id: orgId }, order: [["id", "ASC"]] },
      { transaction }
    );

    await Log.create(
      {
        organisation_id: orgId,
        user_id: userId,
        action: `User ${userId} requested Teams Details within organisation ${orgId}`,
        meta: {
          user_id: userId,
          organisation_id: orgId,
        },
      },
      { transaction }
    );
    await transaction.commit();
    return handleSuccess(res, 200, "Success", getAllTeams);
  } catch {
    await transaction.rollback();
    return handleError(res, 400, err.message, err);
  }
};

const getTeamsDetails = async (req, res) => {
  const orgId = req.organisation_id;
  const userId = req.user;
  const { id } = req.params;

  const transaction = await db.transaction();
  try {
    const getTeam = await Team.findOne(
      { where: { organisation_id: orgId, id: id } },
      { transaction }
    );
    const getEmployees = await Employee.findAll({
      attributes: ["id", "first_name", "last_name", "email", "phone"],
      include: [
        {
          model: Team,
          required: true,
          attributes: [],
          where: {
            id: id,
          },
          through: { attributes: [] },
        },
      ],
    });

    const getAssignedEmployees = await Employee.findAll({
      attributes: ["id"],
      include: [
        {
          model: Team,
          required: true,
          attributes: [],
          where: {
            id: id,
          },
          through: { attributes: [] },
        },
      ],
    });

    console.log(getEmployees);

    await Log.create(
      {
        organisation_id: orgId,
        user_id: userId,
        action: `User ${userId} requested Team ${id} Details within organisation ${orgId}`,
        meta: {
          user_id: userId,
          organisation_id: orgId,
          team_id: id,
        },
      },
      { transaction }
    );
    await transaction.commit();
    return handleSuccess(res, 200, "Success", {
      team_details: getTeam,
      employee_details: getEmployees,
      assigned: getAssignedEmployees,
    });
  } catch {
    await transaction.rollback();
    return handleError(res, 400, err.message, err);
  }
};

const createTeams = async (req, res) => {
  const orgId = req.organisation_id;
  const userId = req.user;
  const { name, description } = req.body;
  if (name === "" || description === "") {
    return handleError(res, 400, "credentials cannot be Empty");
  }

  const transaction = await db.transaction();
  try {
    const createTeam = await Team.create(
      {
        organisation_id: orgId,
        name,
        description,
      },
      { transaction }
    );
    await Log.create(
      {
        organisation_id: orgId,
        user_id: userId,
        action: `User ${userId} Created Team ${createTeam.id} within organisation ${orgId}`,
        meta: {
          user_id: userId,
          organisation_id: orgId,
          team_id: createTeam.id,
        },
      },
      { transaction }
    );
    await transaction.commit();
    return handleSuccess(res, 200, "Team Created Successfully", createTeam);
  } catch (err) {
    await transaction.rollback();
    return handleError(res, 400, err.message, err);
  }
};

const updateTeams = async (req, res) => {
  const orgId = req.organisation_id;
  const userId = req.user;
  const { id } = req.params;
  const { name, description } = req.body;
  if (name === "" || description === "") {
    return handleError(res, 400, "credentials cannot be Empty");
  }

  const transaction = await db.transaction();
  try {
    const updateTeam = await Team.update(
      {
        organisation_id: orgId,
        name,
        description,
      },
      { where: { id: id } },
      { transaction }
    );
    await Log.create(
      {
        organisation_id: orgId,
        user_id: userId,
        action: `User ${userId} Updated Team ${id} within organisation ${orgId}`,
        meta: {
          user_id: userId,
          organisation_id: orgId,
          team_id: id,
        },
      },
      { transaction }
    );
    await transaction.commit();
    return handleSuccess(res, 200, "Team Updated Successfully", updateTeam);
  } catch (err) {
    await transaction.rollback();
    return handleError(res, 400, err.message, err);
  }
};

const deleteTeams = async (req, res) => {
  const orgId = req.organisation_id;
  const userId = req.user;
  const { id } = req.params;

  const transaction = await db.transaction();
  try {
    const deleteTeam = await Team.destroy(
      { where: { id: id } },
      { transaction }
    );
    await Log.create(
      {
        organisation_id: orgId,
        user_id: userId,
        action: `User ${userId} Deleted Team ${id} within organisation ${orgId}`,
        meta: {
          user_id: userId,
          organisation_id: orgId,
          team_id: id,
        },
      },
      { transaction }
    );
    await transaction.commit();
    return handleSuccess(res, 200, "Team Deleted Successfully", deleteTeam);
  } catch (err) {
    await transaction.rollback();
    return handleError(res, 400, err.message, err);
  }
};

const assignEmployeesToTeams = async (req, res) => {
  const orgId = req.organisation_id;
  const userId = req.user;
  const { employeeIDs } = req.body;
  const { id } = req.params;

  const transaction = await db.transaction();

  try {
    const assignEmployees = await EmployeeTeam.bulkCreate([...employeeIDs], {
      transaction,
    });
    await Log.create(
      {
        organisation_id: orgId,
        user_id: userId,
        action: `User ${userId} assigned Employees to team ${id} within organisation ${orgId}`,
        meta: {
          user_id: userId,
          organisation_id: orgId,
          team_id: id,
        },
      },
      { transaction }
    );
    await transaction.commit();
    return handleSuccess(
      res,
      200,
      "Employees Assigned Successfully",
      assignEmployees
    );
  } catch (err) {
    await transaction.rollback();
    return handleError(res, 400, err.message, err);
  }
};

const deleteAssignTeam = async (req, res) => {
  const orgId = req.organisation_id;
  const userId = req.user;
  const { employee_id, team_id } = req.body;

  const transaction = await db.transaction();

  try {
    const unassignEmployees = await EmployeeTeam.destroy(
      { where: { employee_id: employee_id, team_id: team_id } },
      {
        transaction,
      }
    );
    await Log.create(
      {
        organisation_id: orgId,
        user_id: userId,
        action: `User ${userId} unassigned Employees from team ${team_id} within organisation ${orgId}`,
        meta: {
          user_id: userId,
          organisation_id: orgId,
          team_id: team_id,
          employee_id: employee_id,
        },
      },
      { transaction }
    );
    await transaction.commit();
    return handleSuccess(
      res,
      200,
      "Employees unassigned Successfully",
      unassignEmployees
    );
  } catch (err) {
    await transaction.rollback();
    return handleError(res, 400, err.message, err);
  }
};

export {
  assignEmployeesToTeams,
  createTeams,
  deleteAssignTeam,
  deleteTeams,
  getTeams,
  getTeamsDetails,
  updateTeams,
};
