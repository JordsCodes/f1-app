import Dropdown from "../../../../components/Dropdown/Dropdown";
import Button from "../../../../components/Button/Button";
import "./Controls.css";

const getSeasons = () => {
  const dates = [];
  const today = new Date();
  const firstYear = 2023;
  const thisYear = Number(today.getFullYear());
  let date = firstYear;
  while (date <= thisYear) {
    dates.push(date.toString());
    date++;
  }
  return dates;
};

export default function Controls() {
  return (
    <div className="controls-container">
      <Dropdown
        label="Season"
        placeholder="Select a season"
        options={getSeasons()}
      ></Dropdown>
      <Dropdown
        label="Circuit"
        placeholder="Select a circuit"
        options={["test", "test2"]}
      ></Dropdown>
      <div className="button-container">
        <Button label="Go Racing!" />
      </div>
    </div>
  );
}
