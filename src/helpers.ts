import { SetStateAction } from "react";
import { TodoValueProps } from "./interfaces";

const addNewItem = (
  newText: string,
  value: TodoValueProps[] | null,
  setValue: React.Dispatch<React.SetStateAction<TodoValueProps[] | null>>,
  setNewText: React.Dispatch<SetStateAction<string>>
) => {
  if (!newText) return;
  const newItem = {
    text: newText,
    isCheck: false,
    date: new Date(),
  };
  if (value) {
    setValue([...value, newItem]);
  } else {
    setValue([newItem]);
  }
  setNewText("");
};
const toggleIsCheckByKey = (
  id: number,
  setValue: (value: React.SetStateAction<TodoValueProps[] | null>) => void
): void => {
  setValue((prevValue) => {
    if (!prevValue) return prevValue;
    const newValue = [...prevValue];
    if (newValue[id]) {
      newValue[id] = {
        ...newValue[id],
        isCheck: !newValue[id].isCheck,
      };
    }
    return newValue;
  });
};

const clearCompleted = (list: TodoValueProps[] | null) => {
  if (!list) return null;
  const updatedList = list.filter((item) => !item.isCheck);
  return updatedList;
};

const countItemsWithFalse = (value: TodoValueProps[] | null): number => {
  if (!value) return 0;
  const count = value.reduce((accumulator, item) => {
    if (!item.isCheck) {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);
  return count;
};
export { addNewItem, toggleIsCheckByKey, clearCompleted, countItemsWithFalse };
