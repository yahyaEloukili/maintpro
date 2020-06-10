import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { error } from 'protractor';
import { Metier } from '../models2/metiers';
import { prod } from '../prod/prod';
@Injectable({
  providedIn: 'root'
})
export class MetierService {
  constructor(private http: HttpClient, private prod: prod) { }

  getMetiers(params?: URLSearchParams): Observable<{ success: boolean; data: Metier[] }> {
    params = params || new URLSearchParams();
    return this.http.get<{ success: boolean; data: Metier[] }>(
      `${this.prod.link}/metiers?${params.toString()}`
    );
  }
  addMetier(Metier: Metier): Observable<{ success: boolean; data: Metier }> {
    return this.http.post<{ success: boolean; data: Metier }>(
      `${this.prod.link}/metiers`,
      Metier
    );
  }
  getMetier(id: string): Observable<{ success: boolean; data: Metier }> {
    return this.http.get<{ success: boolean; data: Metier }>(
      `${this.prod.link}/metiers/` + id
    );
  }

  editMetier(id: string, Metier): Observable<{ success: boolean; data: Metier }> {
    return this.http.put<{ success: boolean; data: Metier }>(
      `${this.prod.link}/metiers/` + id,
      Metier
    );
  }
  getMetierWithSomeFields(id?: any): Observable<{
    success: boolean;
    data: Metier[];
  }> {

    return this.http.get<{ success: boolean; data: Metier[] }>(
      `${this.prod.link}/metiers?select=nom`
    );

  }
  deleteMetier(id: string): Observable<{ success: boolean; data: {} }> {
    return this.http.delete<{ success: boolean; data: {} }>(
      `${this.prod.link}/metiers/` + id
    );
  }
}
