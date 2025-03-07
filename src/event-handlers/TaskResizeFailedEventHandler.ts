import { Injectable, Logger } from '@nestjs/common';
import { TaskId } from 'src/contexts/tasks/domain/value-object/TaskId';
import TaskFailedUpdater from 'src/contexts/tasks/apps/TaskFailedUpdater';
import { TaskResizeFailedEventPayload } from './event-payloads/TaskResizeFailedEventPayload';
import { OnEvent } from '@nestjs/event-emitter';
import { EventName } from './events/EventNames';

@Injectable()
export default class TaskResizeFailedEventHandler {
  private readonly logger = new Logger(TaskResizeFailedEventHandler.name);

  constructor(private readonly taskFailedUpdater: TaskFailedUpdater) {}

  @OnEvent(EventName.TaskResizeFailed)
  public async handle(event: TaskResizeFailedEventPayload): Promise<void> {
    try {
      const taskId = new TaskId(event.id);

      await this.taskFailedUpdater.failed(taskId);
    } catch (e: unknown) {
      this.logger.error((e as Error).message);
    }
  }
}
