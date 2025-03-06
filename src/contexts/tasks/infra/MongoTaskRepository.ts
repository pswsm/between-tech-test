import { Task } from '../domain/Task';
import { TaskRepository } from '../domain/TaskRepository';
import { GlobalDataSource } from '../../../shared/MongoClient';
import { ObjectId } from 'mongodb';
import { MongoTaskDocument } from './MongoTaskDocument';
import { TaskId } from '../domain/value-object/TaskId';
import { TaskMapper } from './TaskMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class MongoTaskRepository implements TaskRepository {
  private readonly db = GlobalDataSource;
  private readonly collectionName = 'tasks';

  async find(id: TaskId): Promise<Task | null> {
    const document: MongoTaskDocument | null = await this.db
      .getCollection(this.collectionName)
      .findOne<MongoTaskDocument>({
        _id: new ObjectId(id.valueOf()),
      });

    if (!document) {
      return null;
    }

    return TaskMapper.toDomain(document);
  }

  async insert(task: Task): Promise<void> {
    const doc = TaskMapper.toDocument(task);

    await this.db.getCollection(this.collectionName).insertOne(doc);
  }
}
