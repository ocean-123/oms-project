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
    
    // Try to load from API first
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.employees = data;
        } else {
          // If no data from API, use static data
          this.loadStaticData();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        // Load static data on error
        this.loadStaticData();
        this.loading = false;
      }
    });
  }

  onImageError(event: any): void {
  // Fallback to avatar if image fails to load
  event.target.style.display = 'none';
}


  loadStaticData(): void {
  // Static demo data with Google profile images
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
      status: 'ACTIVE',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
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
      status: 'ACTIVE',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
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
      status: 'ACTIVE',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      employeeCode: 'EMP004',
      fullName: 'Priya Adhikari',
      email: 'priya.adhikari@company.com',
      phone: '9871234567',
      department: 'Finance',
      designation: 'Accountant',
      joinDate: '2022-08-01',
      address: 'Pokhara, Nepal',
      status: 'ACTIVE',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      employeeCode: 'EMP005',
      fullName: 'Bikash Rai',
      email: 'bikash.rai@company.com',
      phone: '9881234567',
      department: 'IT Department',
      designation: 'Junior Developer',
      joinDate: '2023-09-15',
      address: 'Kathmandu, Nepal',
      status: 'ACTIVE',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 6,
      employeeCode: 'EMP006',
      fullName: 'Sunita Gurung',
      email: 'sunita.gurung@company.com',
      phone: '9891234567',
      department: 'Operations',
      designation: 'Operations Manager',
      joinDate: '2020-06-12',
      address: 'Lalitpur, Nepal',
      status: 'INACTIVE',
      profileImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 7,
      employeeCode: 'EMP007',
      fullName: 'Ramesh Shrestha',
      email: 'ramesh.shrestha@company.com',
      phone: '9801234567',
      department: 'Sales',
      designation: 'Sales Executive',
      joinDate: '2023-02-28',
      address: 'Kathmandu, Nepal',
      status: 'ACTIVE',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 8,
      employeeCode: 'EMP008',
      fullName: 'Maya Tamang',
      email: 'maya.tamang@company.com',
      phone: '9811234567',
      department: 'Customer Service',
      designation: 'Customer Support',
      joinDate: '2022-11-05',
      address: 'Bhaktapur, Nepal',
      status: 'ACTIVE',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 9,
      employeeCode: 'EMP009',
      fullName: 'Suresh Magar',
      email: 'suresh.magar@company.com',
      phone: '9821234567',
      department: 'IT Department',
      designation: 'System Administrator',
      joinDate: '2021-07-18',
      address: 'Kathmandu, Nepal',
      status: 'ACTIVE',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];
  
  console.log('Loaded static employee data with images:', this.employees.length, 'employees');
}


  viewEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  searchEmployees(): void {
    if (this.searchTerm.trim()) {
      // Try API search first
      this.employeeService.searchEmployees(this.searchTerm).subscribe({
        next: (data) => {
          if (data && data.length > 0) {
            this.employees = data;
          } else {
            // Search in static data
            this.searchInStaticData();
          }
        },
        error: (err) => {
          console.error('Error searching employees:', err);
          this.searchInStaticData();
        }
      });
    } else {
      this.loadEmployees();
    }
  }

  searchInStaticData(): void {
    this.loadStaticData();
    this.employees = this.employees.filter(emp => 
      emp.fullName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  closeModal(): void {
    this.selectedEmployee = null;
  }
}

// ==================== NOTES ====================
/*
WHAT I CHANGED:

1. ✅ Added loadStaticData() method with 9 sample employees
2. ✅ Modified loadEmployees() to fallback to static data if API fails
3. ✅ Modified searchEmployees() to search in static data if API fails
4. ✅ Added searchInStaticData() for local filtering
5. ✅ All employees have realistic Nepali names and data

NOW YOU CAN:
- See 9 employee cards immediately (even without backend)
- Search employees by name
- Click to view employee details
- Once your backend is ready, it will automatically switch to API data

STATIC DATA INCLUDES:
- Rajesh Kumar (Senior Developer)
- Sita Sharma (HR Manager)
- Amit Thapa (Marketing Executive)
- Priya Adhikari (Accountant)
- Bikash Rai (Junior Developer)
- Sunita Gurung (Operations Manager - INACTIVE)
- Ramesh Shrestha (Sales Executive)
- Maya Tamang (Customer Support)
- Suresh Magar (System Administrator)
*/