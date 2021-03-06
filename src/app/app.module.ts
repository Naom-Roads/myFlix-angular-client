import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule, Routes} from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { GenresComponent } from './genres/genres.component';
import { DirectorsComponent } from './directors/directors.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import { GravatarModule } from 'ngx-gravatar';
import { MovieDescriptionComponent } from './movie-description/movie-description.component';


const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent},
  { path: 'genres', component: GenresComponent},
  {path: 'directors', component: DirectorsComponent},
  { path: 'users/:username', component: UserProfileComponent},
  { path: 'favoriteMovies', component: FavoriteMoviesComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'prefix'},
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    GenresComponent,
    DirectorsComponent,
    FavoriteMoviesComponent,
    UserProfileComponent,
    MovieDescriptionComponent
  ],

  // Any features that need to be included from Material Design get imported here

    imports: [
        RouterModule.forRoot(appRoutes),
        MatIconModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatDialogModule,
        MatSnackBarModule,
        FormsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatDividerModule,
      GravatarModule,
    ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    MatDialogConfig,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
