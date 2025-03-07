import { StringValueObject } from 'src/shared/StringValueObject';
import { Extension } from './Extension';
import { ExtensionNotFound } from './error/ExtenstionNotFound';

export class Path extends StringValueObject {
  public getExtension(): Extension {
    const l = this.value.split('/');
    const matches = /\.[a-z]{1,4}/.exec(l.at(-1) ?? '');
    if (!matches) {
      throw new ExtensionNotFound();
    }

    return new Extension(matches.at(-1) ?? matches[0]);
  }

  public isRemote(): boolean {
    if (/[a-z]:\/\//.test(this.value)) {
      return true;
    }
    return false;
  }
}
