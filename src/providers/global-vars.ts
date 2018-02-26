import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()

export class GlobalVars {

  apiUrl: string;

  constructor() {
    this.apiUrl = "https://my-book-list-laravel.herokuapp.com/api/v1";
  }

  public getApiUrl(){
    return this.apiUrl;
  }

}
