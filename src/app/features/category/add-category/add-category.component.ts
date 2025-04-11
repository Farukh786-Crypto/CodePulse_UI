import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Category } from '../../../store/category.types';
import { Store } from '@ngrx/store';
import {
  selectCategories,
  selectCategoryLoaded,
} from '../../../store/category.selectors';
import { loadCategory } from '../../../store/category.actions';
import { Subject, take } from 'rxjs';
import { CategoryService } from '../Services/category.service';
import { Router } from '@angular/router';
import { ApplicationRoute, RouteTo } from '../../../app-routing.module';
import { ToStrService } from '../Services/to-str.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  providers: [CategoryService],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  categoryForm!: FormGroup;
  private destroy$ = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private tostr: ToStrService,
  ) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      urlHandle: ['', [Validators.required]],
    });
    console.log('AddCategoryComponent initialized');
  }

  onSubmit(onSubmit: Category) {
    if (this.categoryForm.invalid) {
      //alert('Please fill out the form correctly.');
      return;
    }
    console.log('Form Submitted', onSubmit);
    this.store.dispatch(
      loadCategory({
        category: onSubmit,
      }),
    );
    this.store
      .select(selectCategoryLoaded)
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.store
            .select(selectCategories)
            .pipe(take(1))
            .subscribe((categories) => {
              this.tostr.showSuccess('Category is submitted !', 'Sucess');
              // this.router.navigateByUrl('/admin/categories');
              this.router.navigate([RouteTo(ApplicationRoute.GetCategoryList)]);
              console.log('Form Submitted', onSubmit);
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
