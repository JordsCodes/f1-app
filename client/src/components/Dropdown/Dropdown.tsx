import "./Dropdown.css";
import { ChevronDown } from "lucide-react";
import {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type OptionLabel = {
  render?: (args: unknown) => ReactNode;
  label: string;
};

interface DropdownProps<T extends OptionLabel> {
  label: string;
  placeholder: string;
  options: T[] | undefined;
  value?: T;
  onSelect: (option: T) => void;
  disabled: boolean;
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
  disabled,
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
          className={`dropdown-select ${displaySelectList ? "active" : ""} ${
            disabled ? "disabled" : ""
          }`}
          onClick={() => {
            setDisplaySelectList(!displaySelectList);
          }}
        >
          <p className="dropdown-value">{value?.label || placeholder}</p>{" "}
          <ChevronDown strokeWidth={1} />
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
        setDisplaySelectList(!displaySelectList);
        onSelect(option);
      }}
    >
      {option.render ? option.render(option) : option.label}
    </div>
  );
}
