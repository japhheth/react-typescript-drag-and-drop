export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export interface TodoState {
  todos: Todo[];
}

export interface EditState {
  id: number;
  todo: string;
}

export type IContextProps = {
  todos: Todo[];
  completed: Todo[];
  addToTodoList: (todo: string) => void;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editCurrentTodo: (data: EditState) => void;
  setCompletedTodo: (todo: Todo[]) => void;
};

export type Actions =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "COMPLETE_TODO"; payload: number }
  | { type: "EDIT_TODO"; payload: EditState };
