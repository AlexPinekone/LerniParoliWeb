import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-practice',
  imports: [NgFor, NgIf, ReactiveFormsModule, MatInputModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './admin-practice.component.html',
  styleUrl: './admin-practice.component.css'
})
export class AdminPracticeComponent implements OnInit {
  practiceForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.practiceForm = this.fb.group({
      title: ['', Validators.required],
      questions: this.fb.array([])
    });

    this.addQuestion();
  }

  get questions(): FormArray {
    return this.practiceForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    const question = this.fb.group({
      prompt: ['', Validators.required],
      options: this.fb.array([
        this.fb.group({ text: '', correct: false }),
        this.fb.group({ text: '', correct: false })
      ])
    });
    this.questions.push(question);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  addOption(questionIndex: number): void {
    this.getOptions(questionIndex).push(this.fb.group({ text: '', correct: false }));
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }

  save(): void {
    const data = this.practiceForm.value;
    console.log('Práctica guardada:', data);
    // Aquí puedes enviar a tu API con HttpClient
  }
}
