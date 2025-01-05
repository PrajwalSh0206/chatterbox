const { STATUS_CODE } = require("../../constants/http-status");
const { createUser, findUser } = require("../../repositories/users");
const { createToken } = require("../../utils/jwt");
const bcrypt = require("bcrypt");

const loginService = async (req, res, logger) => {
  logger = logger.child("Service");

  const { email, password } = req.body;

  const isUserExist = await findUser(["username", "passwordHash"], { email });

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
    username: isUserExist.username,
    email: isUserExist.email,
  });

  res.status(STATUS_CODE.ACCEPTED).send({
    message: "User login successfully",
    token,
  });
};

const signUpService = async (req, res, logger) => {
  logger = logger.child("Service");

  const { email, password, username } = req.body;

  const isUserExist = await findUser(["username"], { email });

  if (isUserExist) {
    logger.error(`Email Id Already Exist`);
    res.status(STATUS_CODE.BAD_REQUEST).send({
      message: "Email Id Already Exist",
    });
  } else {
    await createUser({ email, passwordHash: password, username });
    logger.info(`User Created Successfully`);
    res.status(STATUS_CODE.OK).send({
      message: "User Created Successfully",
    });
  }
};

module.exports = { loginService, signUpService };
