import { useState } from "react";
import axios from "axios";
import { DriverLapPositions } from "../types";

const DEFAULT_TOP_DRIVERS = 10;

export default function useRaceData() {
  const [circuits, setCircuits] = useState([]);
  const [driverLapPositions, setDriverLapPositions] =
    useState<Record<string, DriverLapPositions>>();
  const [lapCount, setLapCount] = useState();
  const [lapPositionsLoading, setLapPositionsLoading] = useState(false);
  const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

  function getDriversUntilPosition(
    drivers: Record<string, DriverLapPositions>,
    position: number,
  ) {
    const topDrivers: Record<string, DriverLapPositions> = {};
    for (const key in drivers) {
      const finishingPosition = drivers[key].positions[drivers[key].positions.length - 1].position;
      if (finishingPosition <= position) topDrivers[key] = drivers[key];
    }
    return topDrivers;
  }

  async function getLapPositions(keys: Record<string, string | undefined>[]) {
    if (keys.length === 0) return;
    const keyParams = keys
      .map((key) =>
        Object.entries(key).map(([key, value]) => `${key}=${value}`),
      )
      .join("&");
    try {
      const { data } = await axios.get(
        `${BASE_API_URL}/lap-position?${keyParams}`,
      );
      setLapPositionsLoading(true);
      setDriverLapPositions(
        getDriversUntilPosition(data.race.drivers, DEFAULT_TOP_DRIVERS),
      );
      setLapCount(data.race.lapCount);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || "Server error";
        console.error("API error:", errorMessage);
      } else console.error("Unexpected error:", error);
    } finally {
      setLapPositionsLoading(false);
    }
  }

  async function getCircuits(season: string) {
    if (!season) return;
    try {
      const { data } = await axios.get(
        `${BASE_API_URL}/circuit-session/${season}`,
      );
      const formattedCircuits = data?.circuits.map(
        (c: { circuitShortName: string; countryName: string }) => ({
          ...c,
          label: `${c.circuitShortName} - ${c.countryName}`,
        }),
      );
      setCircuits(formattedCircuits);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || "Server error";
        console.error("API error:", errorMessage);
      } else console.error("Unexpected error:", error);
    }
  }

  return {
    circuits,
    setCircuits,
    getCircuits,
    getLapPositions,
    driverLapPositions,
    setDriverLapPositions,
    lapPositionsLoading,
    lapCount,
    getDriversUntilPosition,
  };
}
