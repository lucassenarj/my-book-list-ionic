import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { PopularMoviesComponent } from '../../components/popular-movies/popular-movies'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openLogin(){
    this.navCtrl.push(LoginPage);
  }

}
