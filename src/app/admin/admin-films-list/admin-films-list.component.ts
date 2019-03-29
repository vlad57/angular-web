import { Component, OnInit } from '@angular/core';
import { Queries } from '../queries';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-films-list',
  templateUrl: './admin-films-list.component.html',
  styleUrls: ['./admin-films-list.component.css']
})
export class AdminFilmsListComponent implements OnInit {
  queries: Queries = new Queries();
  loading: boolean;
  toggleSidebar = false;
  listFilmSidebar = true;
  listFilms;

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: this.queries.amIAuth
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        if (!data.amIAuth.isAuth || data.amIAuth.me.type !== 'Admin') {
          this.router.navigate(['/']).catch(error => { console.log(error); });
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
  }

}
