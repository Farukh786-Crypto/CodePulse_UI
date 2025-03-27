// Request passing For Post category

import { DataState } from '../common/common';

export interface Category {
  id: number;
  name: string;
  urlHandle: string;
}

// Response getting For Post category
export interface CategoryResponse {
  success: boolean;
  message: string;
}

// Response getting get By category Id
export interface CategorySingleResponse {
  success: boolean;
  message: string;
  data: Category;
}

export interface GetCategoryResponse {
  success: boolean;
  message: string;
  data: Category[];
}

// passing Datastate and their response
export interface CodePulseStoreState {
  categoryStore: DataState<CategoryResponse>;
  getcategoryStore: DataState<GetCategoryResponse>;
  getcategorybyidStore: DataState<CategorySingleResponse>;
  updatecategoryStore: DataState<CategorySingleResponse>;
  deletecategoryStore: DataState<CategoryResponse>;
}
