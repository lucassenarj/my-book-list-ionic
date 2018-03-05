import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()

export class DatabaseProvider {

  constructor(private sqllite: SQLite) {
    
  }
  
  public getDatabase(){
    return this.sqllite.create({
      name: 'books.db',
      location: 'default'
    });
  }

  public createDatabase(){
    return this.getDatabase().then((db: SQLiteObject) => {
      this.createTables(db);

      this.insertDefaultItems(db);


    }).catch(error => console.log(error));
  }

  private createTables(db: SQLiteObject){
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS categories (id integer primary key AUTOINCREMENT NOT NULL, name TEXT)'],
      ['CREATE TABLE IF NOT EXISTS books (id integer primary key AUTOINCREMENT NOT NULL, bookId TEXT, title TEXT, description TEXT, author TEXT, thumbnail TEXT, category_id integer, FOREIGN KEY(category_id) REFERENCES categories(id))'],
    ]).then(() => console.log('table create'))
    .catch(error => console.error('Error while create tables', error));
  }

  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from categories', {})
    .then((data: any) => {
      //If not exist any category
      if (data.rows.item(0).qtd == 0) {

        // create tables
        db.sqlBatch([
          ['insert into categories (name) values (?)', ['Read']],
          ['insert into categories (name) values (?)', ['Not Read']],
          ['insert into categories (name) values (?)', ['Favorite']]
        ])
          .then(() => console.log('Default categories inserted'))
          .catch(error => console.error('Error while try to include default categories', error));

      }
    })
    .catch(error => console.error('Error while try select the categories', error));
  }

}
