import { StringValueObject } from 'src/shared/StringValueObject';
import { Extension } from './Extension';
import { ExtensionNotFound } from './error/ExtenstionNotFound';

export class Path extends StringValueObject {
  public getExtension(): Extension {
    const rawExt = this.value.split('.', 1).at(-1);
    if (!rawExt) {
      throw new ExtensionNotFound();
    }

    return new Extension(rawExt);
  }

  public isRemote(): boolean {
    if (/[a-z]:\/\//.test(this.value)) {
      return true;
    }
    return false;
  }
}
