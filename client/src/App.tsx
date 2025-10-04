import "./App.css";
import AppHeader from "./AppHeader";
import Controls from "./features/race-metrics/components/Controls/Controls";

export default function App() {
  return (
    <div className="app-container">
      <AppHeader header="Chequered Stats" />
      <Controls />
    </div>
  );
}
