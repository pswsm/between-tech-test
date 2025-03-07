import { Image } from '@app/contexts/images/domain/Image';
import { ImageId } from '@app/contexts/images/domain/value-objects/ImageId';
import { Path } from '@app/contexts/images/domain/value-objects/Path';
import { Resolution } from '@app/contexts/images/domain/value-objects/Resolution';
import { MD5Hash } from '@app/shared/MD5Hash';
import { Timestamp } from '@app/shared/Timestamp';

export class ImageMother {
  public id: ImageId = ImageId.new();
  public path: Path = new Path('/default/path.jpg');
  public hash: MD5Hash = new MD5Hash('default-hash');
  public createdAt: Timestamp = new Timestamp(1741349575);
  public resolution?: Resolution;

  withId(id: ImageId): ImageMother {
    this.id = id;
    return this;
  }

  withPath(path: Path): ImageMother {
    this.path = path;
    return this;
  }

  withHash(hash: MD5Hash): ImageMother {
    this.hash = hash;
    return this;
  }

  withCreatedAt(createdAt: Timestamp): ImageMother {
    this.createdAt = createdAt;
    return this;
  }

  withResolution(resolution: Resolution): ImageMother {
    this.resolution = resolution;
    return this;
  }

  build(): Image {
    return new Image(
      this.id,
      this.path,
      this.hash,
      this.createdAt,
      this.resolution,
    );
  }
}
