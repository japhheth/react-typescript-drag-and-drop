import { createContext } from "react";
import { IContextProps } from "../model";

export const TodoContext = createContext<IContextProps | null>(null);
