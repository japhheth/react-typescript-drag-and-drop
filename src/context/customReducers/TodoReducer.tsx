import { Todo, Actions } from "../../model";

export const TodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isDone: false },
      ];
    case "DELETE_TODO":
      return state.filter((todo: Todo) => todo.id !== action.payload);
    case "COMPLETE_TODO":
      return state.map((todo: Todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );
    case "EDIT_TODO":
      return state.map((todo: Todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.todo }
          : todo
      );
    default:
      return state;
  }
};
