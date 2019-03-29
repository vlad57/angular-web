import { Component, OnInit } from '@angular/core';
import { Queries } from '../queries';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../model';
import { Mutations } from '../mutations';

@Component({
  selector: 'app-admin-film-detail',
  templateUrl: './admin-film-detail.component.html',
  styleUrls: ['./admin-film-detail.component.css']
})

export class AdminFilmDetailComponent implements OnInit {
  queries: Queries = new Queries();
  mutations: Mutations = new Mutations();
  filmModel: Film = new Film();
  loading: boolean;
  loadingFilm: boolean;
  toggleSidebar = false;
  updateDone: boolean;

  constructor(private apollo: Apollo, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: this.queries.amIAuth,
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        if (!data.amIAuth.isAuth || data.amIAuth.me.type !== 'Admin') {
          this.router.navigate(['/']).catch(error => { console.log(error); });
        }
      });

    this.apollo.watchQuery<any>({
      query: this.queries.detailFilm,
      variables: {
        idFilm: this.route.snapshot.paramMap.get('id').toString(),
      },
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loadingFilm = loading;
        this.filmModel.name = data.film.name;
        this.filmModel.duration = data.film.duration;
        this.filmModel.genre = data.film.genre;
        this.filmModel.description = data.film.description;
      });
  }

  updateFilm() {
    this.apollo.mutate({
      mutation: this.mutations.updateFilm,
      variables: {
        id: this.route.snapshot.paramMap.get('id').toString(),
        name: this.filmModel.name,
        genre: this.filmModel.genre,
        duration: this.filmModel.duration,
        description:  this.filmModel.description
      }
    })
      .subscribe(() => {
        this.updateDone = true;
      }, () => {
        this.updateDone = false;
      });
  }
}
