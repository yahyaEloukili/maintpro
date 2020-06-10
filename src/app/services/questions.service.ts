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
export class QuestionService {
  constructor(private http: HttpClient, private prod: prod) { }

  getQuestions(): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/questions/`
    );
  }
  getQuestionsofmetier(metierId): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/questions?metierId=${metierId}`
    );
  }
  getQuestionsoftheme(themeId): Observable<{ success: boolean; data: any[] }> {
    return this.http.get<{ success: boolean; data: any[] }>(
      `${this.prod.link}/questions?themeId=${themeId}`
    );
  }
  addQuestion(question: any): Observable<{ success: boolean; data: any }> {
    return this.http.post<{ success: boolean; data: any }>(
      `${this.prod.link}/questions`,
      question
    );
  }
  getQuestion(id: string): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(
      `${this.prod.link}/questions/` + id
    );
  }

  editQuestion(id: string, Question): Observable<{ success: boolean; data: any }> {
    return this.http.put<{ success: boolean; data: any }>(
      `${this.prod.link}/questions/` + id,
      Question
    );
  }

  deleteQuestion(id: string): Observable<{ success: boolean; data: {} }> {
    return this.http.delete<{ success: boolean; data: {} }>(
      `${this.prod.link}/questions/` + id
    );
  }
}
