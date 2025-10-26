import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseInfo } from '../../interfaces/course-info';
import { NgFor, NgIf } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { CourseCard } from '../../interfaces/course-card';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css'],
  standalone: true,
  imports: [NgIf]
})

export class CourseInfoComponent implements OnInit {
  course!: CourseCard;

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idCourse');
    if (id) {
      this.courseService.getOneCourse(id).subscribe({
        next: (data) => this.course = data,
        error: (err) => console.error('Error cargando cursos:', err)
      });
    }

    if (!this.course) {
      this.router.navigate(['/not-found']);
    }
  }

  startCourse() {
    this.router.navigate([`/course/${this.course._id}/lessons`]);
  }
}