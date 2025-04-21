import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-admin-theory',
  imports: [NgIf, NgFor, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './admin-theory.component.html',
  styleUrl: './admin-theory.component.css'
})
export class AdminTheoryComponent implements OnInit {
  theoryForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
    const data = this.theoryForm.value;
    console.log('Contenido guardado:', data);
    // Aquí podrías mandarlo a tu API con HttpClient
  }
}
import { NgFor, NgIf } from '@angular/common';
