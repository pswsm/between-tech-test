import { StringValueObject } from 'src/shared/StringValueObject';
import { Path } from './value-object/Path';
import { Resolution } from './value-object/Resolution';
import { PrimitiveOf } from 'src/shared/FromPrimitves';

export class Image {
  public static fromPrimitives(primitives: PrimitiveOf<Image>): Image {
    return new Image(
      new StringValueObject(primitives.id),
      new Path(primitives.path),
      primitives.resolutions.map((r) => new Resolution(r)),
    );
  }
  constructor(
    private readonly id: StringValueObject,
    private readonly path: Path,
    private readonly resolutions: Resolution[],
  ) {}

  public toPrimitives() {
    return {
      id: this.id.valueOf(),
      path: this.path.valueOf(),
      resolutions: this.resolutions.map((r) => r.valueOf()),
    };
  }
}
