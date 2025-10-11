import { useState, useEffect } from "react";
import axios from "axios";

export default function useRaceData(season: string | undefined) {
  const [circuits, setCircuits] = useState([]);
  const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function getCircuits() {
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
    getCircuits();
  }, [BASE_API_URL, season]);

  return {
    circuits,
    setCircuits,
  };
}
