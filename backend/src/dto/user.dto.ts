export interface jwtPayloadDto {
  userId: string;
  username: string; // Definite assignment assertion
}

export interface userDto {
  username: string; // Definite assignment assertion
  password: string;
}

export interface createUserDto {
  username: string; // Definite assignment assertion
  password_hash: string;
}

export interface findUserDto {
  username: string;
}

export interface validateSuccessResponse {
  message: string;
  token: string;
}
