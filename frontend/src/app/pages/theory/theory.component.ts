import { Component, OnInit } from '@angular/core';
import { Theory, TheoryBlock } from '../../interfaces/theory-block';
import { NgFor, NgIf } from '@angular/common';
import { TheoryService } from '../../services/theory.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-theory',
  imports: [NgFor, NgIf],
  templateUrl: './theory.component.html',
  styleUrl: './theory.component.css'
})
export class TheoryComponent implements OnInit {
  theory: Theory | null = null;             // contiene el objeto completo
  content: TheoryBlock[] = [];   

  selectedAnswer: string | null = null;
  quizFeedback: string = '';

  constructor(private theoryService: TheoryService, private route: ActivatedRoute) {}
  
   ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('idCourse');
    const lessonId = this.route.snapshot.paramMap.get('idLesson');

    if (!courseId || !lessonId) {
      console.error('Faltan IDs en la URL');
      return;
    }

    this.theoryService.getTheory(courseId, lessonId).subscribe({
      next: (theory) => {
        this.theory = theory;
        this.content = theory.blocks;
      },
      error: (err) => console.error('Error al obtener la teoría:', err)
    });
  }
  
  handleAnswer(answer: string, correct: string) {
    this.selectedAnswer = answer;
    this.quizFeedback = answer === correct ? '✅ ¡Correcto!' : '❌ Incorrecto. Intenta de nuevo.';
  }
}
