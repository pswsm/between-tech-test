import { Task } from './Task';

export interface TaskSaver {
  persist(task: Task): void;
}
