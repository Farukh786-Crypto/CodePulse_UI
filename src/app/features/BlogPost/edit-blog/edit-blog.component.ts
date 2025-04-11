import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { BlogService, ToStrService } from '../../category/Services';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

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
  id!: string | null;
  BlogPostForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private tostr: ToStrService,
    private BlogPostservice: BlogService,
    private fb: FormBuilder,
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
    this.BlogPostservice.getBlofPostById(id).subscribe({
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
      },
      error: (err) => {
        console.log();
      },
      complete: () => {},
    });
  }

  get contentValue() {
    return this.BlogPostForm.get('content')?.value || '';
  }

  get featureImageUrl() {
    return this.BlogPostForm.get('featuredImageUrl')?.value || '';
  }

  get categoriesData() {
    return this.BlogPostForm.get('categories')?.value || '';
  }

  editBlogPost() {
    console.log('Data edited !!');
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
