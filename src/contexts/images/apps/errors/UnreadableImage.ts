import { Path } from '../../domain/value-objects/Path';

export class UnreadableImage extends Error {
  constructor(imgPath: Path) {
    super(`Could not read "${imgPath.valueOf()}"`);
  }
}
