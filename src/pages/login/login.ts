import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { GlobalVars } from "../../providers/global-vars";
import { Http, Headers, RequestOptions } from '@angular/http';
import { MyProfilePage } from '../my-profile/my-profile';

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
    console.log(this.email);
  }

  login(){
    console.log(this.email);
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    headers.append("Access-Control-Allow-Origin", '*');
    headers.append("Access-Control-Allow-Headers", 'Content-Type');
    let options = new RequestOptions({ headers: headers });

    loading.present();
    

    this.http.post('/api/login', {
      email: this.email,
      password: this.password
    }, options).subscribe(data => {
      

      if(data.status = 302){
        const response = (data as any);
        const object = JSON.parse(response._body);
        //console.log(object.data.token);
        //window.localStorage.setItem("NOME_CLIENTE", data.dados.Nome);
        window.localStorage.setItem("token", object.data.token);
        this.navCtrl.setRoot(MyProfilePage);
      } else {
        console.log(data);
      }

      loading.dismiss();

    });
  }

}
