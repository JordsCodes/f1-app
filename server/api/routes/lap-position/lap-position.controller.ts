import express from "express";
import { generateLapPositions } from "./lap-position.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const {
    practice1,
    practice2,
    practice3,
    sprintShootout,
    sprint,
    qualifying,
    race,
  } = req.query;

  const sessions = [
    { session: "practice1", key: practice1 as string },
    { session: "practice2", key: practice2 as string },
    { session: "practice3", key: practice3 as string },
    { session: "sprintShootout", key: sprintShootout as string },
    { session: "sprint", key: sprint as string },
    { session: "qualifying", key: qualifying as string },
    { session: "race", key: race as string },
  ].filter((s) => s.key);

  const lapPositions = await generateLapPositions(sessions);

  res.status(200).send(lapPositions);
});

export default router;
