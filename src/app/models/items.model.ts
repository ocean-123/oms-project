import { Category } from './category.model';

export interface Items {
  id?: number;
  itemName: string;
  itemCode: string;
  category: Category;
  description: string;
  unit: string;
  unitPrice: number;
  createdDate?: string;
}