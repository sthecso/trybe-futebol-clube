export default interface ICRUD<T> {
  getOne(): Promise<T | undefined>;
}
