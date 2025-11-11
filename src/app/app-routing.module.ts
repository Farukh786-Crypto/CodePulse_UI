import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { AuthGuard } from './features/auth/guards/auth.guard';

export enum ApplicationRoute {
  Home = 'home',
  Login = 'login',
  GetCategoryList = 'admin/categories',
  CategoryListAdd = 'admin/categories/add',
  GetCategoryId = 'admin/categories/:id',
  GetBlogPost = 'admin/blogposts',
  BlogPostAdd = 'admin/blogpost/add',
  GetBlogPostId = 'admin/blogpost/:id',
  GetBlogDetails = 'blog/:url',
  NavBarComp = 'navbarlink',
}

export function RouteTo(appRoute: ApplicationRoute) {
  return `/${appRoute}`;
}

const routes: Routes = [
  {
    path: '',
    loadComponent() {
      return import('./features/public/home/home.component').then(
        (a) => a.HomeComponent,
      );
    },
  },
  {
    path: 'login',
    loadComponent() {
      return import('./features/auth/login/login.component').then(
        (a) => a.LoginComponent,
      );
    },
  },
  {
    path: 'blog/:url',
    loadComponent() {
      return import(
        './features/public/blog-details/blog-details.component'
      ).then((a) => a.BlogDetailsComponent);
    },
  },
  {
    path: ApplicationRoute.GetBlogDetails,
    loadComponent() {
      return import(
        './features/public/blog-details/blog-details.component'
      ).then((a) => a.BlogDetailsComponent);
    },
    canActivate: [AuthGuard],
  },
  {
    path: ApplicationRoute.GetCategoryList,
    loadComponent() {
      return import(
        './features/category/category-list/category-list.component'
      ).then((m) => m.CategoryListComponent);
    },
    canActivate: [AuthGuard],
  },
  {
    path: ApplicationRoute.CategoryListAdd,
    loadComponent() {
      return import(
        './features/category/add-category/add-category.component'
      ).then((m) => m.AddCategoryComponent);
    },
    canActivate: [AuthGuard],
  },
  {
    path: ApplicationRoute.GetCategoryId,
    loadComponent() {
      return import(
        './features/category/edit-category/edit-category.component'
      ).then((m) => m.EditCategoryComponent);
    },
    canActivate: [AuthGuard],
  },
  {
    path: ApplicationRoute.GetBlogPost,
    loadComponent() {
      return import('./features/BlogPost/blog-list/blog-list.component').then(
        (m) => m.BlogListComponent,
      );
    },
    canActivate: [AuthGuard],
  },
  {
    path: ApplicationRoute.BlogPostAdd,
    loadComponent() {
      return import(
        './features/BlogPost/add-blog-list/add-blog-list.component'
      ).then((m) => m.AddBlogListComponent);
    },
    canActivate: [AuthGuard],
  },
  {
    path: ApplicationRoute.GetBlogPostId,
    loadComponent() {
      return import('./features/BlogPost/edit-blog/edit-blog.component').then(
        (m) => m.EditBlogComponent,
      );
    },
    canActivate: [AuthGuard],
  },
  {
    path: ApplicationRoute.NavBarComp,
    loadComponent() {
      return import('./core/components/navbar/navbar.component').then(
        (m) => m.NavbarComponent,
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
