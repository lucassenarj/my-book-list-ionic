import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { GlobalVars } from "../../providers/global-vars";
import { Http, Headers, RequestOptions } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public globalVars: GlobalVars, public loadingCtrl: LoadingController, public http: Http, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    loading.present();
    

    this.http.post(this.globalVars.apiUrl + '/login', {
      email: this.email,
      password: this.password,
      'form-data': 'form-data'
    }, options).subscribe(data => {

      if(data.status = 302){
        //window.localStorage.setItem("NOME_CLIENTE", data.dados.Nome);
        console.log(data);
      } else {
        console.log(data);
      }

    });
  }

}
