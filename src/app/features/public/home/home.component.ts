import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from '../../category/Services';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../../../common/Models/BlogPost.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  blogServiceSubscription?: Subscription;
  blogs: BlogPost[] = [];
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogServiceSubscription = this.blogService.getBlogPosts().subscribe({
      next: (res) => {
        //console.log(res);
        // res.data.forEach((e) => {
        //   console.log(e);
        //   this.blogs.push(e);
        // });
        if (res.data) this.blogs.push(...res.data);
      },
      complete: () => {},
      error: () => {},
    });
  }

  ngOnDestroy(): void {
    this.blogServiceSubscription?.unsubscribe();
  }
}
