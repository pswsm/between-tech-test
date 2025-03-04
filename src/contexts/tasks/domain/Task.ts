import { AggregateRoot } from 'src/shared/AggregateRoot';
import { Image } from './Image';
import { Price } from './Price';
import { StringValueObject } from 'src/shared/StringValueObject';
import { PrimitiveOf } from 'src/shared/FromPrimitves';
import { Id } from './value-object/Id';
import { TaskStatus } from './value-object/TaskStatus';

export class Task extends AggregateRoot {
  public static fromPrimitives(primitives: PrimitiveOf<Task>): Task {
    return new Task(
      new StringValueObject(primitives.id),
      Image.fromPrimitives(primitives.image),
      Price.fromPrimitives(primitives.price),
      new TaskStatus(primitives.status),
    );
  }

  constructor(
    id: Id,
    private readonly image: Image,
    private readonly price: Price,
    private readonly status: TaskStatus,
  ) {
    super(id);
  }

  public toPrimitives() {
    return {
      id: this.id.valueOf(),
      image: this.image.toPrimitives(),
      price: this.price.toPrimitives(),
      status: this.status.valueOf(),
    };
  }
}
