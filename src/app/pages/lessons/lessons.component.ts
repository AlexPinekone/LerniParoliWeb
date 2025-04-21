import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../interfaces/lesson';
import { NgFor } from '@angular/common';
import { LessonCardComponent } from '../../components/lesson-card/lesson-card.component';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [NgFor, LessonCardComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit {
  lessons: Lesson[] = [];

  ngOnInit(): void {
    this.lessons = [
      {
        id: '1',
        title: 'Presente Perfecto',
        description: 'Aprende cómo usar el presente perfecto para hablar de experiencias pasadas con relevancia actual.',
        image: 'https://cdn.pixabay.com/photo/2015/12/10/21/44/english-1084980_1280.jpg',
        theoryId: '201',
        practices: [
          { id: 'p1', title: 'Uso de "have" y "has"' },
          { id: 'p2', title: 'Participios comunes' }
        ],
        progress: 40,
        courseId: 'eng01'
      },
      {
        id: '2',
        title: 'Pasado Simple',
        description: 'Domina el uso del pasado simple para contar acciones ya finalizadas.',
        image: 'https://cdn.pixabay.com/photo/2016/11/29/06/18/english-1867183_1280.jpg',
        theoryId: '202',
        practices: [
          { id: 'p3', title: 'Reglas de verbos regulares' },
          { id: 'p4', title: 'Verbos irregulares comunes' }
        ],
        progress: 70,
        courseId: 'eng01'
      },
      {
        id: '3',
        title: 'Futuro Simple',
        description: 'Aprende a hablar sobre predicciones, promesas y decisiones espontáneas.',
        image: 'https://cdn.pixabay.com/photo/2014/12/27/15/40/english-581575_1280.jpg',
        theoryId: '203',
        practices: [
          { id: 'p5', title: 'Uso de "will" y "going to"' },
          { id: 'p6', title: 'Frases afirmativas y negativas' }
        ],
        progress: 55,
        courseId: 'eng01'
      },
      {
        id: '4',
        title: 'Condicionales',
        description: 'Explora los diferentes tipos de condicionales para hablar sobre posibilidades y situaciones hipotéticas.',
        image: 'https://cdn.pixabay.com/photo/2017/08/06/10/59/learn-2590695_1280.jpg',
        theoryId: '204',
        practices: [
          { id: 'p7', title: 'Primer condicional' },
          { id: 'p8', title: 'Segundo condicional' }
        ],
        progress: 25,
        courseId: 'eng01'
      }
    ];
  }
}