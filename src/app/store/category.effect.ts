import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  deleteCategory,
  deleteCategoryFailure,
  deleteCategorySuccess,
  getLoadCategory,
  getLoadCategoryById,
  getLoadCategoryByIdFailure,
  getLoadCategoryByIdSuccess,
  getLoadCategoryFailure,
  getLoadCategorySuccess,
  loadCategory,
  loadCategoryFailure,
  loadCategorySuccess,
  updateCategory,
  updateCategoryFailure,
  updateCategorySuccess,
} from './category.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { CategoryService } from '../features/category/Services';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
  ) {}

  getCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLoadCategory),
      switchMap((action) => {
        console.log('API Request Parameters:', action);
        return this.categoryService.getCategory().pipe(
          map((response: any) => {
            if (response) {
              return getLoadCategorySuccess({ categories: response });
            } else {
              return getLoadCategoryFailure({
                error: 'No response from the server',
              });
            }
          }),
          catchError((error) => {
            console.error('API Error:', error);
            return of(loadCategoryFailure({ error: error.message }));
          }),
        );
      }),
    ),
  );

  getCategoryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLoadCategoryById),
      switchMap((action) => {
        console.log('API Request Parameters:', action.categoryId);
        return this.categoryService.getCategoryById(action.categoryId).pipe(
          map((response: any) => {
            if (response) {
              return getLoadCategoryByIdSuccess({ category: response });
            } else {
              return getLoadCategoryByIdFailure({
                error: 'No response from the server',
              });
            }
          }),
          catchError((error) => {
            console.error('API Error:', error);
            return of(getLoadCategoryByIdFailure({ error: error.message }));
          }),
        );
      }),
    ),
  );

  postCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategory),
      switchMap((action) => {
        console.log('API Request Parameters:', action.category);
        return this.categoryService.postCategory(action.category).pipe(
          map((response: any) => {
            if (response) {
              return loadCategorySuccess({ categoryResponse: response });
            } else {
              return loadCategoryFailure({
                error: 'No response from the server',
              });
            }
          }),
          catchError((error) => {
            console.error('API Error:', error);
            return of(loadCategoryFailure({ error: error.message }));
          }),
        );
      }),
    ),
  );

  putCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCategory),
      switchMap((action) => {
        console.log(
          'API Request Parameters:',
          action.categoryId,
          action.category,
        );
        return this.categoryService
          .putCategory(action.categoryId, action.category)
          .pipe(
            map((response: any) => {
              if (response) {
                return updateCategorySuccess({ category: response });
              } else {
                return updateCategoryFailure({
                  error: 'No response from the server',
                });
              }
            }),
            catchError((error) => {
              console.error('API Error:', error);
              return of(updateCategoryFailure({ error: error.message }));
            }),
          );
      }),
    ),
  );

  deleteCategoryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCategory),
      switchMap((action) => {
        console.log('API Request Parameters:', action.categoryId);
        return this.categoryService.deleteCategory(action.categoryId).pipe(
          map((response: any) => {
            if (response) {
              return deleteCategorySuccess({ categoryResponse: response });
            } else {
              return deleteCategoryFailure({
                error: 'No response from the server',
              });
            }
          }),
          catchError((error) => {
            console.error('API Error:', error);
            return of(deleteCategoryFailure({ error: error.message }));
          }),
        );
      }),
    ),
  );
}
