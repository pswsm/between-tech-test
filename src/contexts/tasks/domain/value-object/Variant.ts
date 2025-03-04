import { PrimitiveOf } from 'src/shared/FromPrimitves';
import { Path } from './Path';
import { Resolution } from './Resolution';

export class Variant {
  public static fromPrimitives(primitives: PrimitiveOf<Variant>): Variant {
    return new Variant(
      new Resolution(primitives.resolution),
      new Path(primitives.path),
    );
  }

  constructor(
    private readonly resolution: Resolution,
    private readonly path: Path,
  ) {}

  public toPrimitives() {
    return {
      resolution: this.resolution.valueOf(),
      path: this.path.valueOf(),
    };
  }
}
