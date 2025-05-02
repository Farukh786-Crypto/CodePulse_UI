import { Injectable } from '@angular/core';
import { HttpService } from '../../features/category/Services';
import { IImageUpload } from '../Models/AddImage.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../Models/BlogImage.model';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private https: HttpService) {}

  getAllImage(): Observable<BlogImage[]> {
    return this.https.get<BlogImage[]>('Images');
  }

  uploadImage(imageUpload: IImageUpload): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('File', imageUpload.File);
    formData.append('FileName', imageUpload.FileName);
    formData.append('Title', imageUpload.Title);

    return this.https.post<BlogImage>('Images', formData);
  }
}
