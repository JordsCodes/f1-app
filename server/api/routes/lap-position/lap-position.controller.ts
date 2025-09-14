import express from "express";
import { generateLapPositions } from "./lap-position.service.js";
import { UserInputError } from "./lap-position.utils.js";

const VALID_SESSIONS = new Set(["sprint", "race"]);

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const params = Object.entries(req.query);
    const validParams = params.filter((k) => VALID_SESSIONS.has(k[0]));
    const invalidParams = params.filter((k) => !VALID_SESSIONS.has(k[0]));

    if (invalidParams.length > 0) {
      res.status(400).json({
        error: "Invalid query parameters provided by user",
        providedParams: params,
        invalidParams,
        validParams: Array.from(VALID_SESSIONS),
      });
    }

    if (validParams.length === 0)
      res.status(400).json("No sessions have been provided");

    const sessions = validParams.map(([session, key]) => ({
      session,
      key: String(key),
    }));

    const lapPositions = await generateLapPositions(sessions);

    res.status(200).send(lapPositions);
  } catch (err: any) {
    if (err instanceof UserInputError)
      res.status(400).json({ error: err.message });
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
