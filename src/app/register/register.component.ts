import { Component } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: any = {};

  constructor(private userService: AuthentificationService, private router: Router) {}

  register() {
    const userData = {
      username: this.user.username,
      email: this.user.email,
      pays: this.user.pays,
      date: this.user.date,
      password: this.user.password,
      role: this.user.role,
    };

    this.userService.registerUser(userData).subscribe(
      (response) => {
        console.log(response);
        alert('Inscription réussie:');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erreur lors de l\'inscription:', error);
        // Affichez un message d'erreur à l'utilisateur si besoin
      }
    );
  }
}