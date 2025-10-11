import "./Button.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled: boolean;
}

export default function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <div className={`button ${disabled ? "disabled" : ""}`} onClick={onClick}>
      <p className="button-text">{label}</p>
    </div>
  );
}
