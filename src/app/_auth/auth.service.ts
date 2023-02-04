import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { observable, Observable, Subject, throwError } from 'rxjs';
import { TokenResponse } from './auth-dtos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { CONSTANTS } from '../_common/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authKey = 'auth-'+CONSTANTS.APP_KEYNAME;
  private clientId = CONSTANTS.APP_KEYNAME;

  constructor(private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any) { }

  login(token: string): Observable<TokenResponse> {
    const url = environment.API_URL + '/login';
    return this.httpClient.post<TokenResponse>([
      environment.API_URL,
      'auth',
      'login',
    ].join('/'), token);
  }

  logout() {
    this.Auth = null;
  }

  //#region serverRequest
  sendToken(token:string): Observable<string> {
    return this.httpClient.post<string>(`${environment.API_URL}/login/filter`, token);
  }
  //#endregion

  //#region gets and sets
  get isLoggedIn():boolean{
    return localStorage.getItem(this.authKey) != null;
  }

  get isAdmin(): boolean{
    return false //me falta el Api | TODO
  }

  get isMusic(): boolean{
    return false //me falta el Api | TODO
  }

  get isTechTeam(): boolean{
    return false //me falta el Api | TODO
  }

  get isDessigner(): boolean{
    return false //me falta el Api | TODO
  } 
  get Auth(): TokenResponse | null {
    const temp = localStorage.getItem(this.authKey);
    if (temp) {
      return JSON.parse(temp);
    }
    return null;
  }
  set Auth(auth: TokenResponse | null) {
    if (auth) {
        localStorage.setItem(
            this.authKey,
            JSON.stringify(auth));
    } else {
        localStorage.removeItem(this.authKey);
    }
  }
  //#endregion
  
}