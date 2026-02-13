import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component/login.component';
import { EmployeeProfileComponent } from './component/employee-profile/employee-profile/employee-profile.component';
import { OfficeActivityComponent } from './component/office-activity/office-activity.component/office-activity.component';
import { StoreActivityComponent } from './component/store-activity/store-activity.component/store-activity.component';
import { roleGuard } from './guard/role-guard';
import { DashboardComponent } from './component/dashboard/dashboard.component/dashboard.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [() => roleGuard(['ADMIN', 'EMPLOYEE', 'COUNSELOR', 'ACCOUNT'])]
  },

  {
    path: 'employees',
    component: EmployeeProfileComponent,
    canActivate: [() => roleGuard(['ADMIN'])]
  },

  {
    path: 'office-activity',
    component: OfficeActivityComponent,
    canActivate: [() => roleGuard(['ADMIN', 'ACCOUNT'])]
  },

  {
    path: 'store-activity',
    component: StoreActivityComponent,
    canActivate: [() => roleGuard(['ADMIN', 'COUNSELOR'])]
  }
];
