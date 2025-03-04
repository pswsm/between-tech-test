import { StringValueObject } from 'src/shared/StringValueObject';
import { Path } from './value-object/Path';
import { PrimitiveOf } from 'src/shared/FromPrimitves';
import { Variant } from './value-object/Variant';

export class Image {
  public static fromPrimitives(primitives: PrimitiveOf<Image>): Image {
    return new Image(
      new StringValueObject(primitives.id),
      new Path(primitives.path),
      primitives.variants?.map((r) => Variant.fromPrimitives(r)),
    );
  }

  constructor(
    private readonly id: StringValueObject,
    private readonly path: Path,
    private readonly variants?: Variant[],
  ) {}

  public toPrimitives() {
    return {
      id: this.id.valueOf(),
      path: this.path.valueOf(),
      variants: this.variants?.map((v) => v.toPrimitives()),
    };
  }
}
