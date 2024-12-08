import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../service-art/article.service';
import { Article } from '../model/article.model';
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {
  articleCourant: Article = new Article();
  categories!: Categorie[];  // List of categories to select from
  codecModifie!: string;  // Category codec selected for update
  id: number = 0;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Method to update the article
  updateArticle(): void {
    // Check if article exists and codecModifie is selected
    if (this.articleCourant && this.codecModifie) {
      // Find the category with the selected codec
      const selectedCategory = this.categories.find(c => c.codec === this.codecModifie);
      if (selectedCategory) {
        this.articleCourant.categ = selectedCategory; // Assign the selected category
        this.articleService.modifierArticle(this.articleCourant);  // Update article
        console.log('Article updated successfully');
        this.router.navigate(['/articles']);  // Navigate back to articles list
      } else {
        console.log('Selected category not found');
      }
    }
  }

  ngOnInit(): void {
    // Retrieve the article ID from the route parameters
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    // Fetch the article with the given ID
    const article = this.articleService.consulterArticle(this.id);
    if (article) {
      this.articleCourant = { ...article };  // Copy article data into articleCourant
      this.codecModifie = article.categ.codec;  // Set the initial category codec
    } else {
      console.log('Article not found');
      this.router.navigate(['/articles']);  // Redirect to articles list if not found
    }

    // Fetch the list of categories
    this.categories = this.articleService.getCategories();
  }
}
