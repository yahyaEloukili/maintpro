import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuestion } from '../models2/question';
import { IResponse } from '../models2/response';
import { ROOT_URL } from '../../Config';
import { IStudyCase } from '../models2/studyCase';
import { IAnswer } from '../models2/answer';

@Injectable({
  providedIn: 'root'
})
export class StudyCaseService {
  constructor(private http: HttpClient) { }

  postStudyCase(body: IStudyCase) {
    return this.http.post<IResponse<IStudyCase>>(`${ROOT_URL}/studycases/`, body);
  }
  getStudyCaseById(id?: string) {
    return this.http.get<IResponse<IStudyCase>>(`${ROOT_URL}/studycases/${id}`);
  }
  updateStudyCaseById(body: IStudyCase, id?: string) {
    return this.http.put<IResponse<IStudyCase>>(`${ROOT_URL}/studycases/${id}`, body);
  }
}
