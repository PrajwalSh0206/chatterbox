const router = require("express").Router();
const { authRouter } = require("../api/auth/auth.routes");
const { authHandler } = require("../middleware/authentication");

router.use("/auth", authHandler(["/login", "/signUp"]), authRouter);

module.exports = { router };
