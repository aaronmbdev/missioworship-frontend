import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { observable, Observable, Subject, throwError } from 'rxjs';
import { TokenResponse } from './auth-dtos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { ABSOLUTES, CONSTANTS } from '../_common/constants';
import { IUserFilter } from '../_common/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authKey = 'auth-'+CONSTANTS.APP_KEYNAME;
  private authDecoded = 'auth-dec-'+CONSTANTS.APP_KEYNAME;
  private clientId = CONSTANTS.APP_KEYNAME;

  constructor(private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any) { }

  logout() {
    localStorage.removeItem(this.authKey);
    localStorage.removeItem(this.authDecoded);
  }

  //#region serverRequest
  sendToken(token:string): Observable<string> {
    return this.httpClient.post(`${environment.API_URL}/login/`, {token:token},CONSTANTS.EXPECTED_STRING);
  }
  saveToken(token: string){
    let parts = token.split('.');
    localStorage.setItem(this.authKey,token);
    localStorage.setItem(this.authDecoded,Buffer.from(parts[1], 'base64').toString('binary'));
    console.log(this.remainingSeconds);
  }
  iAmAlive():boolean{
    let rs = this.remainingSeconds;
    if(rs < 20000)
      this.renew();
    else if(rs < 1000)
      return false;
    else{
      clearTimeout(ABSOLUTES.stayAlive)
      ABSOLUTES.stayAlive = setTimeout(()=>{
        this.renew();
      },(rs-600)*1000);
    }
    return true;
  }
  private renew() {
    let token = localStorage.getItem(this.authKey);
    if(token)
      this.httpClient.post<string>(`${environment.API_URL}/login/renew`, {token:token});
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
    const temp = localStorage.getItem(this.authDecoded);
    if (temp) {
      return JSON.parse(temp);
    }
    return null;
  }
  get remainingSeconds():number{
    if(this.Auth == null)
      return 0;
    return this.Auth.exp - Math.round(Date.now()/1000);
  }
  //#endregion
  
}