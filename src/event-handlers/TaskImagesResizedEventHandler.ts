import { Injectable, Logger } from '@nestjs/common';
import { TaskResizedEventPayload } from './event-payloads/TaskResizedEventPayload';
import { TaskId } from 'src/contexts/tasks/domain/value-object/TaskId';
import { ImageId } from 'src/contexts/images/domain/value-objects/ImageId';
import TaskCompletedUpdater from 'src/contexts/tasks/apps/TaskComepletedUpdater';
import { OnEvent } from '@nestjs/event-emitter';
import { EventName } from './events/EventNames';

@Injectable()
export default class TaskImagesResizedEventHandler {
  private readonly logger = new Logger(TaskImagesResizedEventHandler.name);

  constructor(private readonly taskCompletedUpdater: TaskCompletedUpdater) {}

  @OnEvent(EventName.TaskImagesResized)
  public async handle(event: TaskResizedEventPayload): Promise<void> {
    try {
      const imageIds = event.payload.imageIds.map((id) => new ImageId(id));
      const taskId = new TaskId(event.id);

      await this.taskCompletedUpdater.complete(taskId, imageIds);
    } catch (e: unknown) {
      this.logger.error((e as Error).message);
    }
  }
}
