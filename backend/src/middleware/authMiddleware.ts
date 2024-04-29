import { NextFunction, Request, Response } from "express";
import Authentication from "../utils/Authentication";

export default class AuthMiddleware {
  async verifyUser(req: Request, res: Response, next: NextFunction) {
    let skipPath = ["/user/login", "/user/signup"];
    const url = req.path;
    if (skipPath.includes(url)) {
      next();
    } else {
      try {
        const bearerToken = req.headers["authorization"] ?? "";
        if (bearerToken) {
          const token = bearerToken.split(" ")[1];
          const authObj = new Authentication();
          const tokenResult = authObj.verifyToken(token) || {};
          req.body = { ...req.body, ...tokenResult };
          next();
        } else {
          const errorResponse = {
            message: "Unauthorized User",
          };
          return res.status(403).send(errorResponse);
        }
      } catch (error) {
        console.error("Failed During Token Verification");
        const errorResponse = {
          message: "Failed During Token Verification",
        };
        return res.status(403).send(errorResponse);
      }
    }
  }
}
