import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theory } from '../interfaces/theory-block';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AdminTheoryBlock {
  type: 'title' | 'subtitle' | 'paragraph' | 'image';
  content: string;
}

@Injectable({ providedIn: 'root' })
export class TheoryService {
  constructor(private http: HttpClient) {}

  /*
  getTheory(courseId: string, lessonId: string): Observable<TheoryBlock[]> {
    return this.http.get<TheoryBlock[]>(`http://localhost:8080/api/theories/lesson/${lessonId}`)
      .pipe(
        // Solo nos interesa el array de bloques
        map((res: any) => res.blocks as TheoryBlock[])
      );
  }*/

  getTheory(courseId: string, lessonId: string): Observable<Theory> {
    return this.http.get<Theory>(`http://localhost:8080/api/theories/lesson/${lessonId}`);
  }

  saveTheory(idCourse: string, idLesson: string, title: string, blocks: AdminTheoryBlock[]): Observable<any> {
    // Transforma "paragraph" a "text" y genera los campos requeridos por el backend
    const formattedBlocks = blocks.map(block => {
      if (block.type === 'paragraph') {
        return { type: 'text', content: block.content };
      } else if (block.type === 'image') {
        return { type: 'image', src: block.content, alt: 'Imagen subida desde el editor' };
      } else {
        return { type: block.type, content: block.content };
      }
    });

    return this.http.post(`http://localhost:8080/api/theories`, {
      idCourse,
      idLesson,
      title,
      blocks: formattedBlocks
    });
  }

  deleteTheory(theoryId: string): Observable<any> {
  return this.http.delete(`http://localhost:8080/api/theories/${theoryId}`);
}
}