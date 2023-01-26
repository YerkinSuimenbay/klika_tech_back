import { errorHandler } from "./middlewares/error-handler";
require("dotenv").config();
import express, { Response } from "express";
import config from "config";
import morgan from "morgan";
import cors from "cors";
import { notFound } from "./middlewares";
import { AppDataSource } from "./utils/data-source";
import validateEnv from "./utils/validate-env";
import redisClient from "./utils/connect-redis";
import playlistRoutes from "./routes/playlist.routes";
import singerRoutes from "./routes/singer.routes";
import songRoutes from "./routes/song.routes";
import genresRoutes from "./routes/genre.routes";

AppDataSource.initialize()
  .then(async () => {
    // VALIDATE ENV
    const res = validateEnv();

    const app = express();

    // MIDDLEWARE

    // 1. Body parser
    app.use(express.json());

    // 2. Logger
    if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

    // 3. Cors
    app.use(cors());

    // ROUTES
    app.use("/api/playlist", playlistRoutes);
    app.use("/api/singers", singerRoutes);
    app.use("/api/songs", songRoutes);
    app.use("/api/genres", genresRoutes);

    // HEALTH CHECKER
    app.get("/api/healthchecker", async (_, res: Response) => {
      const message = await redisClient.get("try");
      res.status(200).json({
        status: "success",
        message,
      });
    });

    // UNHANDLED ROUTE
    app.all("*", notFound);

    // GLOBAL ERROR HANDLER
    app.use(errorHandler);

    const port = config.get<number>("port");
    app.listen(port);

    console.log(`Server started on port: ${port}`);
  })
  .catch((error) => console.log(error));
