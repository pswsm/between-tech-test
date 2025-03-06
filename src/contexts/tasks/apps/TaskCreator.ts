import { Task } from '../domain/Task';
import { TaskStatus } from '../domain/value-object/TaskStatus';
import { Price } from '../domain/Price';
import { PriceCurrency } from '../domain/value-object/PriceCurrency';
import { NumberValueObject } from 'src/shared/NumberValueObject';
import { Path } from 'src/contexts/images/domain/value-objects/Path';
import { TaskId } from '../domain/value-object/TaskId';
import { Inject, Injectable } from '@nestjs/common';
import ImageCreator from 'src/contexts/images/apps/ImageCreator';
import { Timestamp } from 'src/shared/Timestamp';
import { TaskRepository } from '../domain/TaskRepository';

@Injectable()
export default class TaskCreator {
  constructor(
    private readonly imageCreator: ImageCreator,
    @Inject('TaskRepository') private readonly taskRepository: TaskRepository,
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

    await this.taskRepository.insert(task);
    return task;
  }
}
