import { Items } from './items.model';
import { Category } from './category.model';

export interface StoreInventory {
  id?: number;
  item: Items;
  category?: Category;
  currentStock: number;
  minimumStock: number;
  lastUpdated?: string;
}