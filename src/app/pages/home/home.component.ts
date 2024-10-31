import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from "./projects/projects.component";
import { RecentPostsComponent } from "./recent-posts/recent-posts.component";
import { FormsComponent } from './forms/forms.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [NgClass, FormsModule, CommonModule, ProjectsComponent, RecentPostsComponent, FormsComponent]
})

export class HomeComponent implements OnInit {
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
