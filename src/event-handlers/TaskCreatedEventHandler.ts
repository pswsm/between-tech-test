import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EventName } from 'src/event-handlers/events/EventNames';
import { TaskCreatedEvent } from './event-payloads/TaskCreatedEventPayload';
import { Injectable, Logger } from '@nestjs/common';
import ImageResizer from 'src/contexts/images/apps/ImageResizer';
import { Resolution } from 'src/contexts/images/domain/value-objects/Resolution';
import { ImageId } from 'src/contexts/images/domain/value-objects/ImageId';
import ImageFinder from 'src/contexts/images/apps/ImageFinder';
import { Image } from 'src/contexts/images/domain/Image';

@Injectable()
export default class TaskCreatedEventHandler {
  private readonly logger = new Logger(TaskCreatedEventHandler.name);

  constructor(
    private readonly imageResizer: ImageResizer,
    private readonly imageFinder: ImageFinder,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent(EventName.TaskCreated)
  async handle(event: TaskCreatedEvent): Promise<void> {
    const imageId: ImageId = new ImageId(event.payload.imageId);
    try {
      const image: Image = await this.imageFinder.get(imageId);
      const px800ImageId = await this.imageResizer.resizeTo(
        image,
        Resolution.px800,
      );
      const px1024ImageId = await this.imageResizer.resizeTo(
        image,
        Resolution.px1024,
      );

      this.eventEmitter.emit(EventName.TaskImagesResized, {
        id: event.id,
        payload: {
          imageIds: [px800ImageId.valueOf(), px1024ImageId.valueOf()],
        },
      });
    } catch (e: unknown) {
      this.eventEmitter.emit(EventName.TaskResizeFailed, { id: event.id });
      this.logger.error((e as Error).message);
    }
  }
}
