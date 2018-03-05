import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BooksService } from '../../providers/books.service';
import { Storage } from '@ionic/storage';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database.provider';
import { ToastController } from 'ionic-angular';
import { MyLibraryProvider } from '../../providers/my-library.provider';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-book-details',
  templateUrl: 'book-details.html',
  providers: [
    BooksService,
    DatabaseProvider
  ]
})
export class BookDetailsPage {

  public book;
  public bookId;

  constructor(public myLibrary: MyLibraryProvider, public navCtrl: NavController, public navParams: NavParams, private books: BooksService, private storage: Storage, private database: DatabaseProvider, private toastCtrl: ToastController) {
  }

  ionViewDidEnter() {
    this.bookId = this.navParams.get("id");
    
    this.books.getBookDetails(this.bookId).subscribe(data=>{
      let response = (data as any)._body;
      let object = JSON.parse(response);
      this.book = object;
    }, error=>{
      console.log(error);
    })
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
