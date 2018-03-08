import { Component, ViewChild } from '@angular/core';
import { BooksService } from '../../providers/books.service';
import { Slides, NavController } from 'ionic-angular';
import { BookDetailsPage } from '../../pages/book-details/book-details';
import { BookDetailsOfflinePage } from '../../pages/book-details-offline/book-details-offline';
import { MyLibraryProvider } from '../../providers/my-library.provider';

@Component({
  selector: 'my-library',
  templateUrl: 'my-library.html',
  providers: [
    BooksService,
    MyLibraryProvider
  ]
})
export class MyLibraryComponent {
  @ViewChild(Slides) slides: Slides;

  listBooks = new Array<any>();

  constructor(private books: BooksService, private navCtrl: NavController, private myLibrary: MyLibraryProvider) {
    this.myLibrary.getAll()
    .then((result: any[]) => {
      this.listBooks = result;
      //console.log(this.listBooks);
    });
    
  }

  gotoNextSlide() {
    this.slides.slideNext();
  }

  gotoPrevSlide() {
    this.slides.slidePrev();
  }

  bookDetails(id){
    this.navCtrl.push(BookDetailsOfflinePage, {id: id});
  }
}
