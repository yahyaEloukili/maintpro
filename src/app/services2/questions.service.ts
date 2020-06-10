// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class QuestionsService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { error } from 'protractor';
import { ROOT_URL } from '../../Config';
import { IQuestion } from '../models2/question';
import { IResponse } from '../models2/response';
import { IAnswer } from '../models2/answer';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  postQuestion(body: IQuestion) {
    return this.http.post<IResponse<IQuestion>>(`${ROOT_URL}/questions/`, body);
  }
  postBulkQuestions(body: IQuestion[]) {
    return this.http.post<IResponse<IQuestion>>(`${ROOT_URL}/questions/bulk/operation`, body);
  }
  getQuestionById(id?: string) {
    return this.http.get<IResponse<IQuestion>>(`${ROOT_URL}/questions/${id}`);
  }
  updateQuestionById(body: IQuestion, id?: string) {
    return this.http.put<IResponse<IQuestion>>(`${ROOT_URL}/questions/${id}`, body);
  }
  deleteQuestionById(id: string) {
    return this.http.delete<IResponse<IQuestion>>(`${ROOT_URL}/questions/${id}`);
  }
}
