import { compare, hash } from "bcrypt";
import { User, Organisation, db, Log } from "../../src/db.js";
import { handleError, handleSuccess } from "../middlewares/errorHandler.js";
import { sendToken } from "../features.js";
import isAuthorized from "../middlewares/authMiddleware.js";

const registerOrgandUser = async (req, res) => {
  const { orgName, adminName, email, password } = req.body;
  const hashedPassword = await hash(password, 10);

  const transaction = await db.transaction();

  try {
    const createOrg = await Organisation.create(
      { name: orgName },
      { transaction }
    );

    const createUser = await User.create(
      {
        name: adminName,
        email: email,
        password_hash: hashedPassword,
        organisation_id: createOrg.id,
      },
      { transaction }
    );

    const createLog = await Log.create(
      {
        organisation_id: createOrg.id,
        user_id: createUser.id,
        action: `User ${createUser.id} created organisation ${createOrg.id}`,
        meta: {
          user_name: createUser.name,
          user_id: createUser.id,
          organisation_name: createOrg.name,
        },
      },
      { transaction }
    );

    await transaction.commit();
    return handleSuccess(
      res,
      200,
      "Organisation and User created successfully"
    );
  } catch (err) {
    await transaction.rollback();
    if (err.name === "SequelizeUniqueConstraintError") {
      return handleError(res, 400, "Email has already been used", err);
    }
    return handleError(res, 400, err.message, err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const getUser = await User.findOne({ where: { email: email } });

    if (getUser) {
      const match = await compare(password, getUser.password_hash);
      if (!match) {
        await Log.create({
          organisation_id: getUser.organisation_id,
          user_id: getUser.id,
          action: `User ${getUser.id} Login Failed`,
          meta: {
            user_name: getUser.name,
            user_id: getUser.id,
            organisation_id: getUser.organisation_id,
          },
        });
        return handleError(res, 401, "Incorrect Password");
      } else {
        await Log.create({
          organisation_id: getUser.organisation_id,
          user_id: getUser.id,
          action: `User ${getUser.id} Login Sucess`,
          meta: {
            user_name: getUser.name,
            user_id: getUser.id,
            organisation_id: getUser.organisation_id,
          },
        });
        return sendToken(res, getUser, 200, "Login Success");
      }
    } else {
      return handleError(res, 404, "User not found");
    }
  } catch (err) {
    console.log(err);
  }
};
const logoutUser = async (isAuthorized, req, res) => {
  const { logout } = req.body;
  const orgId = req.organisation_id;
  const userId = req.user;

  try {
    await Log.create({
      organisation_id: orgId,
      user_id: userId,
      action: `User ${userId} Logged out successfully`,
      meta: {
        user_id: userId,
        organisation_id: orgId,
      },
    });
    return res.status(200).json("successfully logged out");
  } catch (err) {
    return res.status(400).json("Bad Request");
  }
};

export { registerOrgandUser, loginUser, logoutUser };
