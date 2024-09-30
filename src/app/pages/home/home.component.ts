import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  isVisible = false;
  position = { x:0, y:0 };
  currentStack = { title: '', description: '' }

  stacks = {
    java: { title: 'JAVA', description: 'Most used back-end language' },
    postgres: { title: 'PostgreSQL', description: 'Open-source relational database' },
    angular: { title: 'Angular', description: 'Framework for building web applications' },
    spring: { title: 'Spring', description: 'Popular Java application framework' },
    typescript: { title: 'TypeScript', description: 'Strongly typed JavaScript superset' },
    git: { title: 'Git', description: 'Version control system' }
  };

  show(stack: string, event: MouseEvent) {
    this.currentStack = this.stacks[stack];
    this.isVisible = true;
    this.updatePosition(event);
  }

  hide() {
    this.isVisible = false;
  }

  updatePosition(event: MouseEvent) {
    this.position = {
      x: event.clientX + 10,
      y: event.clientY + 10
    };
  }

  content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }
}