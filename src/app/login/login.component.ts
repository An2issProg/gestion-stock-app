import { Component } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { User } from '../models/user.model'; // Import the user model
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Correct the plural form of styleUrls
})
export class LoginComponent {
  email: string = '';  // Initialize the email property
  password: string = '';  // Initialize the password property

  constructor(private userService: AuthentificationService, private router: Router) {}

  loginUser() {
    // Call the loginUser method from the authentication service
    this.userService.loginUser(this.email, this.password).subscribe(
      (response) => {
        console.log(response);

        // Store user information in localStorage if login is successful
        localStorage.setItem('userId', response.UserId);
        localStorage.setItem('userPhoto', response.userPhoto); // Fixed the space issue here
        // Navigate to the home page
        this.router.navigate(['/articles']);
      },
      (error) => {
        console.error('Login error:', error);  // Improved error handling
      }
    );

    console.log(this.password);  // Log the password (for debugging purposes)
  }
}
