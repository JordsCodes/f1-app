import express from "express";
import { getCircuitsForYear } from "./circuit.service.js";
import { isValidYear } from "./circuit.utils.js";

const router = express.Router();

router.get("/", async (req, res) => {
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

  const circuits = await getCircuitsForYear(Number(year));
  res.status(200).send(circuits);
});

export default router;
