export class Failure extends Error {
  constructor({ message, name, cause, stack }: Error) {
    super(message, {
      cause,
    });

    this.name = name;
    this.stack = stack;
  }
}

