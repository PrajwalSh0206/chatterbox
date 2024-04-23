import { createUserDto } from "../dto/user.dto";
import User from "../models/users.model";

export const createUserDetails = async (
  userDetails: createUserDto
): Promise<void> => {
  try {
    await User.create({ ...userDetails });
  } catch (err) {
    console.error(err);
    const error = new Error("Failed In Create Task");
    throw error;
  }
};
