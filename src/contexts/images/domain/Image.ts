import { Path } from './value-objects/Path';
import { PrimitiveOf } from 'src/shared/FromPrimitves';
import { AggregateRoot } from 'src/shared/AggregateRoot';
import { ImageId } from './value-objects/ImageId';
import { Resolution } from './value-objects/Resolution';
import { Timestamp } from 'src/shared/Timestamp';
import { MD5Hash } from 'src/shared/MD5Hash';

export class Image extends AggregateRoot {
  public static fromPrimitives(primitives: PrimitiveOf<Image>): Image {
    return new Image(
      new ImageId(primitives.id),
      new Path(primitives.path),
      new MD5Hash(primitives.hash),
      new Timestamp(primitives.createdAt),
      primitives.resolution ? new Resolution(primitives.resolution) : undefined,
    );
  }

  constructor(
    id: ImageId,
    private readonly path: Path,
    private readonly hash: MD5Hash,
    private readonly createdAt: Timestamp,
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
      hash: this.hash.valueOf(),
      createdAt: this.createdAt.valueOf(),
      resolution: this.resolution?.valueOf(),
    };
  }
}
