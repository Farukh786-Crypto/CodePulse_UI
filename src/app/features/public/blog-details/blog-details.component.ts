import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService } from '../../category/Services';
import { Subscription } from 'rxjs';
import { BlogPost } from '../../../common/Models/BlogPost.model';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MarkdownModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  url!: string | null;
  blogPost!: BlogPost;
  private paramSub!: Subscription;
  private blogSub!: Subscription;

  constructor(
    private router: ActivatedRoute,
    private blogService: BlogService,
  ) {}

  ngOnInit(): void {
    this.paramSub = this.router.paramMap.subscribe({
      next: (params) => {
        if (params) {
          const getUrl = params.get('url');
          this.url = getUrl ?? null;
        }
      },
    });

    // fetch the blog details by url
    if (this.url) {
      this.blogSub = this.blogService
        .getBlogPostByUrlHandle(this.url)
        .subscribe({
          next: (res) => {
            if (res) {
              this.blogPost = res.data;
            }
          },
          complete: () => {},
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
    if (this.blogSub) {
      this.blogSub.unsubscribe();
    }
  }
}
