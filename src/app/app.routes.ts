import { Routes } from '@angular/router';
import { EmployeeProfileComponent } from './component/employee-profile/employee-profile/employee-profile.component';
import { OfficeActivityComponent } from './component/office-activity/office-activity.component/office-activity.component';
import { StoreActivityComponent } from './component/store-activity/store-activity.component/store-activity.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeProfileComponent },
  { path: 'office-activity', component: OfficeActivityComponent },
  { path: 'store-activity', component: StoreActivityComponent }
];