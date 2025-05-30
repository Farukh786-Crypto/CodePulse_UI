import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../Services/category.service';
import { HttpService } from '../Services/http.service';
import { Store } from '@ngrx/store';
import {
  selectgetCategory,
  selectgetCategoryLoaded,
} from '../../../store/category.selectors';
import { filter, Observable, switchMap, take } from 'rxjs';
import { getLoadCategory } from '../../../store/category.actions';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category, GetCategoryResponse } from '../../../store/category.types';
import { ImportsModule } from '../../../common/Modules/imports';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ImportsModule],
  providers: [HttpService, CategoryService],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  categoriesData: any[] = [];
  loading: boolean = true;
  filterValue: string = '';
  categoriesData$?: Observable<GetCategoryResponse>;
  private _categories: GetCategoryResponse | null = null;
  constructor(private store: Store) {}

  get clonedCategories(): Category[] {
    return this._categories?.data ? [...this._categories.data] : [];
  }

  ngOnInit(): void {
    // dispatch action
    this.store.dispatch(getLoadCategory());

    // First, check if the data is loaded, then select the category data
    this.categoriesData$ = this.store.select(selectgetCategoryLoaded).pipe(
      filter((isLoaded): isLoaded is true => isLoaded === true), // Explicitly check for true
      switchMap(() =>
        this.store.select(selectgetCategory).pipe(
          filter((data): data is GetCategoryResponse => !!data), // Ensure data is not undefined
        ),
      ),
    );

    // Store the response locally so the getter can access it
    this.categoriesData$.subscribe((data) => {
      this._categories = data;
      this.loading = false;
    });

    //called selector method 2
    // this.store
    //   .select(selectgetCategoryLoaded)
    //   .pipe(
    //     take(1),
    //     switchMap((isLoaded) => {
    //       if (isLoaded) {
    //         return this.store.select(selectgetCategory).pipe(take(1));
    //       }
    //       return [];
    //     }),
    //   )
    //   .subscribe((categories) => {
    //     if (categories) {
    //       this.categoriesData = categories.data;
    //     }
    //     console.log('Categories', categories);
    //   });
  }
}
