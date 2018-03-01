import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()

export class GlobalVars {

  apiUrl: string;

  constructor(private nativeStorage: NativeStorage) {
    this.apiUrl = "https://my-book-list-laravel.herokuapp.com/api/v1";
  }

  public getApiUrl(){
    return this.apiUrl;
  }

  public getToken(){
    return this.nativeStorage.getItem('token_access');
  }

}
