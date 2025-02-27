const { loginService, signUpService, getUserInfoService } = require("./auth.service");

const login = (req, res, next) => {
  try {
    let { logger } = req.ctx;
    logger = logger.child("Controller");
    logger.info("Entered");
    loginService(req, res, logger);
  } catch (error) {
    next(error);
  }
};

const signUp = (req, res, next) => {
  try {
    let { logger } = req.ctx;
    logger = logger.child("Controller");
    logger.info("Entered");
    signUpService(req, res, logger);
  } catch (error) {
    next(error);
  }
};

const getUserInfo = (req, res, next) => {
  try {
    let { logger } = req.ctx;
    logger = logger.child("Controller");
    logger.info("Entered");
    getUserInfoService(req, res, logger);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  signUp,
  getUserInfo,
};
