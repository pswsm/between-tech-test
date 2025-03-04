import { Task } from '../domain/Task';
import { Path } from '../domain/value-object/Path';
import { TaskStatus } from '../domain/value-object/TaskStatus';
import { Id } from '../domain/value-object/Id';
import { ImageCreator } from './ImageCreator';
import { Price } from '../domain/Price';
import { PriceCurrency } from '../domain/value-object/PriceCurrency';
import { NumberValueObject } from 'src/shared/NumberValueObject';

export class TaskCreator {
  public static create(taskStatus: TaskStatus, imagePath: Path): Task {
    const image = ImageCreator.create(imagePath);
    const task = new Task(
      Id.new(),
      image,
      new Price(new NumberValueObject(Math.random() * 100), PriceCurrency.EUR),
      TaskStatus.PENDING,
    );
    return task;
  }
}
