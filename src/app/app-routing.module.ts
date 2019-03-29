import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminFilmAddComponent } from './admin/admin-film-add/admin-film-add.component';
import { AdminFilmsListComponent } from './admin/admin-films-list/admin-films-list.component';
import { AdminFilmDetailComponent } from './admin/admin-film-detail/admin-film-detail.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserFilmsComponent } from './user/user-films/user-films.component';
import { FilmsListComponent } from './films/films-list/films-list.component';

const routes: Routes = [
  { path: 'admin', component: AdminHomeComponent },
 /* { path: 'admin/home', component: AdminHomeComponent },*/
  { path: 'admin/film-add', component: AdminFilmAddComponent },
  { path: 'admin/films-list', component: AdminFilmsListComponent },
  { path: 'admin/film-detail/:id', component: AdminFilmDetailComponent },
  { path: 'user', component: UserHomeComponent },
  { path: 'user/films', component: UserFilmsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'films', component: FilmsListComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
