import { ReactElement } from "react";
import { TreeBox, InputBox } from "@/components";
import type { ITree } from "@/types";
import CirclePlus from "@/assets/circlePlus.png";

const renderTree: (
  tree: ITree[],
  createCategory: (parentId: string, newText: string) => void,
  editCategory: (categoryId: string, text: string) => void,
  deleteCategory: (categoryId: string) => void,
  enableEditCategory: (categoryId: string) => void
) => ReactElement = (
  tree,
  createCategory,
  editCategory,
  deleteCategory,
  enableEditCategory
) => (
  <ul>
    {tree.map((item: ITree) => {
      return (
        <li key={item.text + item.id}>
          {item?.id === "1" ? (
            <div draggable={"true"} className={`root-node`}>
              <div className="draggable-root text">
                <p>{item?.text}</p>
              </div>
              <div
                role="button"
                onClick={() => {
                  createCategory(item?.id, "");
                }}
              >
                <img src={CirclePlus} className="circlePlusICon" />
              </div>
            </div>
          ) : item?.text === "" || item?.edit ? (
            <InputBox
              categoryId={item?.id}
              addCategory={editCategory}
              deleteCategory={deleteCategory}
              initialValue={item?.text}
            />
          ) : (
            <TreeBox
              text={item?.text}
              addCategory={createCategory}
              categoryId={item?.id}
              deleteCategory={deleteCategory}
              editCategory={enableEditCategory}
            />
          )}
          {item.children && item.children.length
            ? renderTree(
                item.children,
                createCategory,
                editCategory,
                deleteCategory,
                enableEditCategory
              )
            : ""}
        </li>
      );
    })}
  </ul>
);

export default renderTree;
