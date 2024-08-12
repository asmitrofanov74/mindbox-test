import "../styles/todo-list-item.css";

import { TodoListPropsItem } from "../interfaces";

export const TodoListItem = (props: TodoListPropsItem) => {
  const ICON_LIST_ITEM = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="TodoListItem__Icon__El"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11ZM22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18Z"
      fill="#ffffff"
    >
      <path
        className="TodoListItem__Icon__El__True"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"
        fill="#005ce6"
      />
      <circle
        className="TodoListItem__Icon__El__False"
        cx="11"
        cy="11"
        r="10"
        stroke="#005ce6"
        strokeWidth="2"
      />
    </svg>
  );

  return (
    <div
      data-testid="TodoListItem"
      className={
        props.value.isCheck
          ? "TodoListItem--active TodoListItem"
          : "TodoListItem"
      }
    >
      <div
        className="TodoListItem__Icon"
        onClick={() => props.toggleIsCheckByKey(props.id)}
      >
        {props.iconTodoListItem ? props.iconTodoListItem : ICON_LIST_ITEM}
      </div>
      <div className="TodoListItem__Text">{props.value.text}</div>
    </div>
  );
};
