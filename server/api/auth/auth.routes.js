const { Router } = require("express");
const { login, signUp } = require("./auth.controller");
const { reqValidator } = require("../../middleware/req-validator");
const { loginSchema, signUpSchema } = require("./auth.schema");
const router = Router();

router.post("/login", reqValidator(loginSchema), login);
router.post("/signUp", reqValidator(signUpSchema), signUp);

module.exports = {
  authRouter: router,
};
