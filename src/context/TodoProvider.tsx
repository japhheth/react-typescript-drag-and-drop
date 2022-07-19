import React, { ReactNode, useReducer, useState } from "react";
import { TodoContext } from "./TodoContext";
import { TodoReducer } from "./customReducers/TodoReducer";
import { TodoState, EditState, Todo } from "../model";

type ProviderProps = {
  children: ReactNode;
};

const TodoProvider: React.FC<ProviderProps> = ({ children }) => {
  const initialState: TodoState = { todos: [] };
  const [completed, setCompleted] = useState<Todo[]>([]);

  const [state, dispatch] = useReducer(TodoReducer, initialState.todos);

  const addToTodoList = (todo: string) => {
    dispatch({
      type: "ADD_TODO",
      payload: todo,
    });
  };

  const completeTodo = (id: number) =>
    dispatch({
      type: "COMPLETE_TODO",
      payload: id,
    });

  const deleteTodo = (id: number) =>
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });

  const editCurrentTodo = (data: EditState) =>
    dispatch({
      type: "EDIT_TODO",
      payload: data,
    });

  const setCompletedTodo = (todo: Todo[]) => setCompleted(todo);

  return (
    <TodoContext.Provider
      value={{
        todos: state,
        completed,
        setCompletedTodo,
        addToTodoList,
        completeTodo,
        deleteTodo,
        editCurrentTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
