import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap, take } from 'rxjs';
import { BlogService, ToStrService } from '../../category/Services';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { Category } from '../../../store/category.types';
import { ApplicationRoute, RouteTo } from '../../../app-routing.module';
import { Store } from '@ngrx/store';
import {
  selectgetCategory,
  selectgetCategoryLoaded,
} from '../../../store/category.selectors';
import { getLoadCategory } from '../../../store/category.actions';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MarkdownModule],
  providers: [BlogService],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.scss',
})
export class EditBlogComponent implements OnInit, OnDestroy {
  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  getBlogById?: Subscription;
  id!: string | null;
  BlogPostForm!: FormGroup;
  getAllCategories: Category[] = [];
  blogPostId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tostr: ToStrService,
    private BlogPostservice: BlogService,
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.BlogPostForm = this.fb.group({
      id: [''],
      title: [''],
      urlHandle: [''],
      shortDescription: [''],
      content: [''],
      featuredImageUrl: [''],
      publishedDate: [''],
      author: [''],
      isVisible: [''],
      categories: [[]],
    });
    this.routeSubscription = this.route.paramMap.pipe(take(1)).subscribe({
      next: (params) => {
        this.id = params.get('id');
        console.log('BlogPost is here', this.id);
      },
      error: (err) => {
        this.tostr.showError(err, 'Error');
      },
      complete: () => {
        if (this.id) {
          this.getPostById(this.id);
        }
      },
    });
  }
  getPostById(id: string) {
    // dispatch action
    this.store.dispatch(getLoadCategory());
    this.getBlogById = this.BlogPostservice.getBlogPostById(id).subscribe({
      next: (res) => {
        const data = res.data;
        console.log('BlogPost Form shows', res.data);
        this.BlogPostForm.patchValue({
          id: data.id,
          title: data.title,
          shortDescription: data.shortDescription,
          content: data.content,
          featuredImageUrl: data.featuredImageUrl,
          urlHandle: data.urlHandle,
          publishedDate: data.publishedDate,
          author: data.author,
          isVisible: data.isVisible,
          categories: data.categories || [],
        });
        //this.getAllCategories = data.categories;
      },
      error: (err) => {
        console.log();
      },
      complete: () => {
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
              this.getAllCategories = categories.data;
            }
            console.log('Categories', categories);
          });
      },
    });
  }

  get contentValue() {
    return this.BlogPostForm.get('content')?.value || '';
  }

  get featureImageUrl() {
    return this.BlogPostForm.get('featuredImageUrl')?.value || '';
  }

  get categoriesData() {
    let getCategoriesData = this.BlogPostForm.get('categories')?.value || '';
    console.log('getCategoriesData', getCategoriesData);
    return getCategoriesData;
  }

  editBlogPost(BlogPostForm: FormGroup) {
    if (BlogPostForm.invalid) {
      this.tostr.showError('Please filed the BlogPost Form', 'Error');
    }
    this.blogPostId = this.BlogPostForm.get('id')?.value;
    this.updateBlogPostSubscription = this.BlogPostservice.updateBlogPost(
      this.blogPostId,
      this.BlogPostForm.value,
    ).subscribe({
      next: (updateres) => {
        if (updateres.success) {
          this.tostr.showSuccess(updateres.message, 'Sucess');
        }
      },
      error: (err) => {
        this.tostr.showError(err, 'Error');
      },
      complete: () => {
        this.router.navigate([RouteTo(ApplicationRoute.GetBlogPost)]);
      },
    });
    console.log('Data edited !!', this.BlogPostForm.value);
  }

  deletedPost() {
    let blogId = this.BlogPostForm.get('id')?.value;
    this.deleteBlogPostSubscription = this.BlogPostservice.deletePost(
      blogId,
    ).subscribe({
      next: (res) => {
        if (res.success) {
          this.tostr.showSuccess(res.message, 'Sucess');
          this.router.navigate([RouteTo(ApplicationRoute.GetBlogPost)]);
        }
      },
      error: (err) => {
        this.tostr.showError(err, 'Error');
      },
      complete: () => {},
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogById?.unsubscribe();
  }
}
