import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin/categories',
    loadComponent() {
      return import(
        './features/category/category-list/category-list.component'
      ).then((m) => m.CategoryListComponent);
    },
  },
  {
    path: 'admin/categories/add',
    loadComponent() {
      return import(
        './features/category/add-category/add-category.component'
      ).then((m) => m.AddCategoryComponent);
    },
  },
  {
    path: 'admin/categories/:id',
    loadComponent() {
      return import(
        './features/category/edit-category/edit-category.component'
      ).then((m) => m.EditCategoryComponent);
    },
  },
  {
    path: 'admin/blogposts',
    loadComponent() {
      return import('./features/BlogPost/blog-list/blog-list.component').then(
        (m) => m.BlogListComponent,
      );
    },
  },
  {
    path: 'admin/blogpost/Add',
    loadComponent() {
      return import(
        './features/BlogPost/add-blog-list/add-blog-list.component'
      ).then((m) => m.AddBlogListComponent);
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
