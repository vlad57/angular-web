import {Component, OnInit} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Queries } from '../../queries';
import { Mutations } from '../../mutations';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  queries: Queries = new Queries();
  mutations: Mutations = new Mutations();
  loading: boolean;
  isNormalConnected = false;
  listFilms;
  listFilmsUser;
  getIdFilmUserArray: Array<any> = new Array<any>();
  isCreatedFilmUser: boolean;
  getUserId: string;
  getFilmName: string;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: this.queries.amIAuth
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        if (data.amIAuth.isAuth && data.amIAuth.me.type === 'Normal') {
          this.isNormalConnected = true;
        }
      });

    this.apollo.watchQuery<any>({
      query: this.queries.listFilms
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.listFilms = data.films;
      });

    this.apollo.watchQuery<any>({
      query: this.queries.filmsUser
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.listFilmsUser = data.filmsUser;
        this.getIdFilmUser();
      });
  }

  addFilmToUser(idFilm: string) {
    this.apollo.mutate({
      mutation: this.mutations.createFilmUser,
      variables: {
        idFilm: idFilm.toString()
      }
    }).subscribe(result => {
      this.getFilmName = result.data.createFilmUser.film.name;
      this.getUserId = result.data.createFilmUser.user.id;
      this.getIdFilmUserArray.push(result.data.createFilmUser.film.id);
      this.isCreatedFilmUser = true;
    });
  }

  dismissAlert() {
    this.isCreatedFilmUser = false;
  }

  getIdFilmUser() {
    for (let i = 0; this.listFilmsUser[i]; i++) {
      this.getIdFilmUserArray[i] = this.listFilmsUser[i].film.id;
    }
  }

}
