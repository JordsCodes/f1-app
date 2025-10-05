import "./App.css";
import AppHeader from "./AppHeader";
import Controls from "./features/race-metrics/components/Controls/Controls";
import { useState } from "react";

export default function App() {
  const [season, setSeason] = useState<{ label: string }>();
  return (
    <div className="app-container">
      <AppHeader header="Chequered Stats" />
      <Controls season={season} setSeason={setSeason} />
    </div>
  );
}
