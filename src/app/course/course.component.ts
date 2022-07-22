import { Component } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'courses',
  template: `<h2>{{ 'Title:' + title }}</h2>
    <ul>
      <li *ngFor="let course of courses">{{ course }}</li>
    </ul>`,
})
export class CourseComponent {
  title = 'List of courses';
  courses: any;
  constructor(service: CourseService) {
    this.courses = service.getCourses();
  }
}
