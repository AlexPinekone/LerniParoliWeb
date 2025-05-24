import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseCard } from '../interfaces/course-card';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) { }

  createCourse(course: Partial<CourseCard>): Observable<CourseCard> {
    return this.http.post<CourseCard>(this.baseUrl, course);
  }

  getCourses(): Observable<CourseCard[]> {
    return this.http.get<CourseCard[]>(this.baseUrl);
  }

  getOneCourse(idCourse: string): Observable<CourseCard> {
    return this.http.get<CourseCard>(`${this.baseUrl}/${idCourse}`);
  }
  //En proceso
  deleteCourse(idCourse: string): Observable<CourseCard>{
    return this.http.delete<CourseCard>(`${this.baseUrl}/${idCourse}`)
  }
}
