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
import { AddBlogPost } from '../../../common/AddBlogPost.model';
import { BlogService } from '../../category/Services/blog.service';
import { MarkdownModule } from 'ngx-markdown';

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

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
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
    });
    this.BlogPostForm.get('content')?.valueChanges.subscribe((value) => {
      this.contentValue = value;
    });
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
    };
    this.blogService.postBlogPost(BlogData).subscribe((res) => {
      this.BlogPostForm.reset();
      console.log('Blog post data succesfully !!');
    });
  }
}
