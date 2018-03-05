import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './database.provider';

@Injectable()

export class MyLibraryProvider {

  constructor(private database: DatabaseProvider) {
    
  }
  
  public insert(book: Book) {
    return this.database.getDatabase().then((db: SQLiteObject) => {
      console.log('dasdas');
      let sql = 'insert into books (bookId, title, description, author, thumbnail, category_id) values (?, ?, ?, ?, ?, ?)';
      let data = [book.id, book.volumeInfo.title, book.volumeInfo.description, book.volumeInfo.authors, book.volumeInfo.imageLinks.small, 1];
      console.log(book.id);
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