export type Mapper<T> = {
  name: string;
  subname?: string;
  expr: (t: T) => string;
};
