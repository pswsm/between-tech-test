import { ImageId } from '@app/contexts/images/domain/value-objects/ImageId';
import { Price } from '@app/contexts/tasks/domain/Price';
import { Task } from '@app/contexts/tasks/domain/Task';
import { PriceCurrency } from '@app/contexts/tasks/domain/value-object/PriceCurrency';
import { TaskId } from '@app/contexts/tasks/domain/value-object/TaskId';
import { TaskStatus } from '@app/contexts/tasks/domain/value-object/TaskStatus';
import { Unit } from '@app/contexts/tasks/domain/value-object/Unit';
import { Timestamp } from '@app/shared/Timestamp';
import { TaskMother } from '@app/test/mothers/TaskMother';

describe('Task', () => {
  const mother = new TaskMother();
  describe('constructor', () => {
    it('should create a task with the provided values', () => {
      const taskId = mother.id;
      const originalImageId = mother.originalImage;
      const images = mother.images;
      const price = mother.price;
      const status = mother.status;
      const createdAt = mother.createdAt;

      const task = new Task(
        taskId,
        originalImageId,
        images,
        price,
        status,
        createdAt,
      );

      expect(task).toMatchObject(mother.build());
    });
  });

  describe('toPrimitives', () => {
    it('should convert a task to primitive values', () => {
      const task = mother.build();

      const primitives = task.toPrimitives();

      expect(primitives).toEqual({
        id: mother.id.valueOf(),
        originalImage: mother.originalImage.valueOf(),
        images: mother.images.map((id) => id.valueOf()),
        price: mother.price.toPrimitives(),
        status: mother.status.valueOf(),
        createdAt: mother.createdAt.valueOf(),
      });
    });

    describe('fromPrimitives', () => {
      it('should create a task from primitive values', () => {
        const primitives = {
          id: 'primitive-id',
          originalImage: 'primitive-image-id',
          images: ['primitive-image-id-1', 'primitive-image-id-2'],
          price: { units: 100, currency: 'EUR' },
          status: TaskStatus.PENDING.valueOf(),
          createdAt: 1741256643,
        };

        const task = Task.fromPrimitives(primitives);

        expect(task).toMatchObject({
          id: new TaskId('primitive-id'),
          originalImage: new ImageId('primitive-image-id'),
          images: [
            new ImageId('primitive-image-id-1'),
            new ImageId('primitive-image-id-2'),
          ],
          price: new Price(new Unit(100), PriceCurrency.EUR),
          status: TaskStatus.PENDING,
          createdAt: new Timestamp(1741256643),
        });
      });
    });
  });

  describe('getOriginalImageId', () => {
    it('should return the original image ID', () => {
      const task = mother.build();

      expect(task.getOriginalImageId()).toBe(mother.originalImage);
    });
  });

  describe('getId', () => {
    it('should return the task ID', () => {
      const task = mother.build();

      expect(task.getId()).toBe(mother.id);
    });
  });

  describe('getStatus', () => {
    it('should return the task status', () => {
      const task = mother.build();

      expect(task.getStatus()).toBe(mother.status);
    });
  });

  describe('getPriceUnit', () => {
    it('should return the price unit', () => {
      const task = mother.build();

      expect(task.getPriceUnit()).toBe(mother.price.getUnits());
    });
  });

  describe('getImageIds', () => {
    it('should return the list of image IDs', () => {
      const task = mother.build();

      expect(task.getImageIds()).toEqual(mother.images);
    });
  });

  describe('complete', () => {
    it('should mark the task as complete and update the image IDs', () => {
      const task = mother.withImages([]).build();
      const completedImageIds = [new ImageId('completed-image-id')];

      task.complete(completedImageIds);

      expect(task.getStatus()).toBe(TaskStatus.COMPLETE);
      expect(task.getImageIds()).toEqual(completedImageIds);
    });
  });

  describe('fail', () => {
    it('should mark the task as failed', () => {
      const task = mother.build();

      task.fail();

      expect(task.getStatus()).toBe(TaskStatus.FAILED);
    });
  });
});
