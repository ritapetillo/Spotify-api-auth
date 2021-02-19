import express, { NextFunction, Request, Response } from "express";
const spotifyRouter = express.Router();
import { authMiddleware } from "../middlewares/auth";
import axios from "axios";
import { syncBuiltinESMExports } from "module";

spotifyRouter.get("/me", authMiddleware, async (req, res, next) => {
  try {
    const resp = await axios.get(`${process.env.SPOTIFY_API_URI!}me`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${req.cookies.accessToken}`,
      },
    });
    const data = await resp.data;
    res.send(data);
  } catch (err) {
    next(err);
  }
});

spotifyRouter.get("/me/playlist", authMiddleware, async (req, res, next) => {
  try {
    const resp = await axios.get(
      `${process.env.SPOTIFY_API_URI!}me/playlists`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${req.cookies.accessToken}`,
        },
      }
    );
    const data = await resp.data;
    console.log(data);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

spotifyRouter.get(
  "/categories",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resp = await axios.get(
        `${process.env.SPOTIFY_API_URI!}browse/categories`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${req.cookies.accessToken}`,
          },
        }
      );
      const data = await resp.data;
      res.send({ data });
    } catch (err) {
      next(err);
    }
  }
);

spotifyRouter.get(
  "/new-releases",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resp = await axios.get(
        `${process.env.SPOTIFY_API_URI!}browse/new-releases?country=US`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${req.cookies.accessToken}`,
          },
        }
      );
      const data = await resp.data;
      res.send({ data });
    } catch (err) {
      next(err);
    }
  }
);
spotifyRouter.get("/search", authMiddleware, async (req, res, next) => {
  try {
    const resp = await axios.get(
      `${process.env.SPOTIFY_API_URI!}search?q=${req.query.q}&type=album`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${req.cookies.accessToken}`,
        },
      }
    );
    const data = await resp.data;
    res.send(data);
  } catch (err) {
    next(err);
  }
});

spotifyRouter.get("/album/:id", authMiddleware, async (req, res, next) => {
  try {
    console.log("album");
    const resp = await axios.get(
      `${process.env.SPOTIFY_API_URI!}albums/${req.params.id}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${req.cookies.accessToken}`,
        },
      }
    );
    const data = await resp.data;
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default spotifyRouter;
