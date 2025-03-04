import { Task } from './Task';
import { TaskId } from './value-object/TaskId';

export interface TaskFinder {
  find(id: TaskId): Task;
}
