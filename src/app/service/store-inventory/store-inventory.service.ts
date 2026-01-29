import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreInventory } from '../../models/store-inventory.model';

@Injectable({
  providedIn: 'root'
})
export class StoreInventoryService {
  private apiUrl = 'http://localhost:8080/api/inventory';

  constructor(private http: HttpClient) {}

  getAllInventory(): Observable<StoreInventory[]> {
    return this.http.get<StoreInventory[]>(`${this.apiUrl}/all`);
  }

  getLowStock(): Observable<StoreInventory[]> {
    return this.http.get<StoreInventory[]>(`${this.apiUrl}/low-stock`);
  }
}