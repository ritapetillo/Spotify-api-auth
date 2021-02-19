import express from "express";
import authRouter from "./auth";
import spotifyRoutes from "./spotify";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/spotify", spotifyRoutes);

export default router;
