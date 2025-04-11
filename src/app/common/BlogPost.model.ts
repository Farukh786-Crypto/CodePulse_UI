import { Category } from '../store/category.types';

export interface BlogPost {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  publishedDate: string;
  author: string;
  isVisible: true;
  categories: Category[];
}
