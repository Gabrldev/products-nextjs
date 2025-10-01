export type Response<T> = {
  message: string;
  success: boolean;
  data?: T;
  error?: string;
};
