import { NgModule } from '@angular/core';
import { PopularMoviesComponent } from './popular-movies/popular-movies';
import { MyLibraryComponent } from './my-library/my-library';
import { PopularBooksComponent } from './popular-books/popular-books';
@NgModule({
	declarations: [
		PopularMoviesComponent,
		MyLibraryComponent,
		PopularBooksComponent
	],
	imports: [],
	exports: [
		PopularMoviesComponent,
		MyLibraryComponent,
		PopularBooksComponent
	]
})
export class ComponentsModule {}
