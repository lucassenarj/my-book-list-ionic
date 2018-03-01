import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProfileService } from '../../providers/profile.service';

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

  user:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nativeStorage: NativeStorage,
    private profile: ProfileService) {
  }

  ionViewDidLoad() {
    this.profile.getProfile().subscribe(
      data => {
        const response = (data as any);
        const object = JSON.parse(response._body);

        this.user = object;
      }
    )
    
  }

}
