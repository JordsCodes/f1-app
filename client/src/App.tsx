import "./App.css";
import AppHeader from "./AppHeader";
import Controls from "./features/race-metrics/components/Controls/Controls";
import { useState } from "react";
import useRaceData from "./features/race-metrics/hooks/use-race-data";
import { Circuit } from "./features/race-metrics/types";

export default function App() {
  const [season, setSeason] = useState<{ label: string } | undefined>();
  const [circuit, setCircuit] = useState<Circuit | undefined>();
  const {
    circuits,
    getCircuits,
    getLapPositions,
    lapPositions,
    lapPositionsLoading,
  } = useRaceData();
  return (
    <div className="app-container">
      <AppHeader header="Chequered Stats" />
      <Controls
        season={season}
        setSeason={setSeason}
        circuit={circuit}
        setCircuit={setCircuit}
        circuits={circuits}
        getLapPositions={getLapPositions}
        getCircuits={getCircuits}
      />
    </div>
  );
}
