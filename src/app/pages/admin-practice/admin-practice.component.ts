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
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PracticeService } from '../../services/practice.service';

@Component({
  selector: 'app-admin-practice',
  imports: [NgFor, NgIf, ReactiveFormsModule, MatInputModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './admin-practice.component.html',
  styleUrl: './admin-practice.component.css'
})
export class AdminPracticeComponent implements OnInit {
  practiceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private practiceService: PracticeService
) {}

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
  const courseId = this.route.snapshot.paramMap.get('courseId');
  const lessonId = this.route.snapshot.paramMap.get('lessonId');

  if (!courseId || !lessonId) {
    console.error('Faltan IDs en la URL');
    return;
  }

  const raw = this.practiceForm.value;

  const questions = raw.questions.map((q: any) => {
    const correct = q.options.find((o: any) => o.correct);
    return {
      question: q.prompt,
      options: q.options.map((o: any) => o.text),
      correctAnswer: correct?.text || ''
    };
  });

  const payload = {
    idCourse: courseId,
    idLesson: lessonId,
    questions
  };

  this.http.post('http://localhost:3000/api/practices', payload).subscribe({
    next: (res) => {
      console.log('Práctica guardada:', res);
      this.router.navigate(['/course', courseId, 'lesson', lessonId]); // Ajusta si es necesario
    },
    error: (err) => {
      console.error('Error al guardar la práctica:', err);
    }
  });
}
}
