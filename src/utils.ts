export function Right<R>(x: R): Either<R, never> {
  return {
    map: (fn) => Right(fn(x)),
    chain: (fn) => fn(x),
    fork: (onRight, _onLeft) => onRight(x),
  };
};

export function Left<L>(x: L): Either<never, L> {
  return {
    map: <L>(_fn: (x: L) => unknown) => Left(x),
    chain: (fn) => Left(x),
    fork: (_onRight, onLeft) => onLeft(x),
  }
};

export interface Either<Result, Error> {
  map: <ChainedResult>(fn: (x: Result) => ChainedResult) => Either<ChainedResult, Error>;
  chain: <MappedResult, MappedError>(fn: (x: Result) => Either<MappedResult, MappedError>) => Either<MappedResult, MappedError | Error>;
  fork: (onRight: (x: Result) => void, onLeft: (e: Error) => void) => void;
}

export function fromTryCatch<Result, Error>(fn: () => Result): Either<Result, Error> {
  try {
    return Right(fn());
  } catch (error: unknown) {
    return Left(error as Error);
  }
}

export class Task<Result, Error> {
  public constructor(
    private readonly computation: (
      resolve: (result: Result) => void,
      reject: (error: Error) => void,
    ) => unknown
  ) { }

  public fork(
    onResolve: (x: Result) => void,
    onReject: (e: Error) => void,
  ) {
    return this.computation(onResolve, onReject);
  }

  public chain<MappedResult, MappedError>(fn: (x: Result) => Task<MappedResult, MappedError>) {
    return new Task<MappedResult, MappedError | Error>((resolve, reject) => {
      return this.fork(
        (r) => fn(r).fork(resolve, reject),
        (e) => reject(e),
      );
    });
  }

  public map<ChainedResult>(fn: (x: Result) => ChainedResult) {
    return new Task<ChainedResult, Error>((resolve, reject) => {
      return this.fork(
        (r) => resolve(fn(r)),
        (e) => reject(e),
      );
    });
  }
}
