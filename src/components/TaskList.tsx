import React, { useContext } from "react";
import { IContextProps, Todo } from "../model";
import TaskListItem from "./TaskListItem";
import "./styles.css";
import { TodoContext } from "../context/TodoContext";
import { Droppable } from "react-beautiful-dnd";

const TaskList: React.FC = () => {
  const { todos, completed } = useContext(TodoContext) as IContextProps;

  return (
    <div className="container">
      <Droppable droppableId="not-completed-todo">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.length > 0 &&
              todos.map((item: Todo, index: number) => (
                <TaskListItem index={index} key={index} todoItem={item} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="completed-todo">
        {(provided, snapshot) => (
          <div
            className={`todos remove  ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completed.length > 0 &&
              completed.map((item: Todo, index: number) => (
                <TaskListItem index={index} key={index} todoItem={item} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
