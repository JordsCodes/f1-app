import Button from "../../../../components/Button/Button";
import "./LineGraphControls.css";

interface LineGraphControlsProps {
  onClick: (filterNumber: number) => void;
  topPositions: number[];
}

export default function LineGraphControls({
  onClick,
  topPositions
}: LineGraphControlsProps) {
  return (
    <div className="line-graph-controls-container">
      {topPositions.map((position: number) => (
        <Button
          key={position}
          label={`Top ${position}`}
          onClick={() => onClick(position)}
        />
      ))}
    </div>
  );
}
