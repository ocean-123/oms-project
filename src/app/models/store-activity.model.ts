import { Items } from './items.model';
import { Category } from './category.model';

export interface StoreActivity {
  id?: number;
  item: Items;
  category?: Category;
  transactionType: string;
  sourceType: string;
  sourceName: string;
  destinationType?: string;
  destinationName?: string;
  quantity: number;
  transactionDate?: string;
  remarks: string;
  processedBy?: string;
}