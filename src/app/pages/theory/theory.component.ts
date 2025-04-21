import { Component, OnInit } from '@angular/core';
import { TheoryBlock } from '../../interfaces/theory-block';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-theory',
  imports: [NgFor, NgIf],
  templateUrl: './theory.component.html',
  styleUrl: './theory.component.css'
})
export class TheoryComponent implements OnInit {
  content: TheoryBlock[] = [];

  ngOnInit(): void {
    this.content = [
      { type: 'title', content: '¿Qué es una Variable?' },
      { type: 'subtitle', content: 'Introducción a Variables en Programación' },
      { type: 'text', content: 'Una variable es un contenedor que almacena un valor para ser usado en el programa.' },
      { type: 'image', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Variable_example.svg/1200px-Variable_example.svg.png', alt: 'Ejemplo de Variable' },
      { type: 'code', language: 'javascript', content: 'let x = 5;\nconsole.log(x);' },
      { type: 'interactive', component: 'quiz', data: { question: '¿Qué palabra reservada se usa para declarar una variable en JavaScript?', options: ['var', 'let', 'const'], correct: 'let' } },
      { type: 'subtitle', content: 'Introducción a Variables en Programación' },
      { type: 'text', content: 'Una variable es un contenedor que almacena un valor para ser usado en el programa.' },
    ];
  }

  selectedAnswer: string | null = null;
  quizFeedback: string = '';
  
  handleAnswer(answer: string, correct: string) {
    this.selectedAnswer = answer;
    this.quizFeedback = answer === correct ? '✅ ¡Correcto!' : '❌ Incorrecto. Intenta de nuevo.';
  }
}
