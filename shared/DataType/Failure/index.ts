export class Failure extends Error {
  constructor({ message, name, cause, stack }: Error) {
    super(message, {
      cause,
    });

    this.name = name;
    this.stack = stack;
  }
}

export class BadRequestFailure extends Failure {}

export class ForbiddenFailure extends Failure {}

export class InsufficientPermissionFailure extends Failure {}

export class NotFoundFailure extends Failure {}

export class UnknownFailure extends Failure {}
