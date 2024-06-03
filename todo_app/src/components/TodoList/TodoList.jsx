import "./TodoList.css";
import Todo from "./Todo";
import { useDataTodo } from "../../context/DataTodo";
import { useTimeInterval } from "../../context/TimeInterval";

function TodoList() {
  const { type, date } = useTimeInterval();
  const { todos } = useDataTodo();

  const extractTodos = () => {
    let startDate = new Date(new Date(date).setHours(0, 0, 0, 0));
    let endDate = new Date(new Date(date).setHours(23, 59, 59, 999));

    if (type === "day") {
    } else if (type === "week") {
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
      endDate.setDate(endDate.getDate() + 6);
      // console.log(startDate,endDate);
    } else if (type === "month") {
      startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      endDate = new Date(
        new Date(date.getFullYear(), date.getMonth() + 1, 0).setHours(
          23,
          59,
          59,
          999
        )
      );
      // console.log(startDate,endDate);
    } else {
      startDate = new Date(date.getFullYear(), 0, 1);
      endDate = new Date(
        new Date(date.getFullYear(), 11, 31).setHours(23, 59, 59, 999)
      );
      // console.log(startDate,endDate);
    }

    return todos.map((todo) => {
      if (todo.date >= startDate && todo.date <= endDate)
        return <Todo key={todo.id} todo={todo} />;
    });
  };

  return <div className="container">{extractTodos()}</div>;
}

export default TodoList;
