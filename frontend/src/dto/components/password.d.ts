export type passwordTypeDto = "password" | "text";

export interface passwordDto {
  password: string;
  setPassword: Dispatch<string>;
  placeholder: string;
}
