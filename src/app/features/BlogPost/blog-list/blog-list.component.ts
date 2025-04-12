import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../category/Services/blog.service';
import { BlogPost } from '../../../common/Models/BlogPost.model';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [BlogService],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.getAllPosts();
  }
  getAllPosts() {
    this.blogService.getBlogPosts().subscribe((res) => {
      if (Array.isArray(res.data)) {
        // res.data.forEach((data) => {
        //   this.blogPosts.push(data);
        // });

        // alternative approach using spread operator
        this.blogPosts = [...res.data];
        console.log('this.blogPosts', this.blogPosts);
      }
    });
  }
}
