const { verifyToken } = require("../utils/jwt");

const authHandler = (excludedPaths = []) => {
  return (req, res, next) => {
    let { logger } = req.ctx;
    logger = logger.child("Authentication");

    const authHeader = req.headers["authorization"];
    logger.info(authHeader);

    if (!excludedPaths.includes(req.path)) {
      const token = authHeader.split(" ")[1];

      if (token) {
        const userData = verifyToken(token, logger);
        if (userData) {
          req.body.userData = userData;
          return next();
        }
      }
      return res.sendStatus(403); // Forbidden
    }

    next();
  };
};

module.exports = { authHandler };
