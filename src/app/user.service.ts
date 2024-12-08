  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class UserService {
    private apiUrl = 'http://localhost:3001/api/users';  // Replace with your actual API endpoint

    constructor(private http: HttpClient) {}

    // Fetch all users from the backend
    getUsers(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/all`);
    }
    onDeleteUser(userId : string) :Observable <any>{
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
    // Update a user by ID
    updateUser(userId: string, userData: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${userId}`, userData);
    }
  }
