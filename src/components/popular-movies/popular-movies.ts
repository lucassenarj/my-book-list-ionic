import { Component } from '@angular/core';
import { MoviesService } from '../../providers/movies.service';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'popular-movies',
  templateUrl: 'popular-movies.html',
  providers: [
    MoviesService
  ]
})
export class PopularMoviesComponent {
  @ViewChild(Slides) slides: Slides;

  public listMovies = new Array<any>();
  public page = 1;

  constructor(private movies: MoviesService) {
    //*
    this.movies.getPopularMovies(1).subscribe(
      data=> {
        const response = (data as any);
        const object = JSON.parse(response._body);

        this.listMovies = object.results;
      }
    )
    //*/
  }

}
