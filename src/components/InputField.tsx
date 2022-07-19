import React, { useRef } from "react";
import "./styles.css";

interface InputFieldProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: (e: React.FormEvent) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  todo,
  setTodo,
  handleAddTodo,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    handleAddTodo(e);
    inputRef.current?.blur();
  };

  return (
    <form className="input" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="input__box"
        type="input"
        placeholder="Enter a Task"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
