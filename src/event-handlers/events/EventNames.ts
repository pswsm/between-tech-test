export const EventName = {
  ImageCreated: 'ImageCreated',
  TaskCreated: 'TaskCreated',
  TaskImagesResized: 'TaskImagesResized',
  TaskResizeFailed: 'TaskResizeFailed',
} as const;

export type EventName = keyof typeof EventName;
