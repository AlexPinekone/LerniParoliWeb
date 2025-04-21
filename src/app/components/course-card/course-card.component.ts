import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class CourseCardComponent {
  @Input() id!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() imageUrl!: string;
}
