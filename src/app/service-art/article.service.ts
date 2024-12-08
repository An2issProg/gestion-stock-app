
import { Injectable } from '@angular/core';
import { Article } from '../model/article.model';
import { Categorie } from '../model/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private tab_art: Article[] = [];
  private categories: Categorie[] = [];


  constructor() {
    // Initialisation des catég ories
    this.categories = [
      { codec: "1", nomCat: "Périphérique PC", description: "Périphériques d'entrée/sortie pour les PCs" },
      { codec: "2", nomCat: "Eléctroménager", description: "Toutes les marques disponibles" },
      { codec: "3", nomCat: "Smartphone", description: "Toutes les marques de téléphones" },
      { codec: "4", nomCat: "TV VEGA", description: "Périphériques d'entrée/sortie pour les PCs" },
      { codec: "5", nomCat: "Processeur", description: "Toutes les marques de Television" },
      { codec: "6", nomCat: "RECEPTEUR StarSat", description: "Toutes les marques de recepteur" },
      { codec: "7", nomCat: "Electronique", description: "Toutes les marques disponibles" },
      { codec: "8", nomCat: "PC gamer", description: "TToutes les marques disponibles" },
      { codec: "9", nomCat: "Clavier", description: "TToutes les marques disponibles "},
      { codec: "10", nomCat: "Carte Graphique", description: "Toutes les marques disponibles" },
      { codec: "11", nomCat: "Imprimante", description: "Toutes les marques disponibles" },
      { codec: "12", nomCat: "Box Android", description: "Toutes les marques disponibles" },
      { codec: "7", nomCat: "IPHONE Nouveau", description: "NOUVELLE ARRIVAGE" },
      { codec: "8", nomCat: "Samsung", description: "Toutes les marques des iPhones" },
      { codec: "9", nomCat: "Ecran", description: "Toutes les marques des Ecrans" }
    ];

    // Initialisation des articles avec leurs catégories respectives
    this.tab_art = [
      {
        codea: 1,  libelle: "Souris Wifi",
        prix: 39.100, qte: 8, dateAjout: new Date("09/27/2022"),
        categ: { codec: "1", nomCat: "Périphérique PC", description: "Périphériques d'entrée/sortie pour les PCs" }
      },

      {
        codea: 2,
        libelle: "Clavier Gaming",
        prix: 45.900,
        qte: 11,
        dateAjout: new Date("09/30/2022"),
        categ: { codec: "1", nomCat: "Périphérique PC", description: "Périphériques d'entrée/sortie pour les PCs" }
      },
      {
        codea: 3,libelle: "Samsung S21",
        prix: 678.9, qte: 5,dateAjout: new Date("10/02/2022"),
        categ: { codec :"3", nomCat: "Smartphone", description: "Toutes les marques de téléphones" }
      }
    ];
  }


  // Retourne la liste des articles
  listeArticles(): Article[] {
    return this.tab_art;
  }
  getCategories(): Categorie[] {
    return this.categories;
  }
  // Retourne la liste des catégories
  listerCategories(): Categorie[] {
    return this.categories;
  }

  // Retourne une catégorie par son identifiant
  consulterCategorie(id: number): Categorie | undefined {
    return this.categories.find(cat => cat.codec === id.toString());
  }

  // Ajoute un nouvel article
  ajouterArticle(art: Article): void {
    this.tab_art.push(art);
    console.log("Ajout avec succès : " + art.libelle);
  }



  // Supprime un article
  supprimerArticle(art: Article): void {
    const index = this.tab_art.findIndex(existingArt => existingArt.codea === art.codea);
    if (index > -1) {
      this.tab_art.splice(index, 1);
      console.log("Article supprimé avec succès : " + art.libelle );
    } else {
      console.log("Article non trouvé !");
    }
  }


  consulterArticle(id: number): Article | undefined {
    return this.tab_art.find(art => art.codea === id) || new Article();
  }


  // Modifie un article existant
  modifierArticle(art: Article): void {
    const index = this.tab_art.findIndex(existingArt => existingArt.codea === art.codea);
    if (index !== -1) {
      this.tab_art[index] = art;
      console.log("Artic  le modifié avec succès : " + art.libelle);
    } else {
      console.log("Article introuvable pour modification : " + art.codea);
    }
  }

}
