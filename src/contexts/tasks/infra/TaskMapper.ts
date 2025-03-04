import { PrimitiveOf } from 'src/shared/FromPrimitves';
import { Task } from '../domain/Task';
import { MongoTaskDocument } from './MongoTaskDocument';

export class TaskMapper {
  public static toDomain(document: MongoTaskDocument): Task {
    const primitives: PrimitiveOf<Task> = {
      id: document._id.toHexString(),
      images: document.images.map((id) => id.toHexString()),
      price: document.price,
      status: document.status,
    };

    return Task.fromPrimitives(primitives);
  }
}
