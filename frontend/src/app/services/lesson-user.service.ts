import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonUserService {
  private baseUrl = 'http://localhost:8080/api/lessons-user'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  createLessonUser(idLesson: string, username: string, idCourse: string, status: string) {
    return this.http.post(`${this.baseUrl}/${idLesson}/${username}`, {
      idLesson,
      username,
      idCourse,
      status
    });
  }

  getLessonsUserByCourse(idCourse: string, username: string) {
    return this.http.get(`${this.baseUrl}/${idCourse}/${username}`);
  }
}