import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { GlobalVars } from "./global-vars";
import { Http } from '@angular/http';

@Injectable()

export class BooksService {

  private baseApiPath = "https://www.googleapis.com/books/v1/";

  private getApiKey(): string {
    return "&key={key}";
  }

  constructor(private http: Http) {
    
  }

  getBooks(){
    return this.http.get(this.baseApiPath+'volumes?q=harry+potter&'+this.getApiKey()+'&maxResults=12');
  }

  getBookDetails(bookId){
    return this.http.get(this.baseApiPath+'volumes/'+ bookId + '?' + this.getApiKey());
  }
  

}
