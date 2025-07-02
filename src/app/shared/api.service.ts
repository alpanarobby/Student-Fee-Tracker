import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  postStudent(data: any) {
  console.log('Sending POST data:', data);  // ✅ Add this line
  return this.http.post<any>(`${this.baseUrl}/students`, data);
}

  getStudent() {
    return this.http.get<any>(`${this.baseUrl}/students`);
  }

  updateStudent(data: any, id: number) {
    return this.http.put<any>(`${this.baseUrl}/students/${id}`, data);
  }

  deleteStudent(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/students/${id}`);
  }
}