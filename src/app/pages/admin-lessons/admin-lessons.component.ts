import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { CourseService } from '../../services/course.service'; // Para obtener el título del curso
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-lessons',
  standalone: true,
  imports: [
    CommonModule, NgFor, NgIf,
    MatButtonModule, MatIconModule, MatListModule, MatDividerModule,
    RouterModule
  ],
  templateUrl: './admin-lessons.component.html',
  styleUrls: ['./admin-lessons.component.css']
})

export class AdminLessonsComponent implements OnInit {
  courseId!: string;
  courseTitle: string = 'Cargando...'; // Para mostrar el nombre del curso
  lessons: any[] = []; // Reemplaza 'any' con una interfaz de Lesson

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService,
    private courseService: CourseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('idCourse') || '';
    if (this.courseId) {
      this.loadCourseDetails();
      this.loadLessons();
    } else {
      this.snackBar.open('ID de curso no proporcionado.', 'Cerrar', { duration: 3000 });
      this.router.navigateByUrl('/admin/courses');
    }
  }

  loadCourseDetails(): void {
    this.courseService.getOneCourse(this.courseId).subscribe({
      next: (course) => {
        this.courseTitle = course.title;
      },
      error: (error) => {
        console.error('Error al cargar detalles del curso:', error);
        this.courseTitle = 'Curso no encontrado';
      }
    });
  }

  loadLessons(): void {
    this.lessonService.getLessonsByCourse(this.courseId).subscribe({
      next: (data) => {
        this.lessons = data || [];
      },
      error: (error) => {
        console.error('Error al cargar lecciones:', error);
        this.snackBar.open('Error al cargar las lecciones', 'Cerrar', { duration: 3000 });
      }
    });
  }

  deleteLesson(lessonId: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta lección? Esto también eliminará su teoría y prácticas asociadas.')) {
      this.lessonService.deleteLesson(lessonId).subscribe({
        next: () => {
          this.snackBar.open('Lección eliminada exitosamente', 'Cerrar', { duration: 3000 });
          this.loadLessons(); // Recarga la lista de lecciones
        },
        error: (error) => {
          console.error('Error al eliminar lección:', error);
          this.snackBar.open('Error al eliminar la lección', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}