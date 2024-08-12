import "../styles/todo-list.css";
import { toggleIsCheckByKey } from "../helpers";
import { TodoListProps, TodoValueProps } from "../interfaces";
import { TodoListItem } from "../components/todo-list-item";

export const TodoList = (props: TodoListProps) => {
  return (
    <div
      className={`
      ${props.isShow ? "TodoListShow" : "TodoListHide"} TodoList`}
    >
      {props.value && Array.isArray(props.value) && props.value.length !== 0 ? (
        props.value.map((v: TodoValueProps, i: number) =>
          props.filter === "All" ? (
            <TodoListItem
              id={i}
              toggleIsCheckByKey={() => toggleIsCheckByKey(i, props.setValue)}
              value={v}
              key={i}
              iconTodoListItem={props.iconTodoListItem}
            />
          ) : (props.filter === "Active" || props.filter === "Clear") &&
            !v.isCheck ? (
            <TodoListItem
              id={i}
              toggleIsCheckByKey={() => toggleIsCheckByKey(i, props.setValue)}
              value={v}
              key={i}
              iconTodoListItem={props.iconTodoListItem}
            />
          ) : props.filter === "Completed" && v.isCheck ? (
            <TodoListItem
              id={i}
              toggleIsCheckByKey={() => toggleIsCheckByKey(i, props.setValue)}
              value={v}
              key={i}
              iconTodoListItem={props.iconTodoListItem}
            />
          ) : null
        )
      ) : (
        <div className="TodoListNoValue">No Reminders</div>
      )}
    </div>
  );
};
