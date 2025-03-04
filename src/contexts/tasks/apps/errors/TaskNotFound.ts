import { TaskId } from '../../domain/value-object/TaskId';

export class TaskNotFound extends Error {
  constructor(id: TaskId) {
    super(`task with id: ${id.valueOf()} not found`);
  }
}
