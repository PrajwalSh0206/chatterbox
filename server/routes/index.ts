import { Router } from "@oak/oak/router";
import authRouter from "../api/auth/auth.routes.ts";

const router = new Router();

router.use("/auth", authRouter.routes());

export default router;
