import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from '../../services/image.service';
import { IImageUpload } from '../../Models/AddImage.model';
import { Subject, takeUntil } from 'rxjs';
import { ToStrService } from '../../../features/category/Services';
import { BlogImage } from '../../Models/BlogImage.model';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ImageService],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.scss',
})
export class ImageSelectorComponent implements OnInit, OnDestroy {
  private file?: File;
  fileName = '';
  title = '';
  private destroy$ = new Subject<void>();
  images: BlogImage[] = [];
  @Output() imageUrlSelected = new EventEmitter<BlogImage>();

  constructor(
    private tostr: ToStrService,
    private imageService: ImageService,
  ) {}

  ngOnInit(): void {
    this.getImage();
  }

  getImage() {
    this.imageService
      .getAllImage()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.images = response;
          }
        },
        error: (error) => {
          this.tostr.showError(error);
        },
      });
  }

  onFileUploadChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(form: NgForm) {
    if (this.file && this.fileName !== '' && this.title !== '') {
      // Image service to upload the image
      const uploadImage = new IImageUpload();
      uploadImage.File = this.file;
      uploadImage.FileName = this.fileName;
      uploadImage.Title = this.title;

      this.imageService
        .uploadImage(uploadImage)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            if (res) {
              this.tostr.showSuccess('Image is upload succesfully', 'Success');
              console.log(res);
            }
          },
          error: (err) => {
            this.tostr.showError(err);
          },
          complete: () => {
            // called another api here
            this.getImage();
            // after sucess reset my form
            form.resetForm();
          },
        });
    }
  }

  selectImage(image: BlogImage) {
    this.imageUrlSelected.emit(image);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
