export interface ApiResponseModel<T>{
    data:T,
    success: boolean;
    message: string;
    errors: string[];
}

export interface DataState<T> {
  data: T | undefined;
  errorMessage: string | undefined;
  loading?: boolean;
  loaded?: boolean;
}