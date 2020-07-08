import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IResponse} from "../models2/response";
import {IStudyCase} from "../models2/studyCase";
import {ROOT_URL} from "../../Config";
import {IEditions} from "../models2/Editions";

@Injectable({
  providedIn: 'root'
})
export class EditionsService {
  constructor(private http: HttpClient) {
  }
  getEditions() {
    return this.http.get<IResponse<IEditions>>(`${ROOT_URL}/editions`);
  }
}
