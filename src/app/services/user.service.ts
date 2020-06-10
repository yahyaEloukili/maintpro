import { Injectable } from "@angular/core";

import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { of } from "rxjs";
import "rxjs/add/operator/catch";
import { error } from "protractor";
import { prod } from "../prod/prod";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(private http: HttpClient, private prod: prod) { }
  getUsers(): Observable<{ success: boolean; data: User[] }> {
    return this.http.get<{ success: boolean; data: User[] }>(`${this.prod.link}/users/`);
  }
  getUsersOfZones(): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(`${this.prod.link}/users/userArray`);
  }
  addUser(user: User): Observable<{ success: boolean; data: User }> {
    return this.http.post<{ success: boolean; data: User }>(
      `${this.prod.link}/users`,
      user
    );
  }
  getUser(id: string): Observable<{ success: boolean; data: User }> {
    return this.http.get<{ success: boolean; data: User }>(
      `${this.prod.link}/users/` + id
    );
  }

  editUser(id: string, user): Observable<{ success: boolean; data: User }> {
    return this.http.put<{ success: boolean; data: User }>(
      `${this.prod.link}/users/` + id,
      user
    );
  }
  getUserWithSomeFields(id?: any): Observable<{
    success: boolean;
    data: User[];
  }> {

    return this.http.get<{ success: boolean; data: User[] }>(
      ` ${this.prod.link}/users?select=nom,email,role`
    );

  }
  deleteUser(id: string): Observable<{ success: boolean; data: {} }> {
    return this.http.delete<{ success: boolean; data: {} }>(
      `${this.prod.link}/users/` + id
    );
  }
}
