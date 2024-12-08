
import { Categorie } from "./categorie.model";

export class Article {
  codea!: number;
  libelle!: string;
  prix!: number;
  qte!: number;
  dateAjout!: Date;
  categ!: Categorie;
}
