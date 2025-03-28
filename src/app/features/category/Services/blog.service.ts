import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../../../common/common';
import { BlogPost } from '../../../store/category.types';
import { AddBlogPost } from '../../../common/AddBlogPost.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private https: HttpService) {}

  postBlogPost(blogPost: AddBlogPost): Observable<ApiResponseModel<BlogPost>> {
    return this.https.post<ApiResponseModel<BlogPost>>('BlogPosts', blogPost);
  }
}
