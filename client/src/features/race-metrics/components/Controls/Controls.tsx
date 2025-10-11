import Dropdown from "../../../../components/Dropdown/Dropdown";
import Button from "../../../../components/Button/Button";
import "./Controls.css";
import Flag from "react-flagpack";

interface ControlsProps {
  season?: { label: string };
  setSeason: (season: { label: string }) => void;
  circuit?: { label: string };
  setCircuit: (circuit: { label: string } | undefined) => void;
  circuits?: { label: string }[];
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

const getFlag = (countryCode: string) => {
  let code;
  switch (countryCode) {
    case "KSA": // Saudi Arabia
      code = "SA";
      break;
    case "MON": // Monaco
      code = "MC";
      break;
    case "NED": // Netherlands
      code = "NL";
      break;
    case "UAE": // United Arab Emirates
      code = "AE";
      break;
    default:
      code = countryCode;
  }
  return (
    <Flag
      code={code}
      gradient="real-linear"
      size="m"
      hasDropShadow
      hasBorderRadius
    />
  );
};

export default function Controls({
  season,
  setSeason,
  circuit,
  setCircuit,
  circuits,
}: ControlsProps) {
  const handleSeasonSelect = (season: { label: string }) => {
    setSeason(season);
    setCircuit(undefined);
  };
  return (
    <div className="controls-container">
      <Dropdown
        label="Season"
        placeholder="Select a season"
        options={getSeasons()}
        value={season}
        onSelect={handleSeasonSelect}
        disabled={false}
      />
      <Dropdown
        label="Circuit"
        placeholder="Select a circuit"
        options={circuits?.map((c) => ({
          ...c,
          render: (circuit: { countryCode: string; label: string }) => (
            <>
              {getFlag(circuit.countryCode)}
              {circuit.label}
            </>
          ),
        }))}
        value={circuit}
        onSelect={setCircuit}
        disabled={circuits?.length === 0}
      ></Dropdown>
      <div className="button-container">
        <Button label="Go Racing!" />
      </div>
    </div>
  );
}
