import { Request, Response } from "express";
import { defaultSuccessResponseDto, getUserSuccessResponse, jwtPayloadDto, userDto, validateSuccessResponse } from "../dto/user.dto";
import { createUserDetails, fetchAllUserDetails, fetchUserDetails } from "../service/users";
import { CustomError, ErrorHandling } from "../utils/CustomError";
import Authentication from "../utils/Authentication";
import { Logger } from "../utils/Logger";
import { Op } from "sequelize";

export default class UserController {
  async createUserId(req: Request<userDto>, res: Response): Promise<Response> {
    const logger = new Logger("Create_User_Id").createLogger();
    try {
      let successResponse = {
        message: "User Created Successfully",
      };
      const userDetails: userDto = req.body;

      const isUserExist = await fetchUserDetails(
        {
          username: userDetails.username,
        },
        logger
      );
      // Check if user exist
      if (isUserExist) {
        const errorResponse = {
          message: "UserName Already Exist",
        };
        throw new CustomError("UserName Already Exist", 400, errorResponse);
      } else {
        let creatConditions = {
          username: userDetails.username,
          password_hash: userDetails.password,
        };
        await createUserDetails(creatConditions);
      }
      return res.status(201).send(successResponse);
    } catch (err) {
      const errObj = new ErrorHandling();
      const { errorResponse, errorStatus } = errObj.errorHandling(err, logger);
      return res.status(errorStatus).send(errorResponse);
    }
  }

  async validateUser(req: Request<any>, res: Response) {
    const logger = new Logger("Validate_User_Id").createLogger();
    try {
      let successResponse: validateSuccessResponse = {
        message: "User Login Successfully",
        token: "",
      };
      const userDetails: userDto = req.body;

      const isUserExist = await fetchUserDetails(
        {
          username: userDetails.username,
        },
        logger,
        ["userId", "username", "password_hash"]
      );

      // Check if user exist
      if (isUserExist) {
        const authObj = new Authentication();
        // Validate Password
        if (isUserExist.password_hash == authObj.hashPassword(userDetails.password)) {
          successResponse.token = authObj.generateToken({ userId: isUserExist.userId, username: isUserExist.username });
          return res.status(200).send(successResponse);
        }
        const errorResponse = {
          message: "Password Mismatch",
        };
        throw new CustomError("Password Mismatch", 403, errorResponse);
      } else {
        logger.error("Username Does Not Exist");
        const errorResponse = {
          message: "UserName Does Not Exist",
        };
        throw new CustomError("UserName Does Not Exist", 400, errorResponse);
      }
    } catch (err) {
      const errObj = new ErrorHandling();
      const { errorResponse, errorStatus } = errObj.errorHandling(err, logger);
      return res.status(errorStatus).send(errorResponse);
    }
  }

  async getUserDetails(req: Request<any>, res: Response) {
    const logger = new Logger("Get_User_Details").createLogger();
    try {
      let successResponse: getUserSuccessResponse = {
        message: "User Details Retrieved Success",
        userDetails: [],
      };
      const userDetails: jwtPayloadDto = req.body;

      const isUserExist = await fetchAllUserDetails(
        {
          username: { [Op.notLike]: userDetails.username },
        },
        logger,
        ["userId", "username"]
      );

      // Check if user exist
      if (isUserExist?.length) {
        successResponse.userDetails = isUserExist;
        return res.status(200).send(successResponse);
      } else {
        logger.error("No User Details Found");
        const errorResponse = {
          message: "No User Details Found",
        };
        throw new CustomError("No User Details Found", 400, errorResponse);
      }
    } catch (err) {
      const errObj = new ErrorHandling();
      const { errorResponse, errorStatus } = errObj.errorHandling(err, logger);
      return res.status(errorStatus).send(errorResponse);
    }
  }

  async validateToken(req: Request<any>, res: Response) {
    const logger = new Logger("Token Validation").createLogger();
    let successResponse: defaultSuccessResponseDto = {
      message: "Valid Token Provided",
    };
    logger.info("Success");

    return res.status(200).send(successResponse);
  }
}
