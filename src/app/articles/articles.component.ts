import { Component, OnInit } from '@angular/core';
import { Article } from '../model/article.model';
import { ArticleService } from '../service-art/article.service';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  tab_art: Article[] = []; // Initialize the articles array

  constructor(
    private articleService: ArticleService,
    private router: Router  // Inject Router service to enable navigation
  ) {}

  /**
   * Confirms and deletes the article from the list
   * @param art - The article to delete
   */
  suppArticle(art: Article): void {
    const conf = confirm("Etes-vous sûr de vouloir supprimer cet article ?");
    if (conf) {
      this.articleService.supprimerArticle(art);
      console.log("Supprimé avec succès : " + art.libelle);
      // Optionally refresh the article list after deletion
      this.tab_art = this.articleService.listeArticles();
    }
  }

  /**
   * Navigates to the article editing page
   * @param art - The article to edit
   */
  modifArticle(art: Article): void {
    // Navigate to the update-article page with the article's ID
    this.router.navigate(['/update-article', art.codea]);
  }


  ngOnInit(): void {
    // Initialize the list of articles when the component is loaded
    this.tab_art = this.articleService.listeArticles();
  }
}
