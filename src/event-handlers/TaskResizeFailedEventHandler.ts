import { Injectable } from '@nestjs/common';
import { TaskId } from 'src/contexts/tasks/domain/value-object/TaskId';
import TaskFailedUpdater from 'src/contexts/tasks/apps/TaskFailedUpdater';
import { TaskResizeFailedEventPayload } from './event-payloads/TaskResizeFailedEventPayload';

@Injectable()
export default class TaskResizeFailedEventHandler {
  constructor(private readonly taskFailedUpdater: TaskFailedUpdater) {}

  public async handle(event: TaskResizeFailedEventPayload): Promise<void> {
    const taskId = new TaskId(event.id);

    await this.taskFailedUpdater.failed(taskId);
  }
}
