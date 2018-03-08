import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BooksService } from '../../providers/books.service';
import { Storage } from '@ionic/storage';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database.provider';
import { ToastController } from 'ionic-angular';
import { MyLibraryProvider, Book } from '../../providers/my-library.provider';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-book-details-offline',
  templateUrl: 'book-details-offline.html',
  providers: [
    BooksService,
    DatabaseProvider
  ]
})
export class BookDetailsOfflinePage {

  book;

  constructor(public myLibrary: MyLibraryProvider, public navCtrl: NavController, public navParams: NavParams, private books: BooksService, private storage: Storage, private database: DatabaseProvider, private toastCtrl: ToastController) {
    if (this.navParams.data.id) {
      this.myLibrary.getBookOffline(this.navParams.data.id)
        .then((result) => {
          //console.log('Resultado: ' + JSON.stringify(result));
          this.book = JSON.stringify(result);
        })
    }
  }

  ionViewDidLoad() {
    
  }

  presentToast(alert) {
    let toast = this.toastCtrl.create({
      message: alert,
      duration: 3000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });
  
    toast.present();
  }

  addBookMyLibrary(book){
    this.myLibrary.insert(book).then(()=>{
      this.presentToast('Book added!');
      this.navCtrl.setRoot(HomePage);
    }).catch((error) => {
      console.log(error);
    })
  }
  

}
