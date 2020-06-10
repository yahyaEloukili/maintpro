import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { error } from 'protractor';
import { Theme } from '../models2/theme';
import { prod } from '../prod/prod';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(private http: HttpClient, private prod: prod) { }

  getThemes(): Observable<{ success: boolean; data: Theme[] }> {
    return this.http.get<{ success: boolean; data: Theme[] }>(
      `${this.prod.link}/themes/`
    );
  }
  addTheme(Theme: Theme): Observable<{ success: boolean; data: Theme }> {
    return this.http.post<{ success: boolean; data: Theme }>(
      `${this.prod.link}/themes`,
      Theme
    );
  }
  getTheme(id: string): Observable<{ success: boolean; data: Theme }> {
    return this.http.get<{ success: boolean; data: Theme }>(
      `${this.prod.link}/themes/` + id
    );
  }

  editTheme(id: string, Theme): Observable<{ success: boolean; data: Theme }> {
    return this.http.put<{ success: boolean; data: Theme }>(
      `${this.prod.link}/themes/` + id,
      Theme
    );
  }
  getThemeWithSomeFields(id?: any): Observable<{
    success: boolean;
    data: Theme[];
  }> {

    return this.http.get<{ success: boolean; data: Theme[] }>(
      `${this.prod.link}/themes?select=nom`
    );

  }
  deleteTheme(id: string): Observable<{ success: boolean; data: {} }> {
    return this.http.delete<{ success: boolean; data: {} }>(
      `${this.prod.link}/themes/` + id
    );
  }
}
