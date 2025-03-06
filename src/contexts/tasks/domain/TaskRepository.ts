import { Task } from './Task';
import { TaskId } from './value-object/TaskId';

export interface TaskRepository {
  find(id: TaskId): Promise<Task | null>;
  insert(task: Task): Promise<void>;
}
