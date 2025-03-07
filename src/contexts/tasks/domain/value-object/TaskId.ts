import { ObjectId } from 'mongodb';
import { StringValueObject } from '@app/shared/StringValueObject';

export class TaskId extends StringValueObject {
  public static new(): TaskId {
    return new TaskId(new ObjectId().toHexString());
  }

  constructor(value: string) {
    super(value);
  }
}
