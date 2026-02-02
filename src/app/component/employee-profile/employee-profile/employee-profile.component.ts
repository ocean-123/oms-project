import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../service/employee/employee.service';
import { Employee } from '../../../models/employee.model';
@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  searchTerm: string = '';
  loading: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
  this.loading = true;
  
  this.employeeService.getAllEmployees().subscribe({
    next: (data) => {
      console.log('✅ Loaded', data.length, 'employees');
      
      // ✅ FIXED: Use YOUR existing /{id}/image endpoint
      this.employees = data.map(employee => ({
        ...employee,
        profileImage: employee.profileImage && employee.id
          ? `http://localhost:8848/api/employees/${employee.id}/image`  // CORRECT!
          : null
      })) as Employee[];
      
      console.log('✅ Mapped images for', this.employees.length, 'employees');
      this.loading = false;
    },
    error: (err) => {
      console.error('❌ Error:', err);
      this.loading = false;
    }
  });
}

  viewEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  searchEmployees(): void {
    if (this.searchTerm.trim()) {
      // ✅ SEARCH via your backend API
      this.employeeService.searchEmployees(this.searchTerm).subscribe({
        next: (data) => {
          console.log('✅ Search results:', data.length, 'employees');
          this.employees = data || [];
        },
        error: (err) => {
          console.error('❌ Search API Error:', err);
          // Fallback to client-side search
          this.clientSideSearch();
        }
      });
    } else {
      this.loadEmployees();  // Reload all
    }
  }

  // Fallback if search API fails
  clientSideSearch(): void {
    this.employees = this.employees.filter(emp => 
      emp.fullName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      emp.employeeCode?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      emp.department?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  closeModal(): void {
    this.selectedEmployee = null;
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
  }
}