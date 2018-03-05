import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BooksService } from '../../providers/books.service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-book-details',
  templateUrl: 'book-details.html',
  providers: [
    BooksService
  ]
})
export class BookDetailsPage {

  public book;
  public bookId;

  constructor(public navCtrl: NavController, public navParams: NavParams, private books: BooksService, private storage: Storage) {
  }

  ionViewDidEnter() {
    this.bookId = this.navParams.get("id");
    
    this.books.getBookDetails(this.bookId).subscribe(data=>{
      let response = (data as any)._body;
      let object = JSON.parse(response);
      this.book = object.volumeInfo;
    }, error=>{
      console.log(error);
    })
  }
  

}
