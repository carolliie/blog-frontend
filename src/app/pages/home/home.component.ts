import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [NgClass, FormsModule, CommonModule]
})

export class HomeComponent implements OnInit, AfterViewInit {
  isVisible = false;
  isAnimating = false;
  isClickVisible = false;
  isClickAnimating = false;
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

  hideClick() {
    this.isClickAnimating = true;
    setTimeout(() => {
      this.isClickVisible = false;
      this.isClickAnimating = false;
    }, 400);
  }

  updatePosition(event: MouseEvent) {
    this.position = {
      x: event.clientX + 20,
      y: event.clientY + 20
    };
  }

  showClick() {
    this.isClickVisible = true;
    this.isClickAnimating = false;
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

  @ViewChild('path', { static: true }) path!: ElementRef<SVGPathElement>;

  ngAfterViewInit(): void {
    const pathElement = this.path.nativeElement;
    const pathLength = pathElement.getTotalLength();

    // Inicializa os valores de stroke-dasharray e stroke-dashoffset
    pathElement.style.strokeDasharray = `${pathLength}`;
    pathElement.style.strokeDashoffset = `${pathLength}`;

    if (this.path) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.to(pathElement, {
              strokeDashoffset: 0,
              duration: 3,
              ease: 'power2.out'
            });
            observer.unobserve(this.path.nativeElement); // Parar de observar após a animação
          }
        },
        {
          root: null, // A página inteira será o root
          threshold: 0.5 // 50% do elemento deve estar visível para ativar a animação
        }
      );

      observer.observe(this.path.nativeElement);
    }
  }
}
