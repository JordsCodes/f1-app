import express from "express";
import Sessions from "./api/routes/session/session.controller.js";
import LapPositions from "./api/routes/lap-position/lap-position.controller.js";
import { Request, Response, NextFunction } from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({
    availableEndpoints: {
      circuits: "/circuits",
    },
  });
});

app.use("/session/", Sessions);
app.use("/lap-position/", LapPositions);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ error: "Internal server error" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found", path: req.originalUrl });
});

app.listen(port);
