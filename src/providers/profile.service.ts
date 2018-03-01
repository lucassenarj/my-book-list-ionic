import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { GlobalVars } from "./global-vars";
import { Http } from '@angular/http';

@Injectable()

export class ProfileService {

  constructor(private http: Http, private vars: GlobalVars) {
    
  }

  getProfile(){
    return this.http.get('/api/perfil?token='+ this.vars.getToken);
  }

}
