import Button from "../../../../components/Button/Button";
import "./LineGraphControls.css";

interface LineGraphControlsProps {
  onClick: (filterNumber: number) => void;
}

export default function LineGraphControls({ onClick }: LineGraphControlsProps) {
  return (
    <div className="line-graph-controls-container">
      <Button label="Top 5" onClick={() => onClick(5)} />
      <Button label="Top 10" onClick={() => onClick(10)} />
      <Button label="Top 20" onClick={() => onClick(20)} />
    </div>
  );
}
