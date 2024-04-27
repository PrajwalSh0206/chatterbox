import { Dispatch } from "react";

export interface usernameDto {
  username: string;
  setUsername: Dispatch<string>;
}

export type passwordTypeDto = "password" | "text";

export interface passwordDto {
  password: string;
  setPassword: Dispatch<string>;
  placeholder: string;
}
