import { Component, OnInit } from '@angular/core';
import { Article } from '../model/article.model';
import { ArticleService } from '../service-art/article.service';  // Only import FormsModule if necessary
import { Categorie } from '../model/categorie.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']  // Corrected from styleUrl to styleUrls
})
export class AddArticleComponent implements OnInit {
//exportation de catégorie dans la liste d'articles!
  newArticle: Article = new Article();
  categories!: Categorie[];
  newcodec !:string;
  newcateg!:Categorie;  // Initialize the article object

  constructor(private router : Router,private articleService: ArticleService) { }

  // Method to add the article
  addArticle() {
    //added code! ! !
    console.log('test',this.newcodec);
    this.newcateg = this.categories.find(c => c.codec === this.newcodec)!;


    console.log('new' ,this.newcateg);
// Assignez la catégorie à l'article
    this.newArticle.categ = this.newcateg;
      // Ajoutez l'article via le service
    this.articleService.ajouterArticle(this.newArticle);

    console.log("Nouvel article ajouté :" ,this.newArticle);
    this.router.navigate(['/add-article']); // Log the new article data for verification
  }


  ngOnInit(): void {
    //added code!
    this.categories=this.articleService.listerCategories();

  }
}
