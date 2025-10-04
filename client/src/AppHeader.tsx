import "./AppHeader.css";
import { FaFlagCheckered } from "react-icons/fa";

interface HeaderProps {
  header: string;
}

export default function Header({ header }: HeaderProps) {
  return (
    <div className="header-container">
      <h1 className="header-text">{header}</h1>
      <div className="header-icon">
        <FaFlagCheckered color="#151a30" size={36} />
      </div>
    </div>
  );
}
