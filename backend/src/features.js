import jwt from "jsonwebtoken";



const sendToken = (res, user, code, message) => {
  const token = jwt.sign(
    { userId: user.id, orgId: user.organisation_id },
    process.env.JWT_SECRET
  );

  return res.status(code).json({
    message,
    auth_token: token,
  });
};

export { sendToken };
