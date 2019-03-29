import { Component, OnInit } from '@angular/core';
import { Queries } from '../queries';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../model';
import { Mutations } from '../mutations';

@Component({
  selector: 'app-admin-film-add',
  templateUrl: './admin-film-add.component.html',
  styleUrls: ['./admin-film-add.component.css']
})
export class AdminFilmAddComponent implements OnInit {
  queries: Queries = new Queries();
  mutations: Mutations = new Mutations();
  filmModel: Film = new Film();
  loading: boolean;
  loadingFilm: boolean;
  toggleSidebar = false;
  addDone: boolean;

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
  }

  addFilm() {
    this.apollo.mutate({
      mutation: this.mutations.createFilm,
      variables: {
        name: this.filmModel.name,
        genre: this.filmModel.genre,
        description: this.filmModel.description,
        duration: this.filmModel.duration
      }
    }).subscribe(() => {
      this.addDone = true;
    },
      () => {
        this.addDone = false;
      });
  }

}
