import { Component, OnInit } from '@angular/core';
import { Queries } from '../queries';
import { Mutations} from '../mutations';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-films',
  templateUrl: './user-films.component.html',
  styleUrls: ['./user-films.component.css']
})
export class UserFilmsComponent implements OnInit {
  queries: Queries = new Queries();
  mutations: Mutations = new Mutations();
  toggleFilmsMenuActive = true;
  loading: boolean;
  loading2: boolean;
  loading3: boolean;
  loading4: boolean;
  
  stateButtonAllFilms = true;
  stateButtonNotViewedFilms = false;
  stateButtonViewedFilms = false;

  listFilmsUser: Array<any> = new Array<any>();
  listFilmsNotViewed: Array<any> = new Array<any>();
  listFilmsViewed: Array<any> = new Array<any>();

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: this.queries.amIAuth
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        if (!data.amIAuth.isAuth || data.amIAuth.me.type !== 'Normal') {
          this.router.navigate(['/']).catch(error => { console.log(error); });
        }
      });

    this.apollo.watchQuery<any>({
      query: this.queries.filmsUser
    })
      .valueChanges
      .subscribe(({data, loading}) => {
        this.loading = loading;
        this.listFilmsUser = data.filmsUser;
        console.log(this.listFilmsUser);
      });
  }

  getFilmsUser() {
    this.stateButtonAllFilms = true;
    this.stateButtonNotViewedFilms = false;
    this.stateButtonViewedFilms = false;
    this.apollo.watchQuery<any>({
      query: this.queries.filmsUser
    })
      .valueChanges
      .subscribe(({data, loading}) => {
        this.loading2 = loading;
        this.listFilmsUser = data.filmsUser;
        console.log('getFilmsUser');
      });
  }

  getFilmsUserNotFinished() {
    this.stateButtonAllFilms = false;
    this.stateButtonNotViewedFilms = true;
    this.stateButtonViewedFilms = false;
    this.apollo.watchQuery<any>({
      query: this.queries.filmsUserNotFinished
    })
      .valueChanges
      .subscribe(({data, loading}) => {
        this.loading3 = loading;
        this.listFilmsNotViewed = data.filmsUserNotFinished;
        console.log('getFilmsUserNotFinished');
      });
  }

  getFilmsUserFinished() {
    this.stateButtonAllFilms = false;
    this.stateButtonNotViewedFilms = false;
    this.stateButtonViewedFilms = true;
    this.apollo.watchQuery<any>({
      query: this.queries.filmsUserFinished
    })
      .valueChanges
      .subscribe(({data, loading}) => {
        this.loading4 = loading;
        this.listFilmsViewed = data.filmsUserFinished;
        console.log('getFilmUserFinished');
      });
  }

  checkFilmAsViewed(idFilmUser: string, progress: string, finish: boolean) {
    this.apollo.mutate({
      mutation: this.mutations.updateFilmUser,
      variables: {
        idFilmUser: idFilmUser.toString(),
        progress: progress.toString(),
        finish: finish.valueOf()
      },
      refetchQueries: [
        {
          query: this.queries.filmsUserNotFinished
        },
        {
          query: this.queries.filmsUserFinished
        },
        {
          query: this.queries.filmsUser
        }
        ]
    }).subscribe();
  }

  uncheckViewedFilm(idFilmUser: string, progress: string, finish: boolean) {
    this.apollo.mutate({
      mutation: this.mutations.updateFilmUser,
      variables: {
        idFilmUser: idFilmUser.toString(),
        progress: progress.toString(),
        finish: finish.valueOf()
      },
      refetchQueries: [
        {
          query: this.queries.filmsUserFinished
        },
        {
          query: this.queries.filmsUserNotFinished
        },
        {
          query: this.queries.filmsUser
        }]
    }).subscribe(() => {
    });
  }

  deleteFilmFromUser(idFilmUser: string) {
    this.apollo.mutate({
      mutation: this.mutations.deleteFilmUser,
      variables: {
        idFilmUser: idFilmUser.toString()
      },
      refetchQueries: [
        {
          query: this.queries.filmsUserFinished
        },
        {
          query: this.queries.filmsUserNotFinished
        },
        {
          query: this.queries.filmsUser
        }]
    }).subscribe();
  }
}

