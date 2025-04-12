import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './common/components/not-found/not-found.component';

export enum ApplicationRoute {
  Login = 'login',
  GetCategoryList = 'admin/categories',
  CategoryListAdd = 'admin/categories/add',
  GetCategoryId = 'admin/categories/:id',
  GetBlogPost = 'admin/blogposts',
  BlogPostAdd = 'admin/blogpost/add',
  GetBlogPostId = 'admin/blogpost/:id',
}

export function RouteTo(appRoute: ApplicationRoute) {
  return `/${appRoute}`;
}

const routes: Routes = [
  {
    path: ApplicationRoute.GetCategoryList,
    loadComponent() {
      return import(
        './features/category/category-list/category-list.component'
      ).then((m) => m.CategoryListComponent);
    },
  },
  {
    path: ApplicationRoute.CategoryListAdd,
    loadComponent() {
      return import(
        './features/category/add-category/add-category.component'
      ).then((m) => m.AddCategoryComponent);
    },
  },
  {
    path: ApplicationRoute.GetCategoryId,
    loadComponent() {
      return import(
        './features/category/edit-category/edit-category.component'
      ).then((m) => m.EditCategoryComponent);
    },
  },
  {
    path: ApplicationRoute.GetBlogPost,
    loadComponent() {
      return import('./features/BlogPost/blog-list/blog-list.component').then(
        (m) => m.BlogListComponent,
      );
    },
  },
  {
    path: ApplicationRoute.BlogPostAdd,
    loadComponent() {
      return import(
        './features/BlogPost/add-blog-list/add-blog-list.component'
      ).then((m) => m.AddBlogListComponent);
    },
  },
  {
    path: ApplicationRoute.GetBlogPostId,
    loadComponent() {
      return import('./features/BlogPost/edit-blog/edit-blog.component').then(
        (m) => m.EditBlogComponent,
      );
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
