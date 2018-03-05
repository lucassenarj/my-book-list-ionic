import { Component, ViewChild } from '@angular/core';
import { BooksService } from '../../providers/books.service';
import { Slides } from 'ionic-angular';

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

  constructor(private books: BooksService) {
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



}
