import { StringValueObject } from 'src/shared/StringValueObject';

export class TaskStatus extends StringValueObject {
  public static PENDING = new TaskStatus('PENDING');
  public static COMPLETE = new TaskStatus('COMPLETE');
  public static FAILED = new TaskStatus('FAILED');
}
