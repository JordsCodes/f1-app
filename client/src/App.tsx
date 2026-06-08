import "./App.css";
import AppHeader from "./AppHeader";
import Controls from "./features/race-metrics/components/Controls/Controls";
import { useState } from "react";
import useRaceData from "./features/race-metrics/hooks/use-race-data";
import { Circuit } from "./features/race-metrics/types";
import LineGraph from "./features/race-metrics/components/LineGraph/LineGraph";

export default function App() {
  const [season, setSeason] = useState<{ label: string } | undefined>();
  const [circuit, setCircuit] = useState<Circuit | undefined>();
  const {
    circuits,
    getCircuits,
    getLapPositions,
    allDriverLapPositions,
    driverLapPositions,
    setDriverLapPositions,
    lapCount,
    getDriversUntilPosition,
  } = useRaceData();

  const filterTopDrivers = (position: number) => {
    if (!allDriverLapPositions) return;
    setDriverLapPositions(
      getDriversUntilPosition(allDriverLapPositions, position),
    );
  };

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
      {driverLapPositions && lapCount && (
        <LineGraph
          data={driverLapPositions}
          lapCount={lapCount}
          filterTopDrivers={filterTopDrivers}
        />
      )}
    </div>
  );
}
