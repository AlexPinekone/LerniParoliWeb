import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-lesson',
  imports: [NgIf, NgFor, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './admin-lesson.component.html',
  styleUrl: './admin-lesson.component.css'
})
export class AdminLessonComponent implements OnInit {
  lessonForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Suponiendo que el contenido viene de un servicio
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      theoryId: [''],
      practiceIds: [[]]
    });

    // Aquí puedes hacer un GET por id si ya existe la lección
    // y luego hacer: this.lessonForm.patchValue(leccion)
  }

  save(): void {
    const data = this.lessonForm.value;
    console.log('Lección guardada:', data);
    // Aquí puedes enviar a tu API
  }

  openTheoryEditor(): void {
    const id = this.lessonForm.get('theoryId')?.value;
    if (id) {
      this.router.navigate(['/admin-panel/1/1/T/1', id]);
    } else {
      // Redirigir a creación de teoría
      this.router.navigate(['/admin-panel/1/1/T/new']);
    }
  }

  openPracticeEditor(practiceId?: string): void {
    if (practiceId) {
      this.router.navigate(['/admin-panel/1/1/P/1', practiceId]);
    } else {
      this.router.navigate(['/admin-panel/1/1/P/new']);
    }
  }

  addPractice(): void {
    const current = this.lessonForm.get('practiceIds')?.value || [];
    this.openPracticeEditor(); // Abre uno nuevo
    // Aquí podrías esperar a que se cree y luego agregarlo al arreglo
  }
}
