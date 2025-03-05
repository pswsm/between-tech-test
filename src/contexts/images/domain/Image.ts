import { Path } from './value-objects/Path';
import { PrimitiveOf } from 'src/shared/FromPrimitves';
import { AggregateRoot } from 'src/shared/AggregateRoot';
import { ImageId } from './value-objects/ImageId';
import { Resolution } from './value-objects/Resolution';

export class Image extends AggregateRoot {
  public static fromPrimitives(primitives: PrimitiveOf<Image>): Image {
    return new Image(
      new ImageId(primitives.id),
      new Path(primitives.path),
      primitives.resolution ? new Resolution(primitives.resolution) : undefined,
    );
  }

  constructor(
    id: ImageId,
    private readonly path: Path,
    private readonly resolution?: Resolution,
  ) {
    super(id);
  }

  public getId(): ImageId {
    return this.id;
  }

  public getPath(): Path {
    return this.path;
  }

  public getResolution(): Resolution | undefined {
    return this.resolution;
  }

  public toPrimitives() {
    return {
      id: this.id.valueOf(),
      path: this.path.valueOf(),
      resolution: this.resolution?.valueOf(),
    };
  }
}
