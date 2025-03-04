import { ObjectId } from 'mongodb';
import { StringValueObject } from 'src/shared/StringValueObject';

export class ImageId extends StringValueObject {
  public static new(): ImageId {
    return new ImageId(new ObjectId().toHexString());
  }

  constructor(value: string) {
    super(value);
  }
}
