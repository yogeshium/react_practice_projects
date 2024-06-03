import {useState} from "react";
import { useDataTodo } from "../context/DataTodo";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import { useTimeInterval } from "../context/TimeInterval";

function InputField() {
  const {date,todayDate} = useTimeInterval();
  const [newTodo, setNewTodo]= useState("");
  const {addTodo} = useDataTodo();

  const add = (e)=>{
    e.preventDefault();
    if(newTodo.length>0)
      addTodo(newTodo);
    setNewTodo("");
  }

  return (
    <form onSubmit={add}
      style={{
        display: "flex",
        alignItems: "center",
        width: "450px",
        padding: "2px 4px",
        backgroundColor: "rgb(52 58 64)",
        margin: "40px 0px 10px 0px",
        borderRadius: "5px",
      }}
    >
      <input
        type="text"
        style={{
          marginLeft: 1,
          flex: 1,
          border: "none",
          outline: "none",
          backgroundColor: "rgb(52 58 64)",
        }}
        placeholder="Add a Task..."
        value={newTodo}
        onChange={(e)=>setNewTodo(e.target.value)}
        disabled={date<todayDate?true:false}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <button
        type="submit"
        style={{
          padding: "10px",
          cursor: date<todayDate ? 'auto' : 'pointer',
          backgroundColor: "rgb(52 58 64)",
          border: "none",
          outline: "none",
          
        }}
        disabled={date<todayDate}
      >
        <AddIcon />
      </button>
    </form>
  );
}
export default InputField;
