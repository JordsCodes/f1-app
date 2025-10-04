import "./Dropdown.css";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type Option = string;

interface DropdownProps {
  label: string;
  placeholder: string;
  options: Option[];
}

interface SelectListProps {
  options: Option[];
}

interface OptionProps {
  option: Option;
}

export default function Dropdown({
  label,
  placeholder,
  options,
}: DropdownProps) {
  const [displaySelectList, setDisplaySelectList] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDisplaySelectList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown">
      <p className="dropdown-label">{label}</p>
      <div
        className={`dropdown-select ${displaySelectList ? "active" : ""}`}
        ref={dropdownRef}
        onClick={() => setDisplaySelectList(!displaySelectList)}
      >
        <p className="dropdown-value">{placeholder}</p>
        <ChevronDown color="#151a30" strokeWidth={1.5} />
      </div>
      {displaySelectList && <SelectList options={options}></SelectList>}
    </div>
  );
}

function SelectList({ options }: SelectListProps) {
  return (
    <div className="dropdown-menu">
      {options.map((o) => (
        <Option option={o} />
      ))}
    </div>
  );
}

function Option({ option }: OptionProps) {
  return <div className="dropdown-option">{option}</div>;
}
