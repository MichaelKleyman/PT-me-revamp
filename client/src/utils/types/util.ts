export type SetSliceStateFun<T> = (
  update: Partial<T> | ((state: T) => Partial<T>)
) => void;
