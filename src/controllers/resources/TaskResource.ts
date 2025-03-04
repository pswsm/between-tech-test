import { ImageResource } from './ImageResource';

export interface TaskResource {
  taskId: string;
  status: string;
  price: number;
  images: ImageResource[];
}
