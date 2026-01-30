import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats = [
    { title: 'Total Employees', value: '247', change: '+12', trend: 'month', color: 'blue' },
    { title: 'Store Items', value: '1,247', change: '+28', trend: 'today', color: 'emerald' },
    { title: 'Active Today', value: '89', change: '+15', trend: 'yesterday', color: 'purple' },
    { title: 'Total Revenue', value: '$45,230', change: '+8%', trend: 'week', color: 'orange' },
    { title: 'Pending Tasks', value: '23', change: '-3', trend: 'day', color: 'red' },
    { title: 'Office Usage', value: '92%', change: '+2%', trend: 'month', color: 'indigo' },
    { title: 'New Hires', value: '5', change: '+100%', trend: 'week', color: 'teal' },
    { title: 'Avg Salary', value: '$3,450', change: '+1.2%', trend: 'month', color: 'pink' }
  ];

    // ✅ HELPER METHOD - Use this in template instead of Number()
  isPositiveChange(change: string): boolean {
    return change.startsWith('+') || parseFloat(change) >= 0;
  }
}
