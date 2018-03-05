import { Component, ViewChild } from '@angular/core';
import { BooksService } from '../../providers/books.service';
import { Slides, NavController } from 'ionic-angular';
import { BookDetailsPage } from '../../pages/book-details/book-details';

@Component({
  selector: 'my-library',
  templateUrl: 'my-library.html',
  providers: [
    BooksService
  ]
})
export class MyLibraryComponent {
  @ViewChild(Slides) slides: Slides;

  listBooks = new Array<any>();

  constructor(private books: BooksService, private navCtrl: NavController) {
    this.books.getBooks()
      .subscribe(data=>{
        const response = (data as any);
        const object_return = JSON.parse(response._body);
        this.listBooks = object_return.items;
      }, error=>{
        console.log(error);
      })
    
  }

  gotoNextSlide() {
    this.slides.slideNext();
  }

  gotoPrevSlide() {
    this.slides.slidePrev();
  }

  bookDetails(bookId){
    this.navCtrl.push(BookDetailsPage, {id: bookId});
  }
}
