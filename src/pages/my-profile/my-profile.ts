import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  token:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    this.nativeStorage.getItem('token_access')
      .then(data => {
        console.log(data)
        this.token = data
      },
      error => console.error(error),
      
    );
  }

}
