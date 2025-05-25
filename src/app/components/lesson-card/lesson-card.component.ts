import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LessonInfoDialogComponent } from '../lesson-info-dialog/lesson-info-dialog.component';
import { Lesson } from '../../interfaces/lesson';


@Component({
  selector: 'app-lesson-card',
  imports: [],
  templateUrl: './lesson-card.component.html',
  styleUrl: './lesson-card.component.css'
})
export class LessonCardComponent {
  @Input() lesson!: Lesson;

  constructor(private dialog: MatDialog, private router: Router) {
  }

  openDialog() {
    //this.lesson.theoryId = "1";
    //this.lesson.practiceId = "1";
    this.dialog.open(LessonInfoDialogComponent, {
      data: {
        ...this.lesson,
        goToTheory: () =>
          this.router.navigate([`/course/${this.lesson.idCourse}/lesson/${this.lesson._id}/T/${this.lesson.theoryId}`]),
        goToPractice: () =>
          this.router.navigate([`/course/${this.lesson.idCourse}/lesson/${this.lesson._id}/P/${this.lesson.practiceId}`])
      }
    });
  }
}
