import { ImageId } from '@app/contexts/images/domain/value-objects/ImageId';
import { Price } from '@app/contexts/tasks/domain/Price';
import { Task } from '@app/contexts/tasks/domain/Task';
import { TaskId } from '@app/contexts/tasks/domain/value-object/TaskId';
import { TaskStatus } from '@app/contexts/tasks/domain/value-object/TaskStatus';
import { Timestamp } from '@app/shared/Timestamp';

export class TaskMother {
  public id: TaskId = new TaskId('task-id');
  public originalImage: ImageId = new ImageId('original-image-id');
  public images: ImageId[] = [
    new ImageId('image-id-1'),
    new ImageId('image-id-2'),
  ];
  public price: Price = Price.fromPrimitives({
    units: 100,
    currency: 'EUR',
  });
  public status: TaskStatus = TaskStatus.PENDING;
  public createdAt: Timestamp = Timestamp.now();

  withId(id: TaskId): TaskMother {
    this.id = id;
    return this;
  }

  withOriginalImage(originalImage: ImageId): TaskMother {
    this.originalImage = originalImage;
    return this;
  }

  withImages(images: ImageId[]): TaskMother {
    this.images = images;
    return this;
  }

  withPrice(price: Price): TaskMother {
    this.price = price;
    return this;
  }

  withStatus(status: TaskStatus): TaskMother {
    this.status = status;
    return this;
  }

  withCreatedAt(createdAt: Timestamp): TaskMother {
    this.createdAt = createdAt;
    return this;
  }

  build(): Task {
    return new Task(
      this.id,
      this.originalImage,
      this.images,
      this.price,
      this.status,
      this.createdAt,
    );
  }
}
