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

export const GlobalDataSource = new Database(
  process.env.MONGO_URI || 'mongodb+src://user:pass@localhost/',
);
