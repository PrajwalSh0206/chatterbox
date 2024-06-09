import winston from "winston";
import { createUserDto, findUserDto } from "../dto/user";
import User from "../models/users.model";
import { CustomError } from "../utils/CustomError";

export const createUserDetails = async (userDetails: createUserDto): Promise<void> => {
  try {
    await User.create({ ...userDetails });
  } catch (err) {
    console.error(err);
    const errorResponse = {
      error: err,
      message: "Failed While Creating User",
    };
    throw new CustomError("Failed While Creating User", 500, errorResponse);
  }
};

export const fetchUserDetails = async (conditions: findUserDto, logger: winston.Logger, attributes: Array<string> = ["userId"]): Promise<User | null> => {
  try {
    logger.child({ operation: "Fetch User Details" });
    const userDetails = await User.findOne({
      attributes,
      where: {
        ...conditions,
      },
    });
    logger.info(`User Details | ${JSON.stringify(userDetails)}`);
    return userDetails;
  } catch (err) {
    console.error(err);
    const errorResponse = {
      error: err,
      message: "Failed While Fetching User",
    };
    throw new CustomError("Failed While Fetching User", 500, errorResponse);
  }
};

export const fetchAllUserDetails = async (conditions: any, logger: winston.Logger, attributes: Array<string> = ["userId"]): Promise<Array<User> | null> => {
  try {
    logger.child({ operation: "Fetch User Details" });
    const userDetails = await User.findAll({
      attributes,
      where: {
        ...conditions,
      },
    });
    logger.info(`User Details | ${JSON.stringify(userDetails)}`);
    return userDetails;
  } catch (err) {
    logger.error(err);
    const errorResponse = {
      error: err,
      message: "Failed While Fetching User",
    };
    throw new CustomError("Failed While Fetching User", 500, errorResponse);
  }
};
