import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import CheckIcon from '@mui/icons-material/Check';
import "./TodoList.css";
import { useState } from "react";
import { useDataTodo } from "../../context/DataTodo";

function Todo({ todo }) {
  const [isTodoReadOnly, setIsTodoReadOnly] = useState(true);
  const [isTodoComplete, setIsTodoComplete] = useState(todo.isComplete);
  const [todoTitle, setTodoTitle]=useState(todo.title);
  const {updateTodo,deleteTodo,toggleComplete} = useDataTodo();

  const editTodo = ()=>{
    setIsTodoReadOnly((prev)=>!prev)
    updateTodo(todo.id,todoTitle);
  }

  const removeTodo = ()=>{
    deleteTodo(todo.id);
  }

  const toggleCheckbox = ()=>{
    setIsTodoComplete((prev)=>!prev);
    toggleComplete(todo.id);
  }
  return (
    <div className="todo">
      <div className="main_title">
        <div className="checkbox">
          <input 
            type="checkbox" 
            checked={isTodoComplete}
            onChange={toggleCheckbox}
          />
        </div>

        <input
          type="text"
          className="title"
          style={{
            border: "none",
            outline: "none",
            textDecoration: isTodoComplete?"line-through":"none",
          }}
          readOnly={isTodoReadOnly}
          value={todoTitle}
          onChange={(e)=>{
            setTodoTitle(e.target.value)
          }}
        />

        <div className="icons">
          <span
            style={{
              display:isTodoComplete?"none":"block"
            }}
            onClick={(e)=>{
              if(isTodoReadOnly)
                setIsTodoReadOnly((prev)=>!prev)
              else
                editTodo()
            }}
          >
            {isTodoReadOnly?<EditIcon />:<CheckIcon/>}
          </span>
          <span
            style={{
              display:isTodoReadOnly?"block":"none"
            }}
            onClick={(e)=>{removeTodo()}}
          >
            <DeleteIcon />
          </span>
        </div>
      </div>

      <div className="description" id="description">
        {todo.description}
      </div>
    </div>
  );
}
export default Todo;
