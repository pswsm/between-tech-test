import { AggregateRoot } from 'src/shared/AggregateRoot';
import { Price } from './Price';
import { PrimitiveOf } from 'src/shared/FromPrimitves';
import { TaskId } from './value-object/TaskId';
import { TaskStatus } from './value-object/TaskStatus';
import { ImageId } from 'src/contexts/images/domain/value-objects/ImageId';
import { Unit } from './value-object/Units';
import { Timestamp } from 'src/shared/Timestamp';

export class Task extends AggregateRoot {
  public static fromPrimitives(primitives: PrimitiveOf<Task>): Task {
    return new Task(
      new TaskId(primitives.id),
      new ImageId(primitives.originalImage),
      primitives.images.map((id) => new ImageId(id)),
      Price.fromPrimitives(primitives.price),
      new TaskStatus(primitives.status),
      new Timestamp(primitives.createdAt),
    );
  }

  constructor(
    id: TaskId,
    private readonly originalImage: ImageId,
    private readonly images: ImageId[],
    private readonly price: Price,
    private readonly status: TaskStatus,
    private readonly createdAt: Timestamp,
  ) {
    super(id);
  }

  public getOriginalImageId(): ImageId {
    return this.originalImage;
  }

  public getId(): TaskId {
    return this.id;
  }

  public getStatus(): TaskStatus {
    return this.status;
  }

  public getPriceUnit(): Unit {
    return this.price.getUnits();
  }

  public getImageIds(): ImageId[] {
    return this.images;
  }

  public toPrimitives() {
    return {
      id: this.id.valueOf(),
      originalImage: this.originalImage.valueOf(),
      images: this.images.map((id) => id.valueOf()),
      price: this.price.toPrimitives(),
      status: this.status.valueOf(),
      createdAt: this.createdAt.valueOf(),
    };
  }
}
