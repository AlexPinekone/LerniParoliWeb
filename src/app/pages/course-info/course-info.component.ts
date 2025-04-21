import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseInfo } from '../../interfaces/course-info';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css'],
  standalone: true,
  imports: [NgFor, NgIf]
})

export class CourseInfoComponent implements OnInit {
  course!: CourseInfo;

  allCourses: CourseInfo[] = [
    {
      id: '1',
      title: 'Inglés Básico',
      description: 'El inglés es uno de los idiomas más hablados y es esencial para la comunicación internacional...',
      origin: 'Inglaterra',
      regions: ['Estados Unidos', 'Reino Unido', 'Canadá', 'Australia', 'India'],
      imageUrls: [
        'https://source.unsplash.com/600x300/?english,london',
        'https://source.unsplash.com/600x300/?english,classroom'
      ],
      stats: {
        speakers: '1500 millones',
        difficulty: 'Media',
        popularity: 'Alta'
      }
    },
    {
      id: '2',
      title: 'Francés Intermedio',
      description: 'El francés es una lengua romance hablada en muchas partes del mundo...',
      origin: 'Francia',
      regions: ['Francia', 'Canadá', 'Suiza', 'Bélgica', 'África Occidental'],
      imageUrls: [
        'https://source.unsplash.com/600x300/?paris,french',
        'https://source.unsplash.com/600x300/?france,language'
      ],
      stats: {
        speakers: '300 millones',
        difficulty: 'Alta',
        popularity: 'Media'
      }
    },
    // Puedes agregar más cursos aquí
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idCourse');
    this.course = this.allCourses.find(c => c.id === id)!;

    if (!this.course) {
      this.router.navigate(['/not-found']);
    }
  }

  startCourse() {
    this.router.navigate([`/course/${this.course.id}/lessons`]);
  }
}