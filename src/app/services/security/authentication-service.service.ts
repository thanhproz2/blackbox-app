import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiUrl } from '../../utils/apiUrl';
import { CookieService } from 'ngx-cookie-service';
import { constants } from '../constants';
import { Observable, Subscription, observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private apiUrl: any;
  constructor(private http: HttpClient, private url: apiUrl, private _cookieService: CookieService, private _constants: constants) {
    this.apiUrl = url;
  }

  login(username: string, password: string, grecaptchaResponse: string) {
    return this.http.post(this.apiUrl.login,
      {
        username: username,
        password: password,
        grecaptchaResponse: grecaptchaResponse
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/vnd.blackbox.v1+json'
        })
      }
    ).pipe(response => {
      // if (!response || !response.data.success) {
      // }

      return response;

    }, function errorCallback(response) {
      return response;
    });
  }

  saveCookie(loginInfo: any) {
    this._cookieService.set(this._constants.auth_key, loginInfo);
  }

  getCookieId() {
    const a = this._cookieService.get(this._constants.auth_key);
    return a;
  }

  logOut() {
    this._cookieService.delete(this._constants.auth_key);
  }

  getPassword(email: string) {
    return this.http.post(this.apiUrl.forgot_password,
      {
        username: email
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/vnd.blackbox.v1+json'
        })
      }
    ).pipe((response)=>{
      return response;
    },function errorCallback(response) {
      return response;
    });
  }
}
