import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { prod } from "../prod/prod";
import { tokenNotExpired } from "angular2-jwt";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any = false;
  public expireIn: any;
  user: any;
  constructor(private http: HttpClient, private prod: prod) { }
  registerUser(user): Observable<{ success: boolean; data: any }> {
    return this.http.post<{ success: boolean; data: any }>(
      `${this.prod.link}/auth/register/`,
      user
    );
  }
  authUser(user: any): Observable<{ success: boolean; data: any } | any> {
    return this.http.post<{ success: boolean; data: any }>(
      `${this.prod.link}/auth/login`,
      user
    );
  }
  receivePassword(user: any): Observable<{ success: boolean; data: any }> {
    return this.http.post<{ success: boolean; data: any }>(
      `${this.prod.link}/auth/loginAsUser/`,
      user
    );
  }
  recetPassword(user: any): Observable<{ success: boolean; data: any }> {
    return this.http.post<{ success: boolean; data: any }>(
      `${this.prod.link}/auth/resetPassword/`,
      user
    );
  }
  storeUserData(data, expire?) {
    localStorage.setItem('expire', expire);
    localStorage.setItem(`token`, data.token);
    localStorage.setItem(`user`, JSON.stringify(data.user));
    this.authToken = data.token;
    this.user = data.user;
  }
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  getProfile(): Observable<{ success: boolean; data: any }> {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append(`Authorization`, this.authToken);
    return this.http.get<{ success: boolean; data: any }>(
      `/${this.prod.link}/auth/me/`,
      {
        headers
      }
    );
  }
  loadToken() {
    const token = localStorage.getItem("token");
    this.authToken = token;
  }
  loadUser() {
    const user = localStorage.getItem("user");
    this.user = JSON.parse(user);
  }
  loggedIn() {
    this.loadUser();
    return tokenNotExpired("token");
  }
}
