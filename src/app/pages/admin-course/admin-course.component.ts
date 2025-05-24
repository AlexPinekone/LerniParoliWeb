import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-admin-course',
  imports: [NgIf, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './admin-course.component.html',
  styleUrl: './admin-course.component.css'
  
})
export class AdminCourseComponent implements OnInit {
  courseForm!: FormGroup;

  constructor(private fb: FormBuilder, private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  save(): void {
    console.log('Guardando...', this.courseForm.value);
    
    if (this.courseForm.invalid) return;

    const course = this.courseForm.value;
    course.imageBig = course.image;

    this.courseService.createCourse(course).subscribe({
      next: (res) => {
        console.log('Curso creado:', res);
        this.courseForm.reset(); // Opcional: limpiar el formulario
      },
      error: (err) => {
        console.error('Error al guardar el curso:', err);
      }
    });
  }
}
