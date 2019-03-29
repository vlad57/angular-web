import { Component, OnInit } from '@angular/core';
import { Queries } from '../queries';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  queries: Queries = new Queries();
  toggleUserMenuActive = true;
  loading: boolean;

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
  }

}
