import { ActionType, createAction, props } from '@ngrx/store';
import {
  Category,
  CategoryResponse,
  CategorySingleResponse,
  GetCategoryResponse,
} from './category.types';

export const LOAD_CATEGORY = 'LOAD_CATEGORY';
export const LOAD_CATEGORY_SUCCESS = 'LOAD_CATEGORY_SUCCESS';
export const LOAD_CATEGORY_FAILURE = 'LOAD_CATEGORY_FAILURE';

export const GET_LOAD_CATEGORY = 'GET_LOAD_CATEGORY';
export const GET_LOAD_CATEGORY_SUCCESS = 'GET_LOAD_CATEGORY_SUCCESS';
export const GET_LOAD_CATEGORY_FAILURE = 'GET_LOAD_CATEGORY_FAILURE';

export const GET_LOAN_CATEGORY_BY_ID = 'GET_LOAN_CATEGORY_BY_ID';
export const GET_LOAN_CATEGORY_BY_ID_SUCCESS =
  'GET_LOAN_CATEGORY_BY_ID_SUCCESS';
export const GET_LOAN_CATEGORY_BY_ID_FAILURE =
  'GET_LOAN_CATEGORY_BY_ID_FAILURE';

export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';

export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';

export const loadCategory = createAction(
  LOAD_CATEGORY,
  props<{ category: Category }>(),
);

export const loadCategorySuccess = createAction(
  LOAD_CATEGORY_SUCCESS,
  props<{ categoryResponse: CategoryResponse }>(),
);

export const loadCategoryFailure = createAction(
  LOAD_CATEGORY_FAILURE,
  props<{ error: string }>(),
);

export const getLoadCategory = createAction(GET_LOAD_CATEGORY);

export const getLoadCategorySuccess = createAction(
  GET_LOAD_CATEGORY_SUCCESS,
  props<{ categories: GetCategoryResponse }>(),
);

export const getLoadCategoryFailure = createAction(
  GET_LOAD_CATEGORY_FAILURE,
  props<{ error: string }>(),
);

export const getLoadCategoryById = createAction(
  GET_LOAN_CATEGORY_BY_ID,
  props<{ categoryId: number }>(),
);

export const getLoadCategoryByIdSuccess = createAction(
  GET_LOAN_CATEGORY_BY_ID_SUCCESS,
  props<{ category: CategorySingleResponse }>(),
);

export const getLoadCategoryByIdFailure = createAction(
  GET_LOAN_CATEGORY_BY_ID_FAILURE,
  props<{ error: string }>(),
);

export const updateCategory = createAction(
  UPDATE_CATEGORY,
  props<{ categoryId: number; category: Category }>(),
);

export const updateCategorySuccess = createAction(
  UPDATE_CATEGORY_SUCCESS,
  props<{ category: CategorySingleResponse }>(),
);

export const updateCategoryFailure = createAction(
  UPDATE_CATEGORY_FAILURE,
  props<{ error: string }>(),
);

export const deleteCategory = createAction(
  DELETE_CATEGORY,
  props<{ categoryId: number }>(),
);

export const deleteCategorySuccess = createAction(
  DELETE_CATEGORY_SUCCESS,
  props<{ categoryResponse: CategoryResponse }>(),
);

export const deleteCategoryFailure = createAction(
  DELETE_CATEGORY_FAILURE,
  props<{ error: string }>(),
);

export type CodePulseActions =
  | ActionType<typeof loadCategory>
  | ActionType<typeof loadCategorySuccess>
  | ActionType<typeof loadCategoryFailure>
  | ActionType<typeof getLoadCategory>
  | ActionType<typeof getLoadCategorySuccess>
  | ActionType<typeof getLoadCategoryFailure>
  | ActionType<typeof getLoadCategoryById>
  | ActionType<typeof getLoadCategoryByIdSuccess>
  | ActionType<typeof getLoadCategoryByIdFailure>
  | ActionType<typeof updateCategory>
  | ActionType<typeof updateCategorySuccess>
  | ActionType<typeof updateCategoryFailure>
  | ActionType<typeof deleteCategory>
  | ActionType<typeof deleteCategorySuccess>
  | ActionType<typeof deleteCategoryFailure>;
