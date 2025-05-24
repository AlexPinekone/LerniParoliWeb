import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../interfaces/lesson';
import { NgFor } from '@angular/common';
import { LessonCardComponent } from '../../components/lesson-card/lesson-card.component';
import { LessonService } from '../../services/lesson.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [NgFor, LessonCardComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit {
  lessons: Lesson[] = [];

   constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('idCourse');
    if (!courseId) return;

    this.lessonService.getLessonsByCourse(courseId).subscribe({
      next: (res) => this.lessons = res,
      error: (err) => console.error('Error al obtener lecciones:', err)
    });
  }
}