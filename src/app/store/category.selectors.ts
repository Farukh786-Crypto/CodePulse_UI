import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CodePulseStoreState } from './category.types';
import { state } from '@angular/animations';

// Get the feature state
const selectCategoryFeature =
  createFeatureSelector<CodePulseStoreState>('category');
export const selectCategories = createSelector(
  selectCategoryFeature,
  (state) => state.categoryStore.data,
);

export const selectCategoryLoading = createSelector(
  selectCategoryFeature,
  (state) => state.categoryStore.loading,
);

export const selectCategoryLoaded = createSelector(
  selectCategoryFeature,
  (state) => state.categoryStore.loaded,
);

export const selectCategoryError = createSelector(
  selectCategoryFeature,
  (state) => state.categoryStore.errorMessage,
);

export const selectgetCategoryLoading = createSelector(
  selectCategoryFeature,
  (state) => state.getcategoryStore.loading,
);

export const selectgetCategory = createSelector(
  selectCategoryFeature,
  (state) => state.getcategoryStore.data,
);

export const selectgetCategoryLoaded = createSelector(
  selectCategoryFeature,
  (state) => state.getcategoryStore.loaded,
);

export const selectgetCategoryError = createSelector(
  selectCategoryFeature,
  (state) => state.getcategoryStore.errorMessage,
);

export const selectgetCategoryById = createSelector(
  selectCategoryFeature,
  (state) => state.getcategorybyidStore.data,
);

export const selectgetCategoryByIdLoaded = createSelector(
  selectCategoryFeature,
  (state) => state.getcategorybyidStore.loaded,
);

export const selectgetCategoryByIdLoading = createSelector(
  selectCategoryFeature,
  (state) => state.getcategorybyidStore.loading,
);

export const selectgetCategoryByIdError = createSelector(
  selectCategoryFeature,
  (state) => state.getcategorybyidStore.errorMessage,
);

export const selectUpdateCategories = createSelector(
  selectCategoryFeature,
  (state) => state.updatecategoryStore.data,
);

export const selectUpdateCategoryLoading = createSelector(
  selectCategoryFeature,
  (state) => state.updatecategoryStore.loading,
);

export const selectUpdateCategoryLoaded = createSelector(
  selectCategoryFeature,
  (state) => state.updatecategoryStore.loaded,
);

export const selectUpdateCategoryError = createSelector(
  selectCategoryFeature,
  (state) => state.updatecategoryStore.errorMessage,
);

export const selectDeleteCategoryData = createSelector(
  selectCategoryFeature,
  (state) => state.deletecategoryStore.data,
);

export const selectDeleteCategoryLoaded = createSelector(
  selectCategoryFeature,
  (state) => state.deletecategoryStore.loaded,
);

export const selectDeleteCategoryError = createSelector(
  selectCategoryFeature,
  (state) => state.deletecategoryStore.errorMessage,
);
