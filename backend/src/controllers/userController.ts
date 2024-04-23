import { Request, Response } from "express";
import { createUserResponseDto, userDto } from "../dto/user.dto";
import { createUserDetails } from "../service/users";

export const createUser = async (
  req: Request<userDto>,
  res: Response
): Promise<createUserResponseDto> => {
  try {
    const userDetails: userDto = req.body;
    await createUserDetails(userDetails);
    const successResponse = {
      status: 200,
      message: "User Created Successfully",
    };
    return successResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
