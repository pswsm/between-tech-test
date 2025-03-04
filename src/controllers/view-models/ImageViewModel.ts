import { Image } from 'src/contexts/images/domain/Image';
import { ImageResource } from '../resources/ImageResource';

export class ImageViewModel {
  public static toResource(image: Image): ImageResource {
    return {
      path: image.getPath().valueOf(),
      resolution: image.getResolution().valueOf(),
    };
  }
}
