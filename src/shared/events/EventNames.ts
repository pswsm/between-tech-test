export const EventName = {
  ImageCreated: 'ImageCreated',
  TaskCreated: 'TaskCreated',
} as const;

export type EventName = keyof typeof EventName;
