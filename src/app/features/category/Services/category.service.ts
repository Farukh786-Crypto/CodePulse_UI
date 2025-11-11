import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../../../common/common';
import {
  Category,
  CategorySingleResponse,
  codePulse,
  GetCategoryResponse,
} from '../../../store/category.types';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private https: HttpService) {}

  getCategory(): Observable<ApiResponseModel<GetCategoryResponse>> {
    return this.https.get<ApiResponseModel<GetCategoryResponse>>('Categories');
  }

  getCategoryById(
    id: number,
  ): Observable<ApiResponseModel<CategorySingleResponse>> {
    return this.https.get<ApiResponseModel<CategorySingleResponse>>(
      'Categories/' + id,
    );
  }

  postCategory(category: Category): Observable<ApiResponseModel<codePulse>> {
    return this.https.post<ApiResponseModel<codePulse>>('Categories', category);
  }

  putCategory(
    categoryId: number,
    category: Category,
  ): Observable<ApiResponseModel<codePulse>> {
    return this.https.put<ApiResponseModel<codePulse>>(
      'Categories/' + categoryId,
      category,
    );
  }

  deleteCategory(id: number): Observable<ApiResponseModel<codePulse>> {
    return this.https.delete<ApiResponseModel<codePulse>>('Categories/' + id);
  }
}
