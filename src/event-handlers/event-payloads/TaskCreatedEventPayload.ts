export interface TaskCreatedEvent {
  id: string;
  payload: {
    imageId: string;
  };
}
