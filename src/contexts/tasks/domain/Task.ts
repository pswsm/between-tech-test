import { AggregateRoot } from 'src/shared/AggregateRoot';
import { Price } from './Price';
import { StringValueObject } from 'src/shared/StringValueObject';
import { PrimitiveOf } from 'src/shared/FromPrimitves';
import { TaskId } from './value-object/TaskId';
import { TaskStatus } from './value-object/TaskStatus';
import { ImageId } from 'src/contexts/images/domain/value-objects/ImageId';

export class Task extends AggregateRoot {
  public static fromPrimitives(primitives: PrimitiveOf<Task>): Task {
    return new Task(
      new StringValueObject(primitives.id),
      primitives.images.map((id) => new ImageId(id)),
      Price.fromPrimitives(primitives.price),
      new TaskStatus(primitives.status),
    );
  }

  constructor(
    id: TaskId,
    private readonly images: ImageId[],
    private readonly price: Price,
    private readonly status: TaskStatus,
  ) {
    super(id);
  }

  public toPrimitives() {
    return {
      id: this.id.valueOf(),
      images: this.images.map((id) => id.valueOf()),
      price: this.price.toPrimitives(),
      status: this.status.valueOf(),
    };
  }
}
