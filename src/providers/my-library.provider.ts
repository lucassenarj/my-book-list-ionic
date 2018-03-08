import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './database.provider';
import { GlobalVars } from './global-vars';

@Injectable()

export class MyLibraryProvider {

  base64Image;

  constructor(private database: DatabaseProvider, private globalVars: GlobalVars) {
    
  }
  
  public insert(book: Book) {
    this.globalVars.getBase64ImageFromURL(book.volumeInfo.imageLinks.small).subscribe(base64data => {
      this.base64Image = 'data:image/jpg;base64,' + base64data;
    });

    return this.database.getDatabase().then((db: SQLiteObject) => {
      let sql = 'insert into books (bookId, title, description, author, thumbnail, category_id) values (?, ?, ?, ?, ?, ?)';
      let data = [book.id, book.volumeInfo.title, book.volumeInfo.description, book.volumeInfo.authors, this.base64Image, 1];
      return db.executeSql(sql, data)
      .catch((error) => {
        console.error(error)
      });
    }).catch((error) => console.error(error));
  }

  public getAll() {
    return this.database.getDatabase()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT b.*, c.name as category_name FROM books b inner join categories c on b.category_id = c.id';
        var data: any[] = [];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let books: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var book = data.rows.item(i);
                books.push(book);
              }
              return books;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getBookOffline(id) {
    console.log('Book id in getBookOffline:'+ id);
    return this.database.getDatabase()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM books WHERE id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              return item;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}

export class Book {
  id: number;
  bookId: string;
  volumeInfo: {
    title: string;
    description: string;
    authors: string;
    imageLinks: {
      small: string,
    };
    category_id: number;
  }
}