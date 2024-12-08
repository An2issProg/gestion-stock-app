import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  // Register a new user
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Login the user and get token
  loginUser(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login-user`;
    const body = { email, password };

    return this.http.post<any>(url, body, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Error during login:', error);
        return throwError('Login failed. Please try again.');
      }),
      tap(response => {
        console.log('API Response:', response); // Log to check the response
        if (response.token) {
          // Store token in cookies
          this.cookieService.set('token', response.token);
          this.cookieService.set('role', response.role);
        }
      })
    );
  }

  // Get all users (requires authentication)
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Get a user by ID (requires authentication)
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Update user details (requires authentication)
  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, userData, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Delete a user (requires authentication)
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Helper method to retrieve headers with token for secure requests
  private getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Method to validate if token is present and valid
  isTokenValid(token: string): boolean {
    // Placeholder validation logic (e.g., expiration check)
    // You can use libraries like jwt-decode to decode and validate token expiration
    return !!token;
  }

  // Centralized error handling
  private handleError(error: any): Observable<never> {
    console.error('API error occurred:', error);
    return throwError('An error occurred; please try again.');
  }

  // Retrieve the user role from the cookie
  getUserRole(): string {
    return this.cookieService.get('role');
  }

  // Check if the user is an admin
  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
}
