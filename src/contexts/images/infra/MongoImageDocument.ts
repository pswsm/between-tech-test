import { ObjectId } from 'mongodb';

export interface MongoImageDocument {
  _id: ObjectId;
  path: string;
  resolution?: number;
  variants?: ObjectId[];
  hash: string;
  createdAt: string;
}
