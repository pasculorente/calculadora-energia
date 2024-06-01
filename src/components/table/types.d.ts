export type Mapper<T> = {
  name: string;
  subname?: string;
  expr: (t: T, update?: CallableFunction<T>) => JSX.Element | string;
};
