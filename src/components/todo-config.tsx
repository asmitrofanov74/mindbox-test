import { TodoConfigProps } from "../interfaces";
import { countItemsWithFalse, clearCompleted } from "../helpers";
import "../styles/todo-config.css";

export const TodoConfig = (props: TodoConfigProps) => {
  const { value, filter, setValue, setFilter } = props;
  const changeSetFilter = (
    filter: "All" | "Active" | "Completed" | "Clear"
  ) => {
    if (setFilter) setFilter(filter);
  };

  const handleClickClearCompleted = () => {
    changeSetFilter("Clear");
    setValue(clearCompleted(value));
  };
  return (
    <div className="TodoConfig">
      <div className="TodoConfigListLength">
        {countItemsWithFalse(props.value)} items left
      </div>
      <div className="TodoConfigListType">
        <div
          onClick={() => changeSetFilter("All")}
          className={`${filter === "All" ? "TodoConfigListTypeItemActive" : ""}
              TodoConfigListTypeItem`}
        >
          All
        </div>
        <div
          onClick={() => changeSetFilter("Active")}
          className={`${
            filter === "Active" ? "TodoConfigListTypeItemActive" : ""
          }
              TodoConfigListTypeItem`}
        >
          Active
        </div>
        <div
          onClick={() => changeSetFilter("Completed")}
          className={`${
            filter === "Completed" ? "TodoConfigListTypeItemActive" : ""
          }
              TodoConfigListTypeItem`}
        >
          Completed
        </div>
      </div>
      <div
        className={`${filter === "Clear" ? "TodoConfigListTypeItemActive" : ""}
              TodoConfigListTypeItem`}
        onClick={handleClickClearCompleted}
      >
        Clear completed
      </div>
    </div>
  );
};
