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

@Component({
  selector: 'app-add-blog-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-blog-list.component.html',
  styleUrl: './add-blog-list.component.scss',
})
export class AddBlogListComponent implements OnInit {
  BlogPostForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
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
  }

  saveBlogPost() {}
}
