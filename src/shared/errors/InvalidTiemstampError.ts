export class InvalidTimestampError extends Error {
  constructor(t: number) {
    super(`"${t}" is not a valid UNIX time`);
  }
}
