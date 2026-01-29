import { Employee } from './employee.model';
import { Items } from './items.model';
import { Category } from './category.model';

export interface OfficeActivity {
  id?: number;
  employee: Employee;
  item: Items;
  category?: Category;
  activityType: string;
  quantity: number;
  amount?: number;
  issueDate?: string;
  remarks: string;
  issuedBy?: string;
}