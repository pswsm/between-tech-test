import { AggregateRoot } from 'src/shared/AggregateRoot';
import { Image } from './Image';
import { Price } from './Price';
import { StringValueObject } from 'src/shared/StringValueObject';
import { PrimitiveOf } from 'src/shared/FromPrimitves';
import { TaskId } from './value-object/TaskId';

export class Task extends AggregateRoot {
  public static fromPrimitives(primitives: PrimitiveOf<Task>): Task {
    return new Task(
      new StringValueObject(primitives.id),
      Image.fromPrimitives(primitives.image),
      Price.fromPrimitives(primitives.price),
    );
  }
  constructor(
    id: TaskId,
    private readonly image: Image,
    private readonly price: Price,
  ) {
    super(id);
  }

  public toPrimitives() {
    return {
      id: this.id.valueOf(),
      image: this.image.toPrimitives(),
      price: this.price.toPrimitives(),
    };
  }
}
