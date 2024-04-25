import React from "react";

interface DropdownFilterProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  showDropdown: boolean;
  setShowDropdown: (showDropdown: boolean) => void;
  title: string;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  showDropdown,
  setShowDropdown,
  title,
}) => {
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const noneOption = "Selecciona una sala";

  return (
    <div className="relative my-2.5 rounded-lg border border-gray-300 p-2.5">
      <h3 className="mb-2 text-sm font-medium">{title}</h3>
      <div
        onClick={toggleDropdown}
        className="mb-2.5 flex cursor-pointer items-center justify-between rounded border border-gray-200 bg-gray-100 px-2.5 py-1.5"
      >
        {selectedOption || "Selecciona una sala"}
        <span className="cursor-pointer">▼</span>
      </div>
      {showDropdown && (
        <ul className="absolute left-0 z-10 mt-1 max-h-40 w-full overflow-auto rounded border border-gray-200 bg-white">
          <li
            onClick={() => handleSelectOption(noneOption)}
            className="cursor-pointer px-2.5 py-1.5 hover:bg-gray-100"
          >
            Selecciona una sala
          </li>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelectOption(option)}
              className="cursor-pointer px-2.5 py-1.5 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownFilter;
