export function Right<R>(x: R): Either<R, never> {
  return {
    chain: (fn) => Right(fn(x)),
    switchMap: (fn) => fn(x),
    fold: (_onLeft, onRight) => onRight(x),
  };
};

export function Left<L>(x: L): Either<never, L> {
  return {
    chain: <L>(_fn: (x: L) => unknown) => Left(x),
    switchMap: (fn) => Left(x),
    fold: (onLeft, _onRight) => onLeft(x),
  }
};

export interface Either<Result, Error> {
  chain: <ChainedResult>(fn: (x: Result) => ChainedResult) => Either<ChainedResult, Error>;
  switchMap: <MappedResult, MappedError>(fn: (x: Result) => Either<MappedResult, MappedError>) => Either<MappedResult, MappedError | Error>;
  fold: (onLeft: (e: Error) => void, onRight: (x: Result) => void) => void;
}

export function fromTryCatch<Result, Error>(fn: () => Result): Either<Result, Error> {
  try {
    return Right(fn());
  } catch (error: unknown) {
    return Left(error as Error);
  }
}
