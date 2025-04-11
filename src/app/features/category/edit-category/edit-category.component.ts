import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription, take } from 'rxjs';
import {
  deleteCategory,
  getLoadCategoryById,
  updateCategory,
} from '../../../store/category.actions';
import { Store } from '@ngrx/store';
import {
  selectDeleteCategoryData,
  selectDeleteCategoryLoaded,
  selectgetCategoryById,
  selectgetCategoryByIdError,
  selectgetCategoryByIdLoading,
  selectUpdateCategories,
  selectUpdateCategoryLoaded,
} from '../../../store/category.selectors';
import { Category } from '../../../store/category.types';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApplicationRoute, RouteTo } from '../../../app-routing.module';
import { ToStrService } from '../Services';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss',
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id = 0;
  paramsSubscriptions?: Subscription;
  category?: Category;
  categoryForm!: FormGroup;

  loading$ = this.store.select(selectgetCategoryByIdLoading);
  category$ = this.store.select(selectgetCategoryById);
  error$ = this.store.select(selectgetCategoryByIdError);

  constructor(
    private router: ActivatedRoute,
    private store: Store,
    private fb: FormBuilder,
    private route: Router,
    private toastr: ToStrService,
  ) {}
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      urlHandle: ['', Validators.required],
    });
    this.paramsSubscriptions = this.router.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      if (this.id) {
        // call GetBy id api here
        this.store.dispatch(getLoadCategoryById({ categoryId: this.id }));
        // call selector after api hit
        this.category$.subscribe((res) => {
          if (res && res.data) {
            if (this.id === res.data.id) {
              // alert(res.message);
              this.category = res.data;
              this.categoryForm.patchValue({
                id: res.data.id,
                name: res.data.name,
                urlHandle: res.data.urlHandle,
              });
            }
          }
        });
      }
    });
  }

  onFormSubmit(categoryForm: FormGroup) {
    if (this.categoryForm.invalid) {
      this.toastr.showError('Please Filed Category', 'Error');
      return;
    }
    console.log('Form Submitted !!', categoryForm);
    this.store.dispatch(
      updateCategory({
        categoryId: this.categoryForm.get('id')?.value,
        category: this.categoryForm.value,
      }),
    );
    // admin/categories
    this.store
      .select(selectUpdateCategories)
      .pipe(take(1))
      .subscribe((res) => {
        if (res?.success) {
          this.toastr.showSuccess('Category is Saved !!', 'success');
          // this.route.navigateByUrl('/admin/categories');
          this.route.navigate([RouteTo(ApplicationRoute.GetCategoryList)]);
        }
      });
  }

  deleteCategoryClick() {
    //
    this.store.dispatch(
      deleteCategory({ categoryId: this.categoryForm.get('id')?.value }),
    );

    this.store
      .select(selectDeleteCategoryLoaded)
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.store
            .select(selectDeleteCategoryData)
            .pipe(take(1))
            .subscribe((data) => {
              if (data?.success) {
                //alert(data.message);
                // this.route.navigateByUrl('/admin/categories');
                this.route.navigate([
                  RouteTo(ApplicationRoute.GetCategoryList),
                ]);
              }
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.paramsSubscriptions?.unsubscribe();
  }
}
