export interface userDto {
  username: string; // Definite assignment assertion
  email: string; // Definite assignment assertion
  password_hash: string;
}

interface successCreateUserResponseDto {
  status: number;
  message: string;
}

interface failureCreateUserResponseDto {
  status: number;
  error: string;
}
export type createUserResponseDto =
  | successCreateUserResponseDto
  | failureCreateUserResponseDto;

export interface createUserDto extends userDto {
  userId?: number;
}
