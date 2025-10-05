import "./Dropdown.css";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";

type OptionLabel = { label: string };

interface DropdownProps<T extends OptionLabel> {
  label: string;
  placeholder: string;
  options: T[];
  value?: T;
  onSelect: (option: T) => void;
}

interface SelectListProps<T> {
  options: T[];
  onSelect: (option: T) => void;
  displaySelectList: boolean;
  setDisplaySelectList: Dispatch<SetStateAction<boolean>>;
}

interface OptionProps<T> {
  option: T;
  onSelect: (option: T) => void;
  displaySelectList: boolean;
  setDisplaySelectList: Dispatch<SetStateAction<boolean>>;
}

export default function Dropdown<T extends OptionLabel>({
  label,
  placeholder,
  options,
  value,
  onSelect,
}: DropdownProps<T>) {
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
      <div ref={dropdownRef}>
        <div
          className={`dropdown-select ${displaySelectList ? "active" : ""}`}
          onClick={() => {
            setDisplaySelectList(!displaySelectList);
          }}
        >
          <p className="dropdown-value">{value?.label || placeholder}</p>
          <ChevronDown color="#151a30" strokeWidth={1.5} />
        </div>
        {displaySelectList && (
          <SelectList
            options={options || []}
            onSelect={onSelect}
            displaySelectList={displaySelectList}
            setDisplaySelectList={setDisplaySelectList}
          ></SelectList>
        )}
      </div>
    </div>
  );
}

function SelectList<T extends OptionLabel>({
  options,
  onSelect,
  displaySelectList,
  setDisplaySelectList,
}: SelectListProps<T>) {
  return (
    <div className="dropdown-menu">
      {options.map((o) => (
        <Option
          option={o}
          onSelect={onSelect}
          displaySelectList={displaySelectList}
          setDisplaySelectList={setDisplaySelectList}
        />
      ))}
    </div>
  );
}

function Option<T extends OptionLabel>({
  option,
  onSelect,
  displaySelectList,
  setDisplaySelectList,
}: OptionProps<T>) {
  return (
    <div
      className="dropdown-option"
      onClick={() => {
        onSelect(option);
        setDisplaySelectList(!displaySelectList);
      }}
    >
      {option.label}
    </div>
  );
}
