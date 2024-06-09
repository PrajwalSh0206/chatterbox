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

export interface defaultSuccessResponseDto {
  message: string;
}

export interface validateResponseDto extends defaultSuccessResponseDto{
  username:string,
  userId:string,
}

export interface validateSuccessResponse extends defaultSuccessResponseDto {
  token: string;
}

export interface getUserSuccessResponse extends defaultSuccessResponseDto {
  userDetails: Array<any>;
}
