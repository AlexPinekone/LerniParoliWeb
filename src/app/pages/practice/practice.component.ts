import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PracticeQuestion } from '../../interfaces/practice-question';
import { NgClass, NgFor, NgIf } from '@angular/common';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Puedes cargar esto de una API o servicio
    this.questions = [
      {
        question: 'What is the past tense of "go"?',
        options: ['goed', 'went', 'goes', 'going'],
        correctAnswer: 'went'
      },
      {
        question: 'Choose the correct form: "She ___ to school every day."',
        options: ['go', 'goes', 'went', 'gone'],
        correctAnswer: 'goes'
      },
      {
        question: 'Which sentence uses the present perfect?',
        options: [
          'She has finished her homework.',
          'She finishes her homework.',
          'She finished her homework.',
          'She is finishing her homework.'
        ],
        correctAnswer: 'She has finished her homework.'
      }
    ];
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
    }
  }

  backToLessons(): void {
    this.router.navigate(['/course/1/lessons']);
  }
}
