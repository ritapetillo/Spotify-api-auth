import { NextFunction, Request, Response } from "express";
import User from "../../Models/User";
import { error } from "console";
import { Idecoded } from "../interfaces/user";
import { verify } from "jsonwebtoken";
import { verifyToken } from "../../Lib/auth/strategies/auth";

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userToken, accessToken } = req.cookies;

    if (!accessToken && !userToken) {
      const error: any = new Error("Please provide a basic authentication");
      error.httpStatusCode = 401;
      next(error);
    }
    const decoded = await verifyToken(userToken);
    if (!decoded) throw error;
    next();
  } catch (err) {
    const error: any = new Error("You are not authorized");
    error.httpStatusCode = 401;
    console.log(err);
    next(error);
  }
};
