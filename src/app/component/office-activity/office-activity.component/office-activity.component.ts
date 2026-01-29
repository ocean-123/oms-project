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
  employees: Employee[] = [];
  items: Items[] = [];
  
  formData: any = {
    employee: null,
    item: null,
    activityType: 'STATIONARY',
    quantity: 1,
    amount: 0,
    remarks: ''
  };

  activityTypes = ['STATIONARY', 'MOBILE_PACK', 'LOAN', 'OTHER'];

  constructor(
    private activityService: OfficeActivityService,
    private employeeService: EmployeeService,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadItems();
  }

  loadEmployees(): void {
    this.employeeService.getActiveEmployees().subscribe({
      next: (data) => this.employees = data,
      error: (err) => console.error('Error loading employees:', err)
    });
  }

  loadItems(): void {
    this.itemsService.getAllItems().subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error('Error loading items:', err)
    });
  }

  submitActivity(): void {
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
        alert('Activity recorded successfully!');
        this.resetForm();
        this.showForm = false;
      },
      error: (err) => {
        console.error('Error recording activity:', err);
        alert('Failed to record activity');
      }
    });
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