import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import ICase from '../interfaces/ICase';

@Injectable({
  providedIn: 'root',
})
export class CasosEnArgentinaService {

  constructor(private _http: HttpClient) {}

  getAll() {
    return this._http.get<Array<ICase>>('https://api.covid19api.com/total/dayone/country/argentina/status/confirmed')
      .pipe(
        catchError(this._handleError),
      );
  }

  private _handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Ocurrio un error:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend retorno el error  ${error.status}, ` +
        `con el cuerpo: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Algo no salio bien, Por favor intente de nuevo mas tarde');
  }
}