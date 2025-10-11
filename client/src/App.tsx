import "./App.css";
import AppHeader from "./AppHeader";
import Controls from "./features/race-metrics/components/Controls/Controls";
import { useState } from "react";
import useRaceData from "./features/race-metrics/hooks/use-race-data";

export default function App() {
  const [season, setSeason] = useState<{ label: string } | undefined>();
  const [circuit, setCircuit] = useState<{ label: string } | undefined>();
  const { circuits } = useRaceData(season?.label);
  return (
    <div className="app-container">
      <AppHeader header="Chequered Stats" />
      <Controls
        season={season}
        setSeason={setSeason}
        circuit={circuit}
        setCircuit={setCircuit}
        circuits={circuits}
      />
    </div>
  );
}
