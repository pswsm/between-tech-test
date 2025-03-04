import { ObjectId } from 'mongodb';

export interface MongoTaskDocument {
  _id: ObjectId;
  price: {
    units: number;
    currency: string;
  };
  path: string;
  images: ObjectId[];
  status: string;
  createdAt: string;
}
