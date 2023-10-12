import React from "react";
import "./header.css";
import SendIcon from "@/assets/send.png";
import PlusIcon from "@/assets/plus.png";
import MinusIcon from "@/assets/minus.png";
import DropDown from "../DropDown";

type HeaderProp = {
  centerTree: () => void;
  zoomLevel: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleZoomSelection: (zoom: number) => void;
};

const Header: React.FC<HeaderProp> = ({
  centerTree,
  zoomLevel,
  handleZoomIn,
  handleZoomOut,
  handleZoomSelection,
}) => {
  return (
    <div className="flex justify-between items-center flex-wrap p-10 gap-1 header-cont">
      <div className="">
        <h1 className="text-lg flex gap-1 items-center">
          Services
          <div className="service-count">
            <p className="text-sm">0</p>
          </div>
        </h1>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="list-view-btn" role="button" tabIndex={0}>
          List View
        </div>

        <div
          className="btn flex items-center justify-center"
          role="button"
          onClick={centerTree}
        >
          <img src={SendIcon} width={"20px"} />
        </div>

        <div className="flex gap_02 items-center">
          <div
            className={`btn flex items-center justify-center ${
              zoomLevel < 0.3 ? "disabled-btn" : ""
            }`}
            role="button"
            onClick={handleZoomOut}
          >
            <img src={MinusIcon} width={"20px"} />
          </div>

          <DropDown
            zoomLevel={zoomLevel}
            handleZoomSelection={handleZoomSelection}
          />
          <div
            className={`btn flex items-center justify-center ${
              zoomLevel >= 2 ? "disabled-btn" : ""
            }`}
            role="button"
            onClick={handleZoomIn}
          >
            <img src={PlusIcon} width={"20px"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
