import { PrimitiveOf } from 'src/shared/FromPrimitves';
import { Task } from '../domain/Task';
import { MongoTaskDocument } from './MongoTaskDocument';
import { ObjectId } from 'mongodb';

export class TaskMapper {
  public static toDomain(document: MongoTaskDocument): Task {
    const primitives: PrimitiveOf<Task> = {
      id: document._id.toHexString(),
      images: document.images.map((id) => id.toHexString()),
      price: document.price,
      status: document.status,
      originalImage: document.path,
      createdAt: document.createdAt,
    };

    return Task.fromPrimitives(primitives);
  }

  public static toDocument(task: Task): MongoTaskDocument {
    const primitives = task.toPrimitives();

    return {
      _id: new ObjectId(primitives.id),
      price: primitives.price,
      images: primitives.images.map((id) => new ObjectId(id)),
      status: primitives.status,
      createdAt: primitives.createdAt,
      path: primitives.originalImage,
    };
  }
}
