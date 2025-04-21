import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-course',
  imports: [NgIf, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './admin-course.component.html',
  styleUrl: './admin-course.component.css'
  
})
export class AdminCourseComponent implements OnInit {
  courseForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  save(): void {
    console.log('Curso guardado:', this.courseForm.value);
    // Aquí puedes mandar los datos a tu backend o servicio
  }
}
