import React, { useState } from "react";
import "./dropDown.css";

type DropDownProps = {
  zoomLevel: number;
  handleZoomSelection: (zoomLevel: number) => void;
};

const DropDown: React.FC<DropDownProps> = ({
  zoomLevel,
  handleZoomSelection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.5, 1.9, 2.0];

  const toggleDropDown = () => {
    setIsOpen((openState) => !openState);
  };

  const selectOption = (option: number) => {
    handleZoomSelection(option);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="percent-count mb-5" onClick={toggleDropDown}>
        <p className="text-md">{Math.round(zoomLevel * 100)}%</p>
      </div>

      <div className={`list-cont ${isOpen ? "open-option" : ""}`}>
        {options?.map((option, idx) => (
          <div
            className={`grid grid-template-2 gap-1 mb-2 option ${
              option === zoomLevel ? "active-option" : ""
            }`}
            key={`options-${option}-${idx}`}
            role="button"
            onClick={() => selectOption(option)}
          >
            <p className="text-sm"> {Math.round(option * 100)} %</p>
            {option === zoomLevel && <p className="bold">✓</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
