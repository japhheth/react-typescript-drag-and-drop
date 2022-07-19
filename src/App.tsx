import React, { useState, useContext } from "react";
import { TodoContext } from "./context/TodoContext";
import InputField from "./components/InputField";
import TaskList from "./components/TaskList";
import type { IContextProps } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";

const App: React.FC = () => {
  const { addToTodoList, todos, completed, setCompletedTodo } = useContext(
    TodoContext
  ) as IContextProps;
  const [todo, setTodo] = useState<string>("");

  const handleAddTodo: React.FormEventHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      addToTodoList(todo);
      setTodo("");
    }
  };

  const handleDrop = (result: DropResult) => {
    const { source, destination } = result;

    if (destination === null) return;

    if (
      source.droppableId === destination?.droppableId &&
      source.index === destination?.index
    )
      return;

    let add,
      active = todos,
      complete = completed;

    if (source.droppableId === "not-completed-todo") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination?.droppableId === "not-completed-todo") {
      active.splice(destination?.index, 0, add);
    } else {
      complete.splice(destination?.index!, 0, add);
    }

    setCompletedTodo(complete);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDrop}>
        <span className="heading">Taskify</span>
        <InputField
          todo={todo}
          setTodo={setTodo}
          handleAddTodo={handleAddTodo}
        />
        <TaskList />
      </DragDropContext>
    </div>
  );
};

export default App;
