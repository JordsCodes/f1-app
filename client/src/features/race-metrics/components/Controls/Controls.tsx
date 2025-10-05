import Dropdown from "../../../../components/Dropdown/Dropdown";
import Button from "../../../../components/Button/Button";
import "./Controls.css";

interface ControlsProps {
  season?: { label: string };
  setSeason: (season: { label: string }) => void;
}

const getSeasons = () => {
  const dates = [];
  const today = new Date();
  const firstYear = 2023;
  const thisYear = Number(today.getFullYear());
  let date = firstYear;
  while (date <= thisYear) {
    dates.push({ label: date.toString() });
    date++;
  }
  return dates;
};

export default function Controls({ season, setSeason }: ControlsProps) {
  return (
    <div className="controls-container">
      <Dropdown
        label="Season"
        placeholder="Select a season"
        options={getSeasons()}
        value={season}
        onSelect={setSeason}
      />
      <Dropdown
        label="Circuit"
        placeholder="Select a circuit"
        options={[{ label: "Circuit 1" }]}
        value={undefined}
        onSelect={() => console.log("clicked")}
      ></Dropdown>
      <div className="button-container">
        <Button label="Go Racing!" />
      </div>
    </div>
  );
}
