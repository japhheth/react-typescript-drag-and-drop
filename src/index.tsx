import React from "react";
import TodoProvider from "./context/TodoProvider";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <TodoProvider>
    <App />
  </TodoProvider>
);
