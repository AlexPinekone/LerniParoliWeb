import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PracticeLesson } from '../interfaces/practice-question';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {
  private baseUrl = 'http://localhost:8080/api/practices';

  constructor(private http: HttpClient) {}

  getPractice(idLesson: string): Observable<PracticeLesson> {
    return this.http.get<PracticeLesson>(`${this.baseUrl}/${idLesson}`);
  }

  createPractice(practice: PracticeLesson): Observable<PracticeLesson> {
    return this.http.post<PracticeLesson>(this.baseUrl, practice);
  }

  deletePractice(practiceId: string): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${practiceId}`);
}
}