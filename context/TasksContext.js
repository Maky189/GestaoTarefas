import { createContext, useContext } from 'react';

export const TasksContext = createContext(null);

export function useTasks() {
  return useContext(TasksContext);
}
