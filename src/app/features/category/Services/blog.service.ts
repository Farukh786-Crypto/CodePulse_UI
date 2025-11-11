import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../../../common/common';
import { BlogPostSingleResponse } from '../../../store/category.types';
import { AddBlogPost } from '../../../common/Models/AddBlogPost.model';
import { BlogPost } from '../../../common/Models/BlogPost.model';
import { UpdateBlogPost } from '../../../common/Models/UpdateBlogPost.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private https: HttpService) {}

  getBlogPosts(): Observable<ApiResponseModel<BlogPost[]>> {
    return this.https.get<ApiResponseModel<BlogPost[]>>('BlogPosts');
  }

  postBlogPost(blogPost: AddBlogPost): Observable<ApiResponseModel<BlogPost>> {
    return this.https.post<ApiResponseModel<BlogPost>>('BlogPosts', blogPost);
  }

  getBlogPostById(id: string): Observable<ApiResponseModel<BlogPost>> {
    return this.https.get(`BlogPosts/${id}`);
  }

  getBlogPostByUrlHandle(
    urlHandle: string,
  ): Observable<ApiResponseModel<BlogPost>> {
    return this.https.get(`BlogPosts/${urlHandle}`);
  }

  // http://localhost:5029/api/BlogPosts/3fa85f64-5717-4562-b3fc-2c963f66afa6
  updateBlogPost(
    id: string,
    updateBlogPost: UpdateBlogPost,
  ): Observable<ApiResponseModel<BlogPost>> {
    return this.https.put<ApiResponseModel<BlogPost>>(
      `BlogPosts/${id}`,
      updateBlogPost,
    );
  }

  // http://localhost:5029/api/BlogPosts/3fa85f64-5717-4562-b3fc-2c963f66afa6

  deletePost(id: string): Observable<ApiResponseModel<BlogPostSingleResponse>> {
    return this.https.delete<ApiResponseModel<BlogPostSingleResponse>>(
      `BlogPosts/${id}`,
    );
  }
}
