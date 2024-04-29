import crypto from "crypto";
import jwt from "jsonwebtoken";
import { jwtPayloadDto } from "../dto/user.dto";

// Function to hash a password using the provided salt
export default class Authentication {
  salt: string = "15";
  secretKey: string = "39dd67c68bd1d3e04f84e8101a2fd62a93232217302921e83154c92773e18843";
  expiresIn: string = "1h";

  // Function to generate hash password
  hashPassword(password: string) {
    const hash = crypto.createHmac("sha256", this.salt).update(password).digest("hex"); // Create a hash using the password and salt
    return hash;
  }

  // Function to generate a JWT token
  generateToken(payload: jwtPayloadDto): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
  }

  // Function to verify a JWT token
  verifyToken(token: string): any {
    return jwt.verify(token, this.secretKey);
  }
}
