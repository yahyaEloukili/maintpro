// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class StudyCaseService {

//   constructor() { }
// }
// studycases

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class QuestionsService {

//   constructor() { }
// }
import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { of } from "rxjs";
import "rxjs/add/operator/catch";
import { error } from "protractor";
import { Theme } from "../models/theme";
import { prod } from "../prod/prod";
@Injectable({
  providedIn: "root"
})
export class StudyCaseService {
  constructor(private http: HttpClient, private prod: prod) { }

  getCases(): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/studycases/`
    );
  }
  addCase(question: any): Observable<{ success: boolean; data: any }> {
    return this.http.post<{ success: boolean; data: any }>(
      `${this.prod.link}/studycases`,
      question
    );
  }
  getCase(id: string): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(
      `${this.prod.link}/studycases/` + id
    );
  }
  getCasesofmetier(metierId): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/studyCases?metierId=${metierId}`
    );
  }
  editCase(id: string, Question): Observable<{ success: boolean; data: any }> {
    return this.http.put<{ success: boolean; data: any }>(
      `${this.prod.link}/studycases/` + id,
      Question
    );
  }

  deleteCase(id: string): Observable<{ success: boolean; data: {} }> {
    return this.http.delete<{ success: boolean; data: {} }>(
      `${this.prod.link}/studycases/` + id
    );
  }
}
