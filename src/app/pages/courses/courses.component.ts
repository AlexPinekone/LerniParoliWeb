import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../interfaces/course-card'
import { CourseCardComponent } from '../../components/course-card/course-card.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent {
  courses: CourseCard[] = [
    {
      id: '1',
      title: 'Inglés Básico',
      description: 'Aprende lo esencial del idioma inglés.',
      imageUrl: 'https://source.unsplash.com/400x200/?english,language'
    },
    {
      id: '2',
      title: 'Francés Intermedio',
      description: 'Desarrolla tus habilidades en francés.',
      imageUrl: 'https://source.unsplash.com/400x200/?french,language'
    },
    {
      id: '3',
      title: 'Alemán Avanzado',
      description: 'Domina el alemán como un nativo.',
      imageUrl: 'https://source.unsplash.com/400x200/?german,language'
    }
  ];
}
