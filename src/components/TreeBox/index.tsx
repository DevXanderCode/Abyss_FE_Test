import React from "react";
import "./treeBox.css";
import AddIcon from "@/assets/circlePlus.png";
import DeleteIcon from "@/assets/cancel-yellow.png";
import EditIcon from "@/assets/pencilIcon.png";

type TreeBoxProp = {
  categoryId: string;
  text: string;
  deleteCategory: (categoryId: string) => void;
  editCategory: (categoryId: string) => void;
  addCategory: (parentId: string, newText: string) => void;
};

const TreeBox: React.FC<TreeBoxProp> = ({
  categoryId,
  text,
  deleteCategory,
  addCategory,
  editCategory,
}) => {
  return (
    <div className="grid grid-template-2 container">
      <div className="flex items-center justify-center gap-1 box">
        <div className="flex items-center box-cont gap-1">
          <div className="text-cont">
            <p>{text}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center icon-cont">
        <div
          className="icon-btn"
          role="button"
          onClick={() => {
            addCategory(categoryId, "");
          }}
        >
          <img src={AddIcon} alt="add" />
        </div>
        <div
          className="icon-btn"
          role="button"
          onClick={() => {
            editCategory(categoryId);
          }}
        >
          <img src={EditIcon} alt="edit" />
        </div>
        <div
          className="icon-btn"
          role="button"
          onClick={() => {
            deleteCategory(categoryId);
          }}
        >
          <img src={DeleteIcon} alt="delete" />
        </div>
      </div>
    </div>
  );
};

export default TreeBox;
