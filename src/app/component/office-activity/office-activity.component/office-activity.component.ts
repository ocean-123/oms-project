import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OfficeActivityService } from '../../../service/office-activity/office-activity.service';
import { EmployeeService } from '../../../service/employee/employee.service';
import { ItemsService } from '../../../service/items/items.service';
import { OfficeActivity } from '../../../models/office-activity.model';
import { Employee } from '../../../models/employee.model';
import { Items } from '../../../models/items.model';

@Component({
  selector: 'app-office-activity',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './office-activity.component.html',
  styleUrl: './office-activity.component.css'
})
export class OfficeActivityComponent implements OnInit {
  showForm: boolean = false;
  activities: OfficeActivity[] = [];           // raw data
  filteredActivities: OfficeActivity[] = [];   // displayed data
  employees: Employee[] = [];
  items: Items[] = [];
  selectedEmployeeId: number | null = null;

  formData: any = {
    employee: null,
    item: null,
    activityType: 'STATIONARY',
    quantity: 1,
    amount: 0,
    remarks: ''
  };

  activityTypes = ['STATIONARY', 'MOBILE_PACK', 'LOAN', 'OTHER'];

  isLoading = {
    employees: false,
    items: false,
    activities: false
  };

  loadError = {
    employees: null as string | null,
    items: null as string | null,
    activities: null as string | null
  };

  dateFilter = {
    type: 'all' as 'all' | 'today' | 'yesterday' | 'custom',
    startDate: '',
    endDate: ''
  };

  constructor(
    private activityService: OfficeActivityService,
    private employeeService: EmployeeService,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadItems();
    this.loadAllActivities();
  }

  loadEmployees(): void {
    this.isLoading.employees = true;
    this.loadError.employees = null;

    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data || [];
        this.isLoading.employees = false;
      },
      error: (err) => {
        console.error('Failed to load employees:', err);
        this.loadError.employees = 'Could not load employees. Please try again later.';
        this.isLoading.employees = false;
      }
    });
  }

  loadItems(): void {
    this.isLoading.items = true;
    this.loadError.items = null;

    this.itemsService.getAllItems().subscribe({
      next: (data) => {
        this.items = data || [];
        this.isLoading.items = false;
      },
      error: (err) => {
        console.error('Failed to load items:', err);
        this.loadError.items = 'Could not load items. Please try again later.';
        this.isLoading.items = false;
      }
    });
  }

  onFilterChange(): void {
    if (this.selectedEmployeeId) {
      this.loadEmployeeActivities(this.selectedEmployeeId);
    } else {
      this.loadAllActivities();
    }
  }

  loadAllActivities(): void {
    this.isLoading.activities = true;
    this.loadError.activities = null;

    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => {
        const allActivities: OfficeActivity[] = [];
        let loadedCount = 0;

        if (employees.length === 0) {
          this.activities = [];
          this.applyDateFilter();
          this.isLoading.activities = false;
          return;
        }

        employees.forEach(employee => {
          this.activityService.getByEmployee(employee.id!).subscribe({
            next: (data) => {
              allActivities.push(...data);
              loadedCount++;
              if (loadedCount === employees.length) {
                this.activities = this.sortActivitiesByDate(allActivities);
                this.applyDateFilter();
                this.isLoading.activities = false;
              }
            },
            error: () => {
              loadedCount++;
              if (loadedCount === employees.length) {
                this.activities = this.sortActivitiesByDate(allActivities);
                this.applyDateFilter();
                this.isLoading.activities = false;
              }
            }
          });
        });
      },
      error: (err) => {
        console.error('Failed to load all activities:', err);
        this.loadError.activities = 'Failed to load activities.';
        this.isLoading.activities = false;
      }
    });
  }

  loadEmployeeActivities(employeeId: number): void {
    this.isLoading.activities = true;
    this.loadError.activities = null;

    this.activityService.getByEmployee(employeeId).subscribe({
      next: (data) => {
        this.activities = this.sortActivitiesByDate(data || []);
        this.applyDateFilter();
        this.isLoading.activities = false;
      },
      error: (err) => {
        console.error('Error loading employee activities:', err);
        this.loadError.activities = 'Failed to load activities for this employee.';
        this.isLoading.activities = false;
      }
    });
  }

  private sortActivitiesByDate(activities: OfficeActivity[]): OfficeActivity[] {
    return [...activities].sort((a, b) => {
      const dateA = a.issueDate ? new Date(a.issueDate).getTime() : 0;
      const dateB = b.issueDate ? new Date(b.issueDate).getTime() : 0;
      return dateB - dateA;
    });
  }

  applyDateFilter(): void {
    let filtered = [...this.activities];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.dateFilter.type === 'today') {
      filtered = filtered.filter(act => {
        if (!act.issueDate) return false;
        const d = new Date(act.issueDate);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === today.getTime();
      });
    }
    else if (this.dateFilter.type === 'yesterday') {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      filtered = filtered.filter(act => {
        if (!act.issueDate) return false;
        const d = new Date(act.issueDate);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === yesterday.getTime();
      });
    }
    else if (this.dateFilter.type === 'custom' && this.dateFilter.startDate && this.dateFilter.endDate) {
      const start = new Date(this.dateFilter.startDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(this.dateFilter.endDate);
      end.setHours(23, 59, 59, 999);

      filtered = filtered.filter(act => {
        if (!act.issueDate) return false;
        const d = new Date(act.issueDate);
        return d >= start && d <= end;
      });
    }

    this.filteredActivities = filtered;
  }

  submitActivity(): void {
    if (!this.formData.employee || !this.formData.item) {
      alert('Please select both employee and item');
      return;
    }

    const activity: OfficeActivity = {
      employee: this.formData.employee,
      item: this.formData.item,
      activityType: this.formData.activityType,
      quantity: this.formData.quantity,
      amount: this.formData.amount,
      remarks: this.formData.remarks
    };

    this.activityService.issueItem(activity).subscribe({
      next: () => {
        alert('Item issued successfully!');
        this.resetForm();
        this.showForm = false;
        this.onFilterChange(); // refresh with current filters
      },
      error: (err) => {
        console.error('Error issuing item:', err);
        alert('Failed to issue item');
      }
    });
  }

  getActivityIcon(activityType: string): string {
    switch (activityType) {
      case 'STATIONARY': return '📝';
      case 'MOBILE_PACK': return '📱';
      case 'LOAN': return '💰';
      case 'OTHER': return '📦';
      default: return '📋';
    }
  }

  getActivityColor(activityType: string): string {
    switch (activityType) {
      case 'STATIONARY': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'MOBILE_PACK': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'LOAN': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'OTHER': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  }

  resetForm(): void {
    this.formData = {
      employee: null,
      item: null,
      activityType: 'STATIONARY',
      quantity: 1,
      amount: 0,
      remarks: ''
    };
  }
}