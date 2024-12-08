  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { AuthentificationService } from '../services/authentification.service';


  @Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.css'] // Corrected `styleUrl` to `styleUrls`
  })
  export class UpdateUserComponent implements OnInit {
    updateUserForm: FormGroup;
    userId: string = '';
    loading: boolean = false;
    errorMessage: string = '';

    constructor(
      private route: ActivatedRoute,
      private userService: AuthentificationService, // Corrected the variable name
      private fb: FormBuilder,
      private router: Router
    ) {
      // Initialize the form using FormBuilder
      this.updateUserForm = this.fb.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        role: ['', [Validators.required]]
      });
    }

    ngOnInit(): void {
      // Retrieve the UserId from the route parameters
      this.userId = this.route.snapshot.paramMap.get('id') || '';

      // Load the user's details to pre-fill the form
      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe(
          (user : any) => {
            // Pre-fill the form with the user's details
            this.updateUserForm.patchValue({
              username: user.username,
              email: user.email,
              role: user.role
            });
          },
          (error) =>{
            console.error('Error retrieving user information', error);
          }
        );
      }
    }

    // Submit the update user form
    onSubmit(): void {
      if (this.updateUserForm.valid) {
        console.log('Form submitted' ,this.updateUserForm.value);

        this.loading = true;
        this.userService.updateUser(this.userId, this.updateUserForm.value).subscribe(
          (response) => {
            console.log(' utilisateur mis a jour avec succés :', response);
            this.loading = false;
            alert('Utilisateur mis a jour avec succés : !');
            this.router.navigate(['/listeusers']); // Redirect after successful update
          },
          (error) => {
            this.loading = false;
            this.errorMessage = 'Error lors de la mise a jour de l\'utilisateur .';
            console.error(error);
          }
        );
      }
  }
  }
