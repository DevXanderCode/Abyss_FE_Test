export type ITree = {
  id: string;
  text: string;
  edit?: boolean;
  children: ITree[];
};

export type IRenderTree = {
  tree: ITree[];
  createCategory: (parentId: string, newText: string) => void;
  editCategory: (categoryId: string, text: string) => void;
  deleteCategory: (categoryId: string) => void;
  enableEditCategory: (categoryId: string) => void;
};
