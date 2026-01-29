import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfficeActivity } from '../../models/office-activity.model';

@Injectable({
  providedIn: 'root'
})
export class OfficeActivityService {
  private apiUrl = 'http://localhost:8080/api/office-activity';

  constructor(private http: HttpClient) {}

  issueItem(activity: OfficeActivity): Observable<OfficeActivity> {
    return this.http.post<OfficeActivity>(`${this.apiUrl}/issue`, activity);
  }

  getByEmployee(employeeId: number): Observable<OfficeActivity[]> {
    return this.http.get<OfficeActivity[]>(`${this.apiUrl}/employee/${employeeId}`);
  }
}