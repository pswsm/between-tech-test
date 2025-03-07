import { Injectable } from '@nestjs/common';
import { TaskResizedEventPayload } from './event-payloads/TaskResizedEventPayload';
import { TaskId } from 'src/contexts/tasks/domain/value-object/TaskId';
import { ImageId } from 'src/contexts/images/domain/value-objects/ImageId';
import TaskCompletedUpdater from 'src/contexts/tasks/apps/TaskComepletedUpdater';

@Injectable()
export default class TaskImagesResizedEventHandler {
  constructor(private readonly taskCompletedUpdater: TaskCompletedUpdater) {}

  public async handle(event: TaskResizedEventPayload): Promise<void> {
    const imageIds = event.payload.imageIds.map((id) => new ImageId(id));
    const taskId = new TaskId(event.id);

    await this.taskCompletedUpdater.complete(taskId, imageIds);
  }
}
