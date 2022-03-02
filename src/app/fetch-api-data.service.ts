import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';

//Declaring the api url
const apiUrl = 'https://my-flix-list.herokuapp.com/'

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  // Handle Error Messages

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() =>
      'Something bad happened; please try again later.');
  }

  //Making api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'register', userDetails).pipe(catchError(this.handleError));
  }

  // Makes API call for user Login
  public userLogin(user: any): Observable<any> {
    console.log(user);
    return this.http.post(apiUrl + 'login', user).pipe(catchError(this.handleError));
  }

  // APi Call that gets entire list of movies

  getAllMovies(): Observable<any> {
  const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Api call gets one movie

  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'movie', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Api Call for one Director

  getDirector(directorId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'directors/' + directorId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // APi Call for one genre

  getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'genres/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Api call for one User

  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call for Favorite Movies in User list
  getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'users/' + username + '/movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  postFavoriteMovies(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post<any>(apiUrl + 'users/' + 'username/' + 'movies/' + movieId, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
  catchError(this.handleError)
  );
}

patchUser(username: string): Observable<any> {
  const token = localStorage.getItem('token');
    return this.http.patch<any>(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
      catchError(this.handleError)
    );
}

deleteUser(username: string): Observable<any> {
  const token = localStorage.getItem('token');
    return this.http.delete<any>(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
      catchError(this.handleError)
    );
}

deleteFavoriteMovie(movieId: string): Observable<any> {
  const token = localStorage.getItem('token');
    return this.http.delete<any>(apiUrl + 'users/' + 'username/' + 'movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
       catchError(this.handleError)
    );
  }

}

