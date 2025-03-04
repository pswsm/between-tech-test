import { ObjectId } from 'mongodb';
import { StringValueObject } from 'src/shared/StringValueObject';

export class Id extends StringValueObject {
  public static new(): Id {
    return new Id(new ObjectId().toHexString());
  }

  constructor(value: string) {
    super(value);
  }
}
