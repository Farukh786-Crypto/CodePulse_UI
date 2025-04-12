import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddBlogPost } from '../../../common/Models/AddBlogPost.model';
import { BlogService } from '../../category/Services/blog.service';
import { MarkdownModule } from 'ngx-markdown';
import { Store } from '@ngrx/store';
import { getLoadCategory } from '../../../store/category.actions';
import {
  selectgetCategory,
  selectgetCategoryLoaded,
} from '../../../store/category.selectors';
import { switchMap, take, tap } from 'rxjs';
import { Category } from '../../../store/category.types';

@Component({
  selector: 'app-add-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [BlogService],
  templateUrl: './add-blog-list.component.html',
  styleUrl: './add-blog-list.component.scss',
})
export class AddBlogListComponent implements OnInit {
  BlogPostForm!: FormGroup;
  contentValue!: string;
  featureImageUrl!: string;
  categoriesData: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private store: Store,
  ) {}
  ngOnInit(): void {
    this.BlogPostForm = this.fb.group({
      title: ['', Validators.required],
      urlHandle: ['', Validators.required],
      shortDescription: ['', Validators.required],
      content: ['', Validators.required],
      featuredImageUrl: ['', Validators.required],
      publishedDate: ['', Validators.required],
      author: ['', Validators.required],
      isVisible: [''],
      categories: [[], Validators.required],
    });

    // CALL CATEGORY ACTION API
    this.store.dispatch(getLoadCategory());
    // get cateogry using selector here
    this.store
      .select(selectgetCategoryLoaded)
      .pipe(
        take(1),
        switchMap((isLoaded) => {
          if (isLoaded) {
            return this.store.select(selectgetCategory).pipe(take(1));
          }
          return [];
        }),
      )
      .subscribe((categories) => {
        if (categories) {
          this.categoriesData = categories.data;
        }
        //console.log('Categories', categories);
      });

    this.BlogPostForm.get('content')?.valueChanges.subscribe((value) => {
      this.contentValue = value;
    });
    this.BlogPostForm.get('featuredImageUrl')?.valueChanges.subscribe(
      (value) => {
        this.featureImageUrl = value;
      },
    );
  }

  saveBlogPost(BlogPostForm: FormGroup) {
    if (BlogPostForm.invalid) {
      return;
    }
    const BlogData: AddBlogPost = {
      title: BlogPostForm.get('title')?.value,
      shortDescription: BlogPostForm.get('shortDescription')?.value,
      content: BlogPostForm.get('content')?.value,
      featuredImageUrl: BlogPostForm.get('featuredImageUrl')?.value,
      urlHandle: BlogPostForm.get('urlHandle')?.value,
      publishedDate: BlogPostForm.get('publishedDate')?.value,
      author: BlogPostForm.get('author')?.value,
      isVisible: BlogPostForm.get('isVisible')?.value,
      categories: BlogPostForm.get('categories')?.value,
    };
    this.blogService.postBlogPost(BlogData).subscribe((res) => {
      this.BlogPostForm.reset();
      console.log('Blog post data succesfully !!');
    });
  }
}
