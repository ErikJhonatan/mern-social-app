import { StatusCodes } from "http-status-codes";

const ErrorMiddleware = (err, req, res, next) => {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong";
  const stack = err.stack || null;
  res.status(status).json({ message });
};

export default ErrorMiddleware;