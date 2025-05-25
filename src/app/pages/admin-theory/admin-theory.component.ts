import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgFor, NgIf } from '@angular/common';
import { TheoryService } from '../../services/theory.service';
import { ActivatedRoute,Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-theory',
  imports: [NgIf, NgFor, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './admin-theory.component.html',
  styleUrl: './admin-theory.component.css'
})
export class AdminTheoryComponent implements OnInit {
  theoryForm!: FormGroup;
  courseId!: string;
  lessonId!: string;

  constructor(private fb: FormBuilder,private router: Router, private theoryService: TheoryService, private route: ActivatedRoute, private snackBar: MatSnackBar,) {}

  ngOnInit(): void {
    this.theoryForm = this.fb.group({
      title: [''],
      sections: this.fb.array([])
    });

    // Se inicia con una sección por defecto
    this.addSection();
  }

  get sections(): FormArray {
    return this.theoryForm.get('sections') as FormArray;
  }

  addSection(): void {
    const section = this.fb.group({
      type: ['paragraph'], // 'title' | 'subtitle' | 'paragraph' | 'image'
      content: ['']
    });
    this.sections.push(section);
  }

  removeSection(index: number): void {
    this.sections.removeAt(index);
  }

  save(): void {
    const idCourse = this.route.snapshot.paramMap.get('idCourse');
    const idLesson = this.route.snapshot.paramMap.get('idLesson');
    const data = this.theoryForm.value;

    if (!idCourse || !idLesson) {
    console.error('Faltan IDs en la URL');
    return;
  }

    this.theoryService.saveTheory(idCourse, idLesson, data.title, data.sections)
    .subscribe({
      next: () => {
        console.log('Teoría guardada correctamente')
        this.router.navigate(['/admin-courses/lesson', idCourse, idLesson]); 
      },
      error: (err) => {
        this.snackBar.open('Formualrio no valido', 'Cerrar', { duration: 3000 });
        console.error('Error al guardar teoría:', err);
      }
    });
  }
}


