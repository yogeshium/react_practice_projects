import * as React from "react";
import DateSection from "./DateSection";
import InputField from "./InputField";
import { TodoList } from "./TodoList";
import { DataTodoContextProvider } from "../context/DataTodo";

function Content() {
  const [todos, setTodos] = React.useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => {
      return [
        {
          id: Date.now(),
          title: todo,
          discription: "",
          date: Date.now(),
          isComplete: false,
        },
        ...prev,
      ];
    });
  };

  const updateTodo = (id, newTitle) => {
    // console.log(newTitle)
    setTodos((prev) => {
      return prev.map((todoObj) => {
        if (todoObj.id === id) return { ...todoObj, title: newTitle };
        else return todoObj;
      });
    });
  };



  const deleteTodo = (id) => {
    setTodos((prev) => {
      return prev.filter((todoObj) => {
        return todoObj.id !== id;
      });
    });
  };

  const toggleComplete = (id)=>{
    setTodos((prev)=>{
      return prev.map((todoObj)=>{
          if(todoObj.id===id)
            return {...todoObj, isComplete:!todoObj.isComplete}
          else 
            return todoObj
      })
    })
  }

  React.useEffect(()=>{
      const localTodos=JSON.parse(localStorage.getItem("TodoList"));
      if(localTodos && localTodos.length>0){
          setTodos(localTodos);
      }
  },[])
  React.useEffect(()=>{
      localStorage.setItem("TodoList",JSON.stringify(todos))
  },[todos])


  return (
    <div role="tabpanel">
      <div
      style={{
        display:"flex",
        flexDirection:"column",
        marginTop:"40px",
        marginBottom:"40px",
        alignItems:"center",
        justifyContent:"center",
        padding:"20px",
        gap:"20px"
      }}
       
      >
        <DateSection />

        <DataTodoContextProvider
          value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
        >
          <InputField />
          <TodoList />
        </DataTodoContextProvider>
      </div>
    </div>
  );
}

export default Content;
