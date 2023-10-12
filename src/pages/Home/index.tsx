import React, { useState, useCallback, MouseEvent } from "react";
import "./Home.css";
import { Header } from "@/components";
import type { ITree } from "@/types";
import renderTree from "@/layout/renderTree";

const Home: React.FC = () => {
  const [position, setPosition] = useState<{ x: string | number; y: number }>({
    x: "50%",
    y: 60,
  });

  const [treeData, setTreeData] = useState<ITree[]>([
    { id: "1", text: "Category", children: [] },
  ]);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleDrag = (e: MouseEvent) => {
    setPosition({ x: e?.clientX, y: e?.clientY });
  };

  const centerTree = () => {
    setPosition({ x: "40%", y: 60 });
  };

  const handleZoomIn = () => {
    zoomLevel < 2 && setZoomLevel((prevZoomLevel) => (prevZoomLevel += 0.1));
  };

  const handleZoomOut = () => {
    zoomLevel > 0.3 && setZoomLevel((prevZoomLevel) => (prevZoomLevel -= 0.1));
  };

  const handleZoomSelection: (zoom: number) => void = (zoom) => {
    setZoomLevel(zoom);
  };

  const createCategory: (parentId: string, newText: string) => void =
    useCallback((parentId, newText) => {
      let addedCategory = false;
      setTreeData((prevData) => {
        const newData = [...prevData];

        const addChildToParent: (parent: ITree) => void = (parent) => {
          if (addedCategory) return;
          if (parent.id === parentId) {
            parent.children.push({
              id: `${Math.random()}`,
              text: newText,
              children: [],
            });
            addedCategory = true;
          } else if (parent.children) {
            parent.children.forEach(addChildToParent);
          }
        };
        newData.forEach(addChildToParent);
        return newData;
      });
    }, []);

  const editCategory = (categoryId: string, newText: string) => {
    setTreeData((prevData) => {
      const newData = [...prevData];
      const editText = (category: ITree) => {
        if (category.id === categoryId) {
          category.text = newText;
          category.edit = false;
        } else if (category.children) {
          category.children.forEach(editText);
        }
      };
      newData.forEach(editText);
      return newData;
    });
  };

  const enableEditCategory = (categoryId: string) => {
    setTreeData((prevData) => {
      const newData = [...prevData];
      const editText = (category: ITree) => {
        if (category.id === categoryId) {
          category.edit = true;
        } else if (category.children) {
          category.children.forEach(editText);
        }
      };
      newData.forEach(editText);
      return newData;
    });
  };

  const deleteCategory = (categoryId: string) => {
    setTreeData((prevData) => {
      const deleteRecursive = (items: ITree[]) => {
        for (let i = 0; i < items.length; i++) {
          if (items[i].id === categoryId) {
            items.splice(i, 1);
            return;
          } else if (items[i].children) {
            deleteRecursive(items[i].children);
          }
        }
      };

      const newData = [...prevData];
      deleteRecursive(newData);

      return newData;
    });
  };

  return (
    <div className="main-container">
      <Header
        centerTree={centerTree}
        zoomLevel={zoomLevel}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        handleZoomSelection={handleZoomSelection}
      />
      <div
        className="flex items-center justify-center"
        style={{ position: "relative" }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrag={handleDrag}
      >
        <div
          style={{
            position: "absolute",
            left: `${
              typeof position?.x === "string" ? position?.x : `${position.x}px`
            }`,
            top: `${position.y}px`,
            width: "max-content",
            transform: `scale(${zoomLevel})`,
          }}
        >
          <div className="tree">
            {renderTree(
              treeData,
              createCategory,
              editCategory,
              deleteCategory,
              enableEditCategory
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
