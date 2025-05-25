import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PracticeService } from '../../services/practice.service';
import { PracticeLesson, PracticeQuestion } from '../../interfaces/practice-question';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { LessonUserService } from '../../services/lesson-user.service';

interface Practice {
  idCourse: string;
  idLesson: string;
  questions: PracticeQuestion[];
}

@Component({
  selector: 'app-practice',
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css'
})
export class PracticeComponent implements OnInit {
  questions: PracticeQuestion[] = [];
  currentIndex = 0;
  selectedOption: string | null = null;
  showResult = false;
  score = 0;
  idLesson!: string;
  idCourse!: string;
  username = 'USER_ID';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private practiceService: PracticeService,
    private lessonUserService: LessonUserService
  ) {}

  ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('idLesson');
    this.idLesson = this.route.snapshot.paramMap.get('idLesson') || '';
    this.username = JSON.parse(localStorage.getItem('user') || '{}')?.username || '';

    if (lessonId) {
      this.practiceService.getPractice(lessonId).subscribe({
        next: (practice: PracticeLesson) => {
          this.questions = practice.questions;
        },
        error: (err) => console.error('Error al cargar la práctica:', err)
      });
    }
  }

  selectOption(option: string): void {
    this.selectedOption = option;
  }

  next(): void {
    if (this.selectedOption === this.questions[this.currentIndex].correctAnswer) {
      this.score++;
    }

    this.selectedOption = null;
    this.currentIndex++;

    if (this.currentIndex >= this.questions.length) {
      this.showResult = true;

      this.idCourse
      // Llamar al backend para registrar como "DONE"
      this.lessonUserService
        .createLessonUser(this.idLesson, this.username, this.idCourse, 'DONE')
        .subscribe({
          next: () => console.log('Lección marcada como completada'),
          error: (err) => console.error('Error al registrar lección completada:', err)
        });
    }
  }

  backToLessons(): void {
    // Puedes ajustar esta navegación según la estructura real de tu app
    this.router.navigate(['/courses']);
  }
}
