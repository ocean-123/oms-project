import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreActivity } from '../../models/store-activity.model';

@Injectable({
  providedIn: 'root'
})
export class StoreActivityService {
  private apiUrl = 'http://localhost:8080/api/store-activity';

  constructor(private http: HttpClient) {}

  recordActivity(activity: StoreActivity): Observable<StoreActivity> {
    return this.http.post<StoreActivity>(`${this.apiUrl}/record`, activity);
  }

  getAllActivities(): Observable<StoreActivity[]> {
    return this.http.get<StoreActivity[]>(`${this.apiUrl}/all`);
  }
}