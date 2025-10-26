import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service'; // Necesitarás un servicio de cursos
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar'; // Para notificaciones

@Component({
  selector: 'app-admin-panel',
  standalone: true, // Asumo que usas Standalone Components
  imports: [
    CommonModule, NgFor, NgIf,
    MatButtonModule, MatIconModule, MatListModule, MatDividerModule,
    RouterModule // Para routerLink
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})

export class AdminPanelComponent implements OnInit {
  courses: any[] = []; // Reemplaza 'any' con una interfaz de Course

  constructor(
    private courseService: CourseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error al cargar cursos:', error);
        this.snackBar.open('Error al cargar los cursos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  deleteCourse(courseId: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este curso? Esto también eliminará sus lecciones, teorías y prácticas asociadas.')) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.snackBar.open('Curso eliminado exitosamente', 'Cerrar', { duration: 3000 });
          this.loadCourses(); // Recarga la lista de cursos
        },
        error: (error) => {
          console.error('Error al eliminar curso:', error);
          this.snackBar.open('Error al eliminar el curso', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}