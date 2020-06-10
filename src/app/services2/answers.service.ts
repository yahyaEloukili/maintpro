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
export class AnswersService {
  constructor(private http: HttpClient) { }

  postAnswer(body: IAnswer) {
    return this.http.post<IResponse<IAnswer>>(`${ROOT_URL}/answers/`, body);
  }
  postBulkAnswers(body: IAnswer[]) {
    return this.http.post<IResponse<IAnswer>>(`${ROOT_URL}/answers/bulk/operation`, body);
  }
  getAnswerById(id?: string) {
    return this.http.get<IResponse<IAnswer>>(`${ROOT_URL}/answers/${id}`);
  }
  updateAnswerById(body: IAnswer, id?: string) {
    return this.http.put<IResponse<IAnswer>>(`${ROOT_URL}/answers/${id}`, body);
  }
  deleteAnswerById(id: string) {
    return this.http.delete<IResponse<IAnswer>>(`${ROOT_URL}/answers/${id}`);
  }
}
