import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListeusersComponent } from './listeusers/listeusers.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ArticlesComponent } from './articles/articles.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { ThemeComponent } from './theme/theme.component';

const routes: Routes = [
  {path: "add-article", component : AddArticleComponent},
  {path:"update-article/:id", component: UpdateArticleComponent},
  {path: "", redirectTo: "articles", pathMatch: "full"},
  {path: "articles", component : ArticlesComponent},
  {path:"register",component :RegisterComponent},
  {path :"login",component: LoginComponent},
  {path :'listeusers',component: ListeusersComponent},
  {path :'users/update/:id',component : UpdateUserComponent},
  {path :'theme' ,component :ThemeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
