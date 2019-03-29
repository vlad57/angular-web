import { Component, OnInit } from '@angular/core';
import { Queries } from '../queries';
import {Apollo} from 'apollo-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  queries: Queries = new Queries();
  loading: boolean;
  toggle = false;

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
  }

}
