const { STATUS_CODE } = require("../../constants/http-status");
const { createUser, findUser } = require("../../repositories/users");
const { createToken } = require("../../utils/jwt");
const bcrypt = require("bcrypt");

const loginService = async (req, res, logger) => {
  logger = logger.child("Service");

  const { username, password } = req.body;

  const isUserExist = await findUser(["passwordHash", "id"], { username });

  if (!isUserExist) {
    return res.status(STATUS_CODE.UNAUTHORIZED).send({
      message: "User Does Not Exist",
    });
  }

  const { passwordHash } = isUserExist;
  const match = await bcrypt.compare(password, passwordHash);

  if (!match) {
    return res.status(STATUS_CODE.UNAUTHORIZED).send({
      message: "Password Mismatch",
    });
  }

  const token = createToken({
    username,
    userId: isUserExist.id,
  });

  res.status(STATUS_CODE.ACCEPTED).send({
    message: "User login successfully",
    token,
  });
};

const signUpService = async (req, res, logger) => {
  logger = logger.child("Service");

  const { password, username } = req.body;

  const isUserExist = await findUser(["username", "id"], { username });

  if (isUserExist) {
    logger.error(`Username Already Exist`);
    res.status(STATUS_CODE.BAD_REQUEST).send({
      message: "Username Already Exist",
    });
  } else {
    const userDetails = await createUser({ passwordHash: password, username });
    logger.info(`User Created Successfully`);
    const token = createToken({
      username: userDetails.username,
      userId: userDetails.id,
    });
    res.status(STATUS_CODE.OK).send({
      message: "User Created Successfully",
      token,
    });
  }
};

const getUserInfoService = async (req, res, logger) => {
  logger = logger.child("Service");

  const {
    userData: { userId: id },
  } = req.body;

  const isUserExist = await findUser(["username"], { id });

  if (!isUserExist) {
    logger.error("User Does Not Exist");
    return res.status(STATUS_CODE.UNAUTHORIZED).send({
      message: "User Does Not Exist",
    });
  }

  const { username } = isUserExist;

  logger.info(`User Exist`);

  return res.send({
    message: "Valid User",
    username,
    userId: id,
  });
};

module.exports = { loginService, signUpService, getUserInfoService };
