import {Component, OnInit, enableProdMode} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Queries} from './queries';
import {Router} from '@angular/router';
import { PlatformLocation} from '@angular/common';

enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'SerialWatcher';
  pathnameLocationUrl;
  isHomeMenu = false;
  isFilmsMenu = false;
  loading: boolean;
  queries: Queries = new Queries();
  isAuth;
  username;
  clickedUserDropDown = false;

  constructor(private apollo: Apollo, private router: Router, private platformLocation: PlatformLocation) {
    this.pathnameLocationUrl = platformLocation.pathname;
  }

  ngOnInit(): void {
    console.log(this.pathnameLocationUrl);
    if (this.pathnameLocationUrl === '/angular-web/films') {
      this.isFilmsMenu = true;
    }
    if (this.pathnameLocationUrl === '/angular-web/') {
      this.isHomeMenu = true;
    }
    this.apollo.watchQuery<any>({
      query: this.queries.amIAuth,
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.isAuth = data.amIAuth.isAuth;
        if (data.amIAuth.isAuth) {
          this.username = data.amIAuth.me.username;
        }
      });
  }

  logOut() {
    localStorage.setItem('token', '');
    this.apollo.getClient().resetStore().catch(error => { console.log(error); });
    this.isAuth = false;
    this.clickedUserDropDown = false;
    this.router.navigate(['/']).catch(error => { console.log(error); });
    window.location.reload();
  }

  showDropDownButton() {
    this.clickedUserDropDown = !this.clickedUserDropDown;
  }
}
