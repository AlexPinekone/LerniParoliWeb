import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LessonInfoDialogComponent } from '../lesson-info-dialog/lesson-info-dialog.component';


@Component({
  selector: 'app-lesson-card',
  imports: [],
  templateUrl: './lesson-card.component.html',
  styleUrl: './lesson-card.component.css'
})
export class LessonCardComponent {
  @Input() lesson!: {
    id: string;
    title: string;
    description: string;
    image: string;
    theoryId: string;
    practiceId: string;
    courseId: string;
  };

  constructor(private dialog: MatDialog, private router: Router) {}

  openDialog() {
    this.dialog.open(LessonInfoDialogComponent, {
      data: {
        ...this.lesson,
        goToTheory: () =>
          this.router.navigate([`/course/${this.lesson.courseId}/lessons/T/${this.lesson.theoryId}`]),
        goToPractice: () =>
          this.router.navigate([`/course/${this.lesson.courseId}/lessons/P/${this.lesson.practiceId}`])
      }
    });
  }
}
