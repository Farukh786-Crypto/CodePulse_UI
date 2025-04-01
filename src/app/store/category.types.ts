// Request passing For Post category

import { DataState } from '../common/common';

export interface Category {
  id: number;
  name: string;
  urlHandle: string;
}

export interface codePulse {
  success: boolean;
  message: string;
}

export interface BlogPost extends codePulse {}
// Response getting For Post category
export interface CategoryResponse extends codePulse {}

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

export interface BlogPostSingleResponse {
  success: boolean;
  message: string;
  data: BlogPost;
}

export interface GetBlogPostsResponse {
  success: boolean;
  message: string;
  data: BlogPost[];
}

// passing Datastate and their response
export interface CodePulseStoreState {
  categoryStore: DataState<CategoryResponse>;
  getcategoryStore: DataState<GetCategoryResponse>;
  getcategorybyidStore: DataState<CategorySingleResponse>;
  updatecategoryStore: DataState<CategorySingleResponse>;
  deletecategoryStore: DataState<CategoryResponse>;
}
