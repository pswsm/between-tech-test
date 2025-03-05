import { Logger } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';

export class Database {
  public readonly client: MongoClient;

  constructor(uri: string) {
    this.client = new MongoClient(uri);
  }

  public getCollection(name: string): Collection {
    return this.client.db().collection(name);
  }
}

Logger.log(process.env.MONGO_URI);
export const GlobalDataSource = new Database(
  process.env.MONGO_URI ?? 'mongodb://root:example@localhost:27017/admin',
);
