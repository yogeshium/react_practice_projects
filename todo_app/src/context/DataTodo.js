import { createContext, useContext } from "react";

const dataTodoContext = createContext({
  todos: [
    {
      id: Date.now(),
      title: "Mansi",
      discription: "",
      date: Date.now(),
      isComplete: false,
    }
  ],
  addTodo: (todo) => {},
  updateTodo: (id,title) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id)=>{}
});

export const DataTodoContextProvider = dataTodoContext.Provider;
export const useDataTodo = () => useContext(dataTodoContext);