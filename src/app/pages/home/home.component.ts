import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [NgClass]
})

export class HomeComponent implements OnInit {
  isVisible = false;
  isAnimating = false;
  position = { x: 0, y: 0 };
  currentStack = { title: '', description: '' };

  // Definindo um tipo que corresponde às chaves de 'stacks'
  stackKeys: keyof typeof this.stacks = "java";

  stacks = {
    java: { title: 'Java', description: 'Most used back-end language' },
    postgres: { title: 'PostgreSQL', description: 'Open-source relational database' },
    angular: { title: 'Angular', description: 'Framework for building web applications' },
    spring: { title: 'Spring', description: 'Popular Java application framework' },
    typescript: { title: 'TypeScript', description: 'Strongly typed JavaScript superset' },
    git: { title: 'Git', description: 'Version control system' }
  };

  show(stack: keyof typeof this.stacks, event: MouseEvent) {
    this.currentStack = this.stacks[stack];
    this.isVisible = true;
    this.isAnimating = false;
    this.updatePosition(event);
  }

  hide() {
    this.isAnimating = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isAnimating = false;
    }, 400);
  }

  updatePosition(event: MouseEvent) {
    this.position = {
      x: event.clientX + 20,
      y: event.clientY + 20
    };
  }

  content?: string;

  constructor(private userService: UserService) {}

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
