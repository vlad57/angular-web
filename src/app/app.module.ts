import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule} from '@angular/forms';
import {NgbModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import {ApolloModule} from 'apollo-angular';
import { HttpLinkModule} from 'apollo-angular-link-http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Interceptor} from './interceptor';

import { SignupComponent } from './signup/signup.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { FilmsListComponent } from './films/films-list/films-list.component';

import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminFilmAddComponent } from './admin/admin-film-add/admin-film-add.component';
import { AdminFilmsListComponent } from './admin/admin-films-list/admin-films-list.component';
import { AdminFilmDetailComponent} from './admin/admin-film-detail/admin-film-detail.component';

import { MenuComponent } from './user/menu/menu.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserFilmsComponent } from './user/user-films/user-films.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ConnexionComponent,
    SidebarComponent,
    AdminHomeComponent,
    AdminFilmAddComponent,
    AdminFilmsListComponent,
    AdminFilmDetailComponent,
    MenuComponent,
    UserHomeComponent,
    UserFilmsComponent,
    FilmsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbAlertModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: Interceptor,
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
