import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component/login.component';
import { EmployeeProfileComponent } from './component/employee-profile/employee-profile/employee-profile.component';
import { OfficeActivityComponent } from './component/office-activity/office-activity.component/office-activity.component';
import { StoreActivityComponent } from './component/store-activity/store-activity.component/store-activity.component';
import { authGuard } from './guard/auth.guard';
import { DashboardComponent } from './component/dashboard/dashboard.component/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeeProfileComponent, canActivate: [authGuard] },
  { path: 'office-activity', component: OfficeActivityComponent, canActivate: [authGuard] },
  { path: 'store-activity', component: StoreActivityComponent, canActivate: [authGuard] },
  {path:'dashboard',component: DashboardComponent,canActivate:[authGuard]}
];