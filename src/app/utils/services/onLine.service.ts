import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { OnLine } from '../models/onLine';

@Injectable({
  providedIn: 'root'
})
export class OnLineService {
  constructor(private http: HttpClient) { }

  path: string = '/online/';

  getAll() {
    return this.http.get(API_URL + this.path);
  }

  getAllById(id: number) {
    return this.http.get(API_URL + this.path + id);
  }

  getByIdUsr(id: number) {
    return this.http.get(API_URL + this.path + 'user/' + id);
  }

  add(data: OnLine): Observable<OnLine> {
    return this.http.post<OnLine>(API_URL + this.path, data);
  }

  update(data: OnLine): Observable<OnLine> {
    return this.http.put<OnLine>(API_URL + this.path, data);
  }

  delete(id: number): Observable<OnLine> {
    return this.http.delete<OnLine>(API_URL + this.path + id);
  }
}