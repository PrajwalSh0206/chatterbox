import express from "express";
import { createUser } from "../controllers/userController";
const router = express.Router();

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     description: Endpoint to create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               completed:
 *                 type: boolean
 *               important:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post("/create", createUser);

export default router;
