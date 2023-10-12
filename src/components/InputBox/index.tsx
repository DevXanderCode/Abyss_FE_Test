import React, { useState } from "react";
import "./inputBox.css";
import CancelIcon from "../../assets/cancel-yellow.png";
import CheckIcon from "../../assets/check.png";

type InputBoxProp = {
  addCategory: (categoryId: string, category: string) => void;
  deleteCategory: (categoryId: string) => void;
  categoryId: string;
  initialValue: string;
};

const InputBox: React.FC<InputBoxProp> = ({
  addCategory,
  deleteCategory,
  categoryId,
  initialValue,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e?.currentTarget?.value);
  };
  return (
    <div>
      <div className="flex items-center gap-1">
        <input
          value={value}
          onChange={handleTextChange}
          placeholder="Category Name"
        />

        <div
          role="button"
          onClick={() => {
            deleteCategory(categoryId);
          }}
        >
          <img src={CancelIcon} className="icon" />
        </div>
        <div
          className={`${value?.length === 0 ? "disabled-btn" : ""}`}
          role="button"
          onClick={() => {
            addCategory(categoryId, value);
          }}
        >
          <img src={CheckIcon} className="icon" />
        </div>
      </div>
    </div>
  );
};

export default InputBox;
