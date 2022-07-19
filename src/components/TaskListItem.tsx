import React, { useState, useRef, useEffect, useContext } from "react";
import { Todo, IContextProps } from "../model";
import { TodoContext } from "../context/TodoContext";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface TaskListItemProps {
  todoItem: Todo;
  index: number;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ todoItem, index }) => {
  const { completeTodo, deleteTodo, editCurrentTodo } = useContext(
    TodoContext
  ) as IContextProps;

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todoItem.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const todoDoneHander = (id: number) => {
    completeTodo(id);
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
  };

  const handleEditTodo = (isDone: boolean) => {
    if (!edit && !isDone) setEdit(!edit);
  };

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setEdit(!edit);
    editCurrentTodo({ id, todo: editTodo });
  };

  return (
    <Draggable draggableId={todoItem.id.toString()} index={index}>
      {(provided) => (
        <form
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="todos__single"
          onSubmit={(e) => handleSubmit(e, todoItem.id)}
        >
          {edit ? (
            <input
              ref={inputRef}
              type="text"
              value={editTodo}
              className="todos__single--text"
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todoItem.isDone ? (
            <s className="todos__single--text">{todoItem.todo}</s>
          ) : (
            <span className="todos__single--text">{todoItem.todo}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => handleEditTodo(todoItem.isDone)}
            >
              <AiFillEdit />
            </span>
            <span
              className="icon"
              onClick={() => handleDeleteTodo(todoItem.id)}
            >
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => todoDoneHander(todoItem.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TaskListItem;
