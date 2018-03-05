import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MyProfilePage } from '../my-profile/my-profile';
import { NativeStorage } from '@ionic-native/native-storage';
import { DatabaseProvider } from '../../providers/database.provider';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { MyLibraryProvider } from '../../providers/my-library.provider';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    SQLite
  ]
})
export class LoginPage {

  email: string;
  password: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController, 
    public http: Http, 
    public events: Events,
    private nativeStorage: NativeStorage, 
    private database: DatabaseProvider,
    private toast: ToastController,
    public myLibrary: MyLibraryProvider) {
  }

  ionViewDidLoad() {   
  }

  login(){
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
        this.nativeStorage.setItem('token_access', object.data.token)
          .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
        );
        //console.log(object.data.token);
        //window.localStorage.setItem("NOME_CLIENTE", data.dados.Nome);
        //window.localStorage.setItem("token", object.data.token);
        this.navCtrl.setRoot(MyProfilePage);
      } else {
        console.log(data);
      }

      loading.dismiss();

    });
  }
}
