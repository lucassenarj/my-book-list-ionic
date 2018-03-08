import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GlobalVars } from "../providers/global-vars";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { HttpModule, Http } from '@angular/http';
import { ExtendedHttpService } from '../providers/extended-http.service';
import { ProfileService } from '../providers/profile.service'

import { NativeStorage } from '@ionic-native/native-storage';
import { PopularMoviesComponent } from '../components/popular-movies/popular-movies';
import { MoviesService } from '../providers/movies.service';
import { MyLibraryComponent } from '../components/my-library/my-library';
import { PopularBooksComponent } from '../components/popular-books/popular-books';
import { BookDetailsPage } from '../pages/book-details/book-details';
import { BookDetailsOfflinePage } from '../pages/book-details-offline/book-details-offline';
import { IonicStorageModule } from '@ionic/storage';
import { DatabaseProvider } from '../providers/database.provider';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { MyLibraryProvider } from '../providers/my-library.provider';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MyProfilePage,
    PopularMoviesComponent,
    MyLibraryComponent,
    BookDetailsPage,
    PopularBooksComponent,
    BookDetailsOfflinePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MyProfilePage,
    BookDetailsPage,
    BookDetailsOfflinePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Http, useClass: ExtendedHttpService},
    GlobalVars,
    NativeStorage,
    ProfileService,
    MoviesService,
    DatabaseProvider,
    SQLite,
    MyLibraryProvider
  ]
})
export class AppModule {}
