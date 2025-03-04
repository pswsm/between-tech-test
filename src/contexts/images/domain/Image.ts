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
      new Resolution(primitives.resolution),
    );
  }

  constructor(
    id: ImageId,
    private readonly path: Path,
    private readonly resolution: Resolution,
  ) {
    super(id);
  }

  public getPath(): Path {
    return this.path;
  }

  public getResolution(): Resolution {
    return this.resolution;
  }

  public toPrimitives() {
    return {
      id: this.id.valueOf(),
      path: this.path.valueOf(),
      resolution: this.resolution.valueOf(),
    };
  }
}
