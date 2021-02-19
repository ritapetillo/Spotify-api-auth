import { error } from "console";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import axios from "axios";
import User from "../../Models/User";
import { IReqUser } from "../interfaces/user";
import {
  generateRefreshToken,
  generateToken,
  verifyToken,
} from "../../Lib/auth/strategies/auth";
const authRouter = express.Router();

authRouter.get(
  "/login",
  passport.authenticate("spotify", {
    scope: [
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-modify-playback-state",
      "user-top-read",
      "user-modify-playback-state",
    ],
  })
);

authRouter.get(
  "/callback",
  passport.authenticate("spotify", { failureRedirect: "/login" }),
  function (req, res) {
    const details: any = req.user;
    //send the cookines
    res.cookie("accessToken", details.accessToken, { httpOnly: true });
    res.cookie("refreshToken", details.refreshToken, { httpOnly: true });
    res.cookie("userToken", details.userToken, { httpOnly: true });
    res.cookie("userRToken", details.userRToken, { httpOnly: true });

    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000");
  }
);

authRouter.post(
  "/refresh",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      //verify refresh token
      const user = await User.findOne({
        refreshToken: req.cookies.refreshToken,
      });
      if (!user) {
        throw error;
      } else {
        const rToken = await verifyToken(req.cookies.userRToken);
        if (rToken) {
          const resp = await axios.post(
            `${process.env.SPOTIFY_API_URI_TOEKEN!}/api/token`,

            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              data: {
                refresh_token: req.cookies.refreshToken,
                grant_type: "grant_type",
                client_id: process.env.SPOTIFY_CLIENT_ID!,
              },
            }
          );
          const data = await resp.data;
          const userToken = await generateToken(user.spotify_id);
          const userRToken = await generateRefreshToken(user.spotify_id);

          res.cookie("accessToken", data.access_token, { httpOnly: true });
          res.cookie("refreshToken", data.refresh_token, { httpOnly: true });
          res.cookie("userToken", userToken, { httpOnly: true });
          res.cookie("userRToken", userRToken, { httpOnly: true });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
);

authRouter.post(
  "/logout",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("accessToken", { httpOnly: true });
      res.clearCookie("refreshToken", { httpOnly: true });
      res.clearCookie("userToken", { httpOnly: true });
      res.clearCookie("userRToken", { httpOnly: true });
      res.send("logout");
    } catch (err) {
      console.log(err);
    }
  }
);

export default authRouter;
