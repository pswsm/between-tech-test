import { Path } from './Path';
import { Resolution } from './Resolution';

export class Variant {
  constructor(
    private readonly resolution: Resolution,
    private readonly path: Path,
  ) {}
}
