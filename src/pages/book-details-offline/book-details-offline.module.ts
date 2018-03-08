import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookDetailsOfflinePage } from './book-details-offline';

@NgModule({
  declarations: [
    BookDetailsOfflinePage,
  ],
  imports: [
    IonicPageModule.forChild(BookDetailsOfflinePage),
  ],
})
export class BookDetailsOfflinePageModule {}
