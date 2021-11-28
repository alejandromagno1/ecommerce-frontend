import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import { Observable } from 'rxjs';
import { Questions } from '../models/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(private http: HttpClient) { }

  path: string = '/questions/';

  getAll() {
    return this.http.get(API_URL + this.path);
  }

  getAllByState(data: Boolean) {
    return this.http.get(API_URL + this.path + 'state/' + data);
  }

  getAllById(id: Number) {
    return this.http.get(API_URL + this.path + id);
  }

  getQuestEnabled(data: boolean) {
    return this.http.get(API_URL + this.path + 'enabled/' + data);
  }

  add(data: Questions): Observable<Questions> {
    return this.http.post<Questions>(API_URL + this.path, data);
  }

  update(data: Questions): Observable<Questions> {
    return this.http.put<Questions>(API_URL + this.path + data.id, data);
  }
}
