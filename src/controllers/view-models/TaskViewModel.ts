import { Task } from 'src/contexts/tasks/domain/Task';
import { TaskResource } from '../resources/TaskResource';
import { Image } from 'src/contexts/images/domain/Image';
import { ImageViewModel } from './ImageViewModel';
import ImageFinder from 'src/contexts/images/apps/ImageFinder';

export class TaskViewModel {
  constructor(private readonly imageFinder: ImageFinder) {}
  public async toResource(task: Task): Promise<TaskResource> {
    const imageIds = task.getImageIds();
    const images: Image[] = [];
    for (const id of imageIds) {
      images.push(await this.imageFinder.get(id));
    }

    return {
      taskId: task.getId().valueOf(),
      status: task.getStatus().valueOf(),
      price: task.getPriceUnit().valueOf(),
      images: images.map((image) => ImageViewModel.toResource(image)),
    };
  }
}
