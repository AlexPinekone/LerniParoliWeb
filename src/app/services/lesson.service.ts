import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson } from '../interfaces/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private baseUrl = 'http://localhost:8080/api/lessons';

  constructor(private http: HttpClient) {}

  getLessonsByCourse(courseId: string): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.baseUrl}/course/${courseId}`);
  }

  getLessonById(courseId: string, lessonId: string): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.baseUrl}/${courseId}/${lessonId}`);
  }

  createLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(this.baseUrl, lesson);
  }

  //Por hacer
  deleteLesson(lessonId: string): Observable<Lesson>{
    return this.http.delete<Lesson>(`${this.baseUrl}/${lessonId}`);
  }

  updateLesson(lessonId: string, lesson: Lesson): Observable<Lesson> {
    return this.http.put<Lesson>(`${this.baseUrl}/${lessonId}`, lesson);
  }
}