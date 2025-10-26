import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Lesson } from '../../interfaces/lesson';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../interfaces/course-card';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class CourseCardComponent implements OnInit{
  @Input() id!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;

  course: CourseCard | null = null;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getOneCourse(this.id).subscribe({
      next: (data) => this.course = data,
      error: (err) => console.error('Error cargando cursos:', err)
    });
  }
}
