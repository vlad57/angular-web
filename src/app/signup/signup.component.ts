import {Component, OnDestroy, OnInit} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Queries } from '../queries';
import { Mutations } from '../mutations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });
  token;
  loading: boolean;
  isGoodSign;
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

  onSubmit() {
    this.apollo.mutate({
      mutation: this.mutations.SignUp,
      variables: {
        username: this.signUpForm.get('username').value.toString(),
        email: this.signUpForm.get('email').value.toString(),
        password: this.signUpForm.get('password').value.toString()
      }
    }).subscribe((result) => {
      this.isGoodSign = true;
      localStorage.setItem('token', result.data.signup.token);
      this.router.navigate(['connexion']).catch(error => { console.log(error); });
    },
      () => {
        this.isGoodSign = false;
      });
  }

  ngOnDestroy() {
    window.location.reload();
  }

}
