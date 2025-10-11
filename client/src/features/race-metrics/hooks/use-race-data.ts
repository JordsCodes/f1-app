import { useState } from "react";
import axios from "axios";

export default function useRaceData() {
  const [circuits, setCircuits] = useState([]);
  const [lapPositions, setLapPositions] = useState();
  const [lapPositionsLoading, setLapPositionsLoading] = useState(false);
  const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

  async function getLapPositions(keys: Record<string, string | undefined>[]) {
    if (keys.length === 0) return;
    const keyParams = keys
      .map((key) =>
        Object.entries(key).map(([key, value]) => `${key}=${value}`)
      )
      .join("&");
    try {
      const { data } = await axios.get(
        `${BASE_API_URL}/lap-position?${keyParams}`
      );
      setLapPositionsLoading(true);
      setLapPositions({ ...data });
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
        `${BASE_API_URL}/circuit-session/${season}`
      );
      const formattedCircuits = data?.circuits.map(
        (c: { circuitShortName: string; countryName: string }) => ({
          ...c,
          label: `${c.circuitShortName} - ${c.countryName}`,
        })
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
    lapPositions,
    lapPositionsLoading,
  };
}
