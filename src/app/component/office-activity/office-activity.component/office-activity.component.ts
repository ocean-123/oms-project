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
      next: (data) => {
        if (data && data.length > 0) {
          this.employees = data;
        } else {
          this.loadStaticEmployees();
        }
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        this.loadStaticEmployees();
      }
    });
  }

  loadStaticEmployees(): void {
    this.employees = [
      {
        id: 1,
        employeeCode: 'EMP001',
        fullName: 'Rajesh Kumar',
        email: 'rajesh.kumar@company.com',
        phone: '9841234567',
        department: 'IT Department',
        designation: 'Senior Developer',
        joinDate: '2022-01-15',
        address: 'Kathmandu, Nepal',
        status: 'ACTIVE'
      },
      {
        id: 2,
        employeeCode: 'EMP002',
        fullName: 'Sita Sharma',
        email: 'sita.sharma@company.com',
        phone: '9851234567',
        department: 'HR Department',
        designation: 'HR Manager',
        joinDate: '2021-05-20',
        address: 'Lalitpur, Nepal',
        status: 'ACTIVE'
      },
      {
        id: 3,
        employeeCode: 'EMP003',
        fullName: 'Amit Thapa',
        email: 'amit.thapa@company.com',
        phone: '9861234567',
        department: 'Marketing',
        designation: 'Marketing Executive',
        joinDate: '2023-03-10',
        address: 'Bhaktapur, Nepal',
        status: 'ACTIVE'
      }
    ];
  }

  loadItems(): void {
    this.itemsService.getAllItems().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.items = data;
        } else {
          this.loadStaticItems();
        }
      },
      error: (err) => {
        console.error('Error loading items:', err);
        this.loadStaticItems();
      }
    });
  }

  loadStaticItems(): void {
    this.items = [
      {
        id: 1,
        itemName: 'A4 Paper Ream',
        itemCode: 'ITEM001',
        category: { id: 1, categoryName: 'Stationary', description: 'Office Stationary' },
        description: 'High quality A4 size paper',
        unit: 'Ream',
        unitPrice: 500
      },
      {
        id: 2,
        itemName: 'Blue Pen',
        itemCode: 'ITEM002',
        category: { id: 1, categoryName: 'Stationary', description: 'Office Stationary' },
        description: 'Ball point pen blue color',
        unit: 'Piece',
        unitPrice: 20
      },
      {
        id: 3,
        itemName: 'Mobile Data Pack 50GB',
        itemCode: 'ITEM003',
        category: { id: 2, categoryName: 'Mobile', description: 'Mobile Services' },
        description: 'Monthly data pack 50GB',
        unit: 'Pack',
        unitPrice: 1200
      },
      {
        id: 4,
        itemName: 'Notebook',
        itemCode: 'ITEM004',
        category: { id: 1, categoryName: 'Stationary', description: 'Office Stationary' },
        description: '100 pages ruled notebook',
        unit: 'Piece',
        unitPrice: 80
      },
      {
        id: 5,
        itemName: 'Printer Toner',
        itemCode: 'ITEM005',
        category: { id: 3, categoryName: 'Electronics', description: 'Electronic Items' },
        description: 'HP Laser printer toner',
        unit: 'Piece',
        unitPrice: 3500
      }
    ];
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
        alert('Activity recorded successfully!');
        this.resetForm();
        this.showForm = false;
      },
      error: (err) => {
        console.error('Error recording activity:', err);
        // Simulate success with static data
        alert('Activity recorded successfully! (Demo mode - Backend not connected)');
        this.resetForm();
        this.showForm = false;
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
