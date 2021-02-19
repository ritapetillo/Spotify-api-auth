import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import error_handler from "node-error-handler";
import apiRoutes from "./services";
import passport from "passport";
import cookieParser from "cookie-parser";
const server = express();
const PORT = process.env.PORT || 3001;
import "./Lib/auth/strategies/spotify";
const whitelist = ["http://localhost:3000"];

//MIDDLEWARES
server.use(express.json());
server.use(passport.initialize());
server.use(cookieParser());
server.use(
  cors({
    origin: whitelist,
    credentials: true,
  })
);

//HERE MY ROUTE(S)
server.use("/api", apiRoutes);

//ERROR HANDLERS
server.use(error_handler({ log: true, debug: true }));

//CONNECT TO MONGODB AND SERVER
mongoose
  .connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) =>
    server.listen(PORT, () => console.log("connected to " + PORT))
  );
