import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../interfaces/lesson';
import { NgFor } from '@angular/common';
import { LessonCardComponent } from '../../components/lesson-card/lesson-card.component';
import { LessonService } from '../../services/lesson.service';
import { ActivatedRoute } from '@angular/router';
import { LessonUserService } from '../../services/lesson-user.service';


@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [NgFor, LessonCardComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit {
  lessons: Lesson[] = [];
  username = '';

   constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private lessonUserService: LessonUserService
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('idCourse');
    this.username = JSON.parse(localStorage.getItem('user') || '{}')?.username;
    if (!courseId || !this.username) return;

    this.lessonService.getLessonsByCourse(courseId).subscribe({
      next: (lessons) => {
        this.lessons = lessons;

        // obtener las lecciones completadas para el usuario
        this.lessonUserService.getLessonsUserByCourse(courseId, this.username).subscribe({
          next: (lessonUsers: any) => {
            const completedIds = lessonUsers
              .filter((lu: any) => lu.status === 'DONE')
              .map((lu: any) => lu.idLesson);

            // marcar lecciones completadas
            this.lessons = this.lessons.map((lesson) => ({
              ...lesson,
              completed: completedIds.includes(lesson._id)
            }));
          },
          error: (err) => console.error('Error al obtener estado de usuario:', err)
        });
      },
      error: (err) => console.error('Error al obtener lecciones:', err)
    });
  }
}