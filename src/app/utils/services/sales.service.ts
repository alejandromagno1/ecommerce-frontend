import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { Sales } from '../models/sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(private http: HttpClient) { }

  path: string = '/sales/';

  getAll() {
    return this.http.get(API_URL + this.path);
  }

  getAllById(id: number) {
    return this.http.get(API_URL + this.path + id);
  }

  add(data: Sales): Observable<Sales> {
    return this.http.post<Sales>(API_URL + this.path, data);
  }

  update(data: Sales): Observable<Sales> {
    return this.http.put<Sales>(API_URL + this.path, data);
  }
}