import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Items } from '../../models/items.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'http://localhost:8080/api/items';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<Items[]> {
    return this.http.get<Items[]>(this.apiUrl);
  }

  getItemById(id: number): Observable<Items> {
    return this.http.get<Items>(`${this.apiUrl}/${id}`);
  }

  getItemsByCategory(categoryId: number): Observable<Items[]> {
    return this.http.get<Items[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  searchItems(name: string): Observable<Items[]> {
    return this.http.get<Items[]>(`${this.apiUrl}/search?name=${name}`);
  }

  createItem(item: Items): Observable<Items> {
    return this.http.post<Items>(this.apiUrl, item);
  }

  updateItem(id: number, item: Items): Observable<Items> {
    return this.http.put<Items>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}