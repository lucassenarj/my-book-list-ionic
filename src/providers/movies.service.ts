import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { GlobalVars } from "./global-vars";
import { Http } from '@angular/http';

@Injectable()

export class MoviesService {

  private baseApiPath = "https://api.themoviedb.org/3";

  private getApiKey(): string {
    return "51e4e9d52532d389174b5252cd99d33d";
  }

  constructor(private http: Http) {
    
  }

  getPopularMovies(page = 1){
    return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=` + this.getApiKey());
  }
  

}
