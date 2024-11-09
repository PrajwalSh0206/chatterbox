import { Router } from "@oak/oak/router";
import signIn from "./auth.controller.ts";

const router = new Router();

router.post("/", signIn);

export default router;
