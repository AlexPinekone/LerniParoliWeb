import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LessonService } from '../../services/lesson.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-lesson',
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './admin-lesson.component.html',
  styleUrl: './admin-lesson.component.css'
})
export class AdminLessonComponent implements OnInit {
  lessonForm!: FormGroup;
   courseId!: string;
   lessonId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('idCourse') || '';
    this.lessonId = this.route.snapshot.paramMap.get('idLesson') || '';
    // Suponiendo que el contenido viene de un servicio
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      theoryId: [''],
      practiceId: ['']
    });

    if (this.lessonId) {
      // Si lessonId existe, estamos editando una lección existente
      this.lessonService.getLessonById(this.courseId, this.lessonId).subscribe({
        next: (lesson) => {
          this.lessonForm.patchValue(lesson);
          // Asegúrate de que theoryId y practiceIds se inicialicen correctamente
          // Si tu backend devuelve un objeto complejo para theory/practice,
          // quizás necesites mapear solo los IDs aquí.
          this.lessonForm.get('theoryId')?.patchValue(lesson._id); // Asumiendo que viene como ID
          this.lessonForm.get('practiceIds')?.patchValue(lesson._id ); // Asumiendo un array de IDs
        },
        error: (error) => {
          console.error('Error al cargar lección:', error);
          this.snackBar.open('Error al cargar la lección', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/admin/courses', this.courseId, 'lessons']);
        }
      });
    }
  }

  save(): void {
    if (this.lessonForm.invalid) {
      this.snackBar.open('Por favor, completa todos los campos requeridos.', 'Cerrar', { duration: 3000 });
      return;
    }

    const lessonData = {
      ...this.lessonForm.value,
      idCourse: this.courseId // Asociar la lección al curso
    };

    if (this.lessonId) {
      // Actualizar lección existente
      this.lessonService.updateLesson(this.lessonId, lessonData).subscribe({
        next: () => {
          this.snackBar.open('Lección actualizada exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/admin/courses', this.courseId, 'lessons']);
        },
        error: (error) => {
          console.error('Error al actualizar lección:', error);
          this.snackBar.open('Error al actualizar la lección', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      // Crear nueva lección
      this.lessonService.createLesson(lessonData).subscribe({
        next: (res) => {
          this.snackBar.open('Lección creada exitosamente', 'Cerrar', { duration: 3000 });
          // Opcional: Podrías redirigir a editar la lección recién creada para agregar teoría/práctica
          this.router.navigate(['/admin/courses', this.courseId, 'lessons', 'edit', res._id]); // res._id es el ID de la nueva lección
        },
        error: (error) => {
          console.error('Error al guardar lección:', error);
          this.snackBar.open('Error al guardar la lección', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  openTheoryEditor(): void {
    // Si la lección ya tiene una teoría, vamos a la ruta de edición
    if (this.lessonForm.value.theoryId) {
      this.router.navigate([`/admin/courses/${this.courseId}/lessons/${this.lessonId}/theory/edit`, this.lessonForm.value.theoryId]);
    } else {
      // Si no tiene, vamos a la ruta de creación
      // Asegúrate de que la lección ya esté creada para poder asociar la teoría
      if (this.lessonId) {
        this.router.navigate([`/admin/courses/${this.courseId}/lessons/${this.lessonId}/theory/new`]);
      } else {
        this.snackBar.open('Primero guarda la lección para poder agregar una teoría.', 'Cerrar', { duration: 3000 });
      }
    }
  }

  // Nota: La práctica debe estar creada para poder asociarla
  openPracticeEditor(): void {
    if (this.lessonId) {
      if (this.lessonForm.value.practiceId) {
        this.router.navigate([`/admin/courses/${this.courseId}/lessons/${this.lessonId}/practice/edit`, this.lessonForm.value.practiceId]);
      } else {
        this.router.navigate([`/admin/courses/${this.courseId}/lessons/${this.lessonId}/practice/new`]);
      }
    } else {
      this.snackBar.open('Primero guarda la lección para poder agregar una práctica.', 'Cerrar', { duration: 3000 });
    }
  }
  // Cuando se añade una práctica, se asume que se crea en otra pantalla
  // y luego el ID de la práctica se devuelve para ser agregado a practiceIds de la lección
  // Esto requerirá una lógica más avanzada con diálogos o redirecciones y retorno de IDs.
  // Por ahora, solo redirige a la creación.
  addPractice(): void {
    this.openPracticeEditor(); // Abre el editor para crear una nueva práctica
  }

  // Métodos para eliminar teoría/práctica (opcional, si el backend lo soporta)
  deleteTheory(): void {
    if (this.lessonForm.value.theoryId && confirm('¿Estás seguro de que quieres desvincular y eliminar esta teoría?')) {
      // Llama a tu servicio de teoría para eliminarla
      // this.theoryService.deleteTheory(this.lessonForm.value.theoryId).subscribe(...)
      this.lessonForm.get('theoryId')?.patchValue(''); // Limpia el ID en el formulario
      this.snackBar.open('Teoría desvinculada (y eliminada si tu backend lo hace).', 'Cerrar', { duration: 3000 });
      // Deberías guardar la lección para persistir el cambio de theoryId = ''
      this.save();
    }
  }

  deletePractice(): void {
  if (this.lessonForm.value.practiceId && confirm('¿Estás seguro de que quieres eliminar esta práctica?')) {
    // this.practiceService.deletePractice(this.lessonForm.value.practiceId).subscribe(...)
    this.lessonForm.get('practiceId')?.patchValue('');
    this.snackBar.open('Práctica desvinculada (y eliminada si tu backend lo hace).', 'Cerrar', { duration: 3000 });
    this.save();
  }
}
}
