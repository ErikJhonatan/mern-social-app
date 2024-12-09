import { expressjwt } from "express-jwt";
import dotenv from "dotenv";

dotenv.config();

const AuthMiddleware = expressjwt({
  secret: process.env.SECRET_KEY,
  algorithms: ["HS256"],
  getToken: (req) => req.cookies.token,
}).unless({ path: ["/api/auth/login", "/api/auth/register", "/api/auth/refresh-token", "/api/auth/is-logged-in","/"] });

export default AuthMiddleware;