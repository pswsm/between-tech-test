import { Injectable } from '@nestjs/common';
import { Task } from '../domain/Task';
import { TaskRepository } from '../domain/TaskRepository';
import { TaskId } from '../domain/value-object/TaskId';
import { TaskNotFound } from './errors/TaskNotFound';

@Injectable()
export default class TaskFinder {
  constructor(private readonly repo: TaskRepository) {}

  public async find(taskId: TaskId): Promise<Task> {
    const task = await this.repo.find(taskId);
    if (!task) {
      throw new TaskNotFound(taskId);
    }
    return task;
  }
}
