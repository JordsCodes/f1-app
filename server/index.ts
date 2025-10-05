import express from "express";
import CircuitSessions from "./api/routes/circuit-session/circuit-session.controller.js";
import LapPositions from "./api/routes/lap-position/lap-position.controller.js";
import { Request, Response, NextFunction } from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({
    availableEndpoints: {
      sessions: "/api/v1/circuit-session/",
      lapPositions: "/api/v1/lap-position/",
    },
  });
});

app.use("/api/v1/circuit-session/", CircuitSessions);
app.use("/api/v1/lap-position/", LapPositions);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ error: "Internal server error" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found", path: req.originalUrl });
});

app.listen(port);
