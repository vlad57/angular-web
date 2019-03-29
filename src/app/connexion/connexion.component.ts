import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Queries } from '../queries';
import { Mutations } from '../mutations';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

export class ConnexionComponent implements OnInit, OnDestroy {

  connexionForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  token;
  loading: boolean;
  isGoodAuth;
  queries: Queries = new Queries();
  mutations: Mutations = new Mutations();

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: this.queries.amIAuth
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        if (data.amIAuth.isAuth && data.amIAuth.me.type === 'Admin') {
          this.router.navigate(['admin']).catch(error => { console.log(error); });
        } else if (data.amIAuth.isAuth && data.amIAuth.me.type === 'Normal') {
          this.router.navigate(['user']).catch(error => { console.log(error); });
        }
      });
  }

  onSubmit(): void {
    this.apollo.mutate({
      mutation: this.mutations.Login,
      variables: {
        email: this.connexionForm.get('email').value.toString(),
        password: this.connexionForm.get('password').value.toString()
      }
    }).subscribe(
      result => {
        this.isGoodAuth = true;
        localStorage.setItem('token', result.data.login.token);
        if (result.data.login.user.type === 'Admin') {
          this.router.navigate(['admin']).catch(error => { console.log(error); });
        } else if (result.data.login.user.type === 'Normal') {
          this.router.navigate(['user']).catch(error => { console.log(error); });
        }
      },
      () => {
        this.isGoodAuth = false;
      });
  }

  ngOnDestroy() {
    window.location.reload();
  }

}
