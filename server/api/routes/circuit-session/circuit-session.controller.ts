import express from "express";
import { getSessionsForYear } from "./circuit-session.service.js";
import { isValidYear } from "./cirucit-session.utils.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  res.status(400).json("No year provided.");
});

router.get("/:year", async (req, res) => {
  const { year } = req.params;
  if (!isValidYear(Number(year))) {
    res
      .status(400)
      .json(
        "Invalid year provided. Must be a valid year between 2023 and the current year."
      );
    return;
  }

  const sessions = await getSessionsForYear(Number(year));
  res.status(200).send(sessions);
});

export default router;
