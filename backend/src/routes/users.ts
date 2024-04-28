import express from "express";
import UserController from "../controllers/userController";
const router = express.Router();

router.post("/signup", new UserController().createUserId);
router.post("/login", new UserController().validateUser);

export default router;
