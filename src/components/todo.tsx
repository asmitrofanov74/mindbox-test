import { useState } from "react";

import { TodoConfig } from "../components/todo-config";
import { TodoNew } from "../components/todo-new";
import { TodoList } from "../components/todo-list";

import "../styles/todo.css";
import {
  TodoValueStateProps,
  TodoValueProps,
  TodoFilterStatePropsFilter,
} from "../interfaces";

interface TodoProps extends TodoValueStateProps {
  defaultValue?: TodoValueProps[];
  className?: string;
  placeholder?: string;
  iconTodoNew?: React.ReactNode;
  iconTodoListItem?: React.ReactNode;
}

export const Todo = (props: TodoProps) => {
  const [isShow, isSetShow] = useState<boolean>(true);
  const [filter, setFilter] = useState<TodoFilterStatePropsFilter>("All");
  return (
    <div className={props.className ? props.className + " Todo" : "Todo"}>
      <TodoNew
        isShow={isShow}
        isSetShow={isSetShow}
        value={props.value}
        setValue={props.setValue}
      />
      <div className="TodoListContainer">
        <TodoList
          filter={filter}
          isShow={isShow}
          value={props.value}
          setValue={props.setValue}
          iconTodoListItem={props.iconTodoListItem}
        />
      </div>

      <TodoConfig
        filter={filter}
        setFilter={setFilter}
        value={props.value}
        setValue={props.setValue}
      />
    </div>
  );
};
