import { Task } from '../domain/Task';
import { TaskStatus } from '../domain/value-object/TaskStatus';
import { Price } from '../domain/Price';
import { PriceCurrency } from '../domain/value-object/PriceCurrency';
import { NumberValueObject } from 'src/shared/NumberValueObject';
import { Path } from 'src/contexts/images/domain/value-objects/Path';
import { TaskId } from '../domain/value-object/TaskId';
import { Injectable } from '@nestjs/common';
import ImageCreator from 'src/contexts/images/apps/ImageCreator';
import { Timestamp } from 'src/shared/Timestamp';

@Injectable()
export default class TaskCreator {
  public static create(taskStatus: TaskStatus, imagePath: Path): Task {
    const image = ImageCreator.create(imagePath);
    const task = new Task(
      TaskId.new(),
      image.getId(),
      [],
      new Price(new NumberValueObject(Math.random() * 100), PriceCurrency.EUR),
      TaskStatus.PENDING,
      Timestamp.now(),
    );
    return task;
  }
}
