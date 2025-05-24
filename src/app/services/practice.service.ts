import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PracticeLesson } from '../interfaces/practice-question';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {
  private baseUrl = 'http://localhost:3000/api/practices';

  constructor(private http: HttpClient) {}

  getPractice(id: string): Observable<PracticeLesson> {
    return this.http.get<PracticeLesson>(`${this.baseUrl}/${id}`);
  }

  createPractice(practice: PracticeLesson): Observable<PracticeLesson> {
    return this.http.post<PracticeLesson>(this.baseUrl, practice);
  }
}