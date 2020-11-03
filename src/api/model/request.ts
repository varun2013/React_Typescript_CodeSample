export interface Response<D = object | undefined, E = object | undefined> {
  success: boolean,
  data?: D
  error?: E
}