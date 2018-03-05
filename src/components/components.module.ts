import { NgModule } from '@angular/core';
import { PopularMoviesComponent } from './popular-movies/popular-movies';
import { MyLibraryComponent } from './my-library/my-library';
@NgModule({
	declarations: [PopularMoviesComponent,
    MyLibraryComponent],
	imports: [],
	exports: [PopularMoviesComponent,
    MyLibraryComponent]
})
export class ComponentsModule {}
