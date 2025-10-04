import "./Button.css";

interface ButtonProps {
  label: string;
}

export default function Button({ label }: ButtonProps) {
  return (
    <div className="button">
      <p className="button-text">{label}</p>
    </div>
  );
}
