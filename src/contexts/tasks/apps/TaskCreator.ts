import { Task } from '../domain/Task';
import { TaskStatus } from '../domain/value-object/TaskStatus';
import { Price } from '../domain/Price';
import { PriceCurrency } from '../domain/value-object/PriceCurrency';
import { NumberValueObject } from 'src/shared/NumberValueObject';
import { Path } from 'src/contexts/images/domain/value-objects/Path';
import { TaskId } from '../domain/value-object/TaskId';
import { Inject, Injectable } from '@nestjs/common';
import { Timestamp } from 'src/shared/Timestamp';
import { TaskRepository } from '../domain/TaskRepository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventName } from 'src/event-handlers/events/EventNames';
import ImageCreator from 'src/contexts/images/apps/ImageCreator';

@Injectable()
export default class TaskCreator {
  constructor(
    private readonly imageCreator: ImageCreator,
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async create(imagePath: Path): Promise<Task> {
    const image = await this.imageCreator.create(imagePath);
    const task = new Task(
      TaskId.new(),
      image.getId(),
      [],
      new Price(new NumberValueObject(Math.random() * 100), PriceCurrency.EUR),
      TaskStatus.PENDING,
      Timestamp.now(),
    );

    this.eventEmitter.emit(EventName.TaskCreated, {
      id: task.getId().valueOf(),
      payload: {
        imageId: task.getOriginalImageId().valueOf(),
      },
    });

    await this.taskRepository.insert(task);
    return task;
  }
}
