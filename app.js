import express from "express";
import morgan from "morgan";
import { globalLimiter } from "./src/middlewares/rateLimiter.middleware.js";
import helmet from "helmet"
import cors from "cors"
import mongoSanitize from "@exortek/express-mongo-sanitize"
import passport from "passport";
import "./src/config/passport.config.js"

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(passport.initialize());
app.use(morgan("dev"));
app.use(globalLimiter);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

export default app;
