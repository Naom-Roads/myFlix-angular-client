import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';

//Declaring the api url
const apiUrl = 'http://localhost:8000/';
// https://my-flix-list.herokuapp.com/

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  /**
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   * @param http
   */


  constructor(private http: HttpClient) {
  }

  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    console.log(res);
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
        `Error body is: ${error.error.message}`);
    }
    return throwError(() =>
      'Something bad happened; please try again later.');
  }

  //Making api call for the user registration endpoint
  /**
   * Takes in param of users details and creates a new user
   * @function userRegistration
   * @param userDetails
   * @returns Observable of a new user object
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'register', userDetails).pipe(catchError(this.handleError));
  }

  /**
   * Post credentials of user and returns the user information
   * @function userLogin
   * @param user
   * @returns Observable of user data
   */
  public userLogin(user: any): Observable<any> {
    console.log(user);
    return this.http.post(apiUrl + 'login', user).pipe(catchError(this.handleError));
  }

  /**
   * Gives entire list of movies
   * @function getAllMovies
   * @returns Observable of an array of movies
   */
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

  /**
   * Gets information for one movie
   * @function getOneMovie
   * @returns Observable of string information for one movie
   */

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

  /**
   * Gets information for all Directors
   * @function getAllDirectors
   * @returns Observable of an array of Directors
   */

  getAllDirectors(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'directors', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Gets one director
   * @function getDirector
   * @param directorId {string}
   * @return Observable of one director object
   */

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

  /**
   * @function getAllGenres
   * @returns Observable of an array of Genres
   */

  getAllGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'genres', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Gets set of genres for one film
   * @function getGenres
   * @param genreId { string }
   * @returns Observable of genres associated with one movie
   */

  getGenres(genreId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(apiUrl + 'genres/' + genreId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Gets user information
   * @function getUser
   * @param username {string}
   * @returns Observable of user object by username
   */

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

  /**
   * @function getFavoriteMovies
   * @param username {string}
   * @returns Observable of array of favorite movies
   */
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

  /**
   * @function postFavoriteMovies
   * @param movieId {string}
   * @param username {string}
   * @return Observable of updated list of favorite movies
   */

  postFavoriteMovies(movieId: string, username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post<any>(apiUrl + 'users/' + username + '/movies/' + movieId, {}, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
  );
}

  /**
   * @function patchUser
   * @param username {string}
   * @param user {string}
   * @return Observable user information
   */

patchUser(username: string, user: any): Observable<any> {
  const token = localStorage.getItem('token');
    return this.http.patch<any>(apiUrl + 'users/' + username,
      user, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
      catchError(this.handleError)
    );
}

  /**
   * @function deleteUser
   * @param username {string}
   * @return Observable of string indicating whether removal was successful
   */

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

  /**
   * @function deleteFavoriteMovie
   * @param username {string}
   * @param movieId {string}
   * @returns Observable of string indicating whether removal was successful
   */
  deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
  const token = localStorage.getItem('token');
    return this.http.delete<any>(apiUrl + 'users/' + username + '/movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

}

