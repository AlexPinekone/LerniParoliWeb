import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lesson-info-dialog',
  imports: [NgFor],
   templateUrl: './lesson-info-dialog.component.html',
  styleUrl: './lesson-info-dialog.component.css'
})
export class LessonInfoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LessonInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
