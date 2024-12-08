
  import { Component,OnInit } from '@angular/core';
  import { AuthentificationService } from '../services/authentification.service';



  @Component({
    selector: 'app-listeusers',
    templateUrl: './listeusers.component.html',
    styleUrl: './listeusers.component.css'
  })
  export class ListeusersComponent  implements OnInit{
    users :any[] = [];

    constructor(private userService :AuthentificationService) {}
  ngOnInit(): void {
  this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }
  //CODE DE SUPPRESSION D'UN UTILISATEUR!
  onDeleteUser(userId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          // Mise à jour de la liste des utilisateurs après suppression
          alert('Utilisateur supprimé avec succées');
          this.users = this.users.filter(user => user._id !== userId);
        },
        (error) => {
          console.error('Erreur lors de la suppression de l’utilisateur', error);
        }
      );
    }
  }
  }
